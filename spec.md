# Stateless MCP Server Transformation Spec

## Overview

Transform the Dwolla MCP server from a session-based authenticated server to a stateless server that requires a Dwolla API token with each request. This enables deployment as a public service (e.g., `https://mcp-sandbox.dwolla.com`) that can handle multiple users concurrently without storing credentials.

## Phase 0: Upgrade to Modern Transport (StreamableHTTP) ✅ COMPLETED

**Priority**: High - Must be completed first as SSE transport is deprecated

**Status**: ✅ **COMPLETED** - All Phase 0 objectives achieved and tested with MCP Inspector

### 0.1 Update Transport Dependencies
- **Remove deprecated import**: `import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"`
- **Add modern import**: `import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"`

### 0.2 Update CLI Interface
```typescript
// BEFORE: src/mcp-server/cli/start/impl.ts
interface StartCommandFlags {
  readonly transport: "stdio" | "sse";
  // ...
}

// AFTER:
interface StartCommandFlags {
  readonly transport: "stdio" | "http";
  // ...
}
```

### 0.3 Replace SSE Implementation
- **Remove**: Complex `startSSE()` function with separate `/sse` and `/message` endpoints
- **Replace with**: Simplified `startHTTP()` function using single `/mcp` endpoint
- **Simplify**: StreamableHTTP handles transport complexity automatically

```typescript
// NEW: Simplified HTTP implementation
async function startHTTP(flags: StartCommandFlags) {
  const logger = createConsoleLogger(flags["log-level"]);
  const app = express();
  
  const mcpServer = createMCPServer({
    // ... same config as before
  });

  // Single endpoint handles all MCP communication
  app.all("/mcp", async (req, res) => {
    const transport = new StreamableHTTPServerTransport(req, res);
    await mcpServer.connect(transport);
  });

  // ... rest of server setup
}
```

### 0.4 Update Main Switch Statement
```typescript
// Update transport routing
switch (flags.transport) {
  case "stdio":
    await startStdio(flags);
    break;
  case "http": // was "sse"
    await startHTTP(flags); // was startSSE
    break;
  default:
    throw new Error(`Invalid transport: ${flags.transport}`);
}
```

### 0.5 Benefits of This Upgrade
- **Future-proof**: SSE transport deprecated as of protocol version 2024-11-05
- **Simpler code**: Less complex than current SSE implementation  
- **Better for stateless**: StreamableHTTP naturally supports per-request auth
- **Standards compliant**: More standard HTTP behavior
- **Perfect foundation**: Sets up the stateless transformation phases

## Phase 1: Remove Startup Authentication

### 1.1 CLI Changes ✅ COMPLETED
- **Remove required flags**: `--client-id`, `--client-secret`, `--token-url`, `--bearer-auth`
- **Keep optional flags**: `--server-url` (for sandbox vs production), `--server-index`
- **Update command descriptions** to reflect stateless nature

### 1.2 Server Creation Changes ✅ COMPLETED
```typescript
// BEFORE: src/mcp-server/server.ts
const client = new DwollaMcpCore({
  security: deps.security,  // ← Remove this
  serverURL: deps.serverURL,
  serverIdx: deps.serverIdx,
});

// AFTER:
// No client creation at startup - moved to per-request
```

### 1.3 Update Dependencies Interface ✅ COMPLETED
```typescript
// BEFORE: src/mcp-server/server.ts
interface MCPServerDependencies {
  security: {
    clientCredentials?: { ... };
    bearerAuth?: string;
  };
  // ...
}

// AFTER:
interface MCPServerDependencies {
  // Remove security - will be per-request
  serverURL?: string;
  serverIdx?: number;
}
```

## Phase 2: Implement Header-Based Authentication ✅ COMPLETED

**Status**: ✅ **COMPLETED** - Header-based authentication implemented using MCP's built-in authorization support

**Key Insight**: Instead of updating 87+ individual tool schemas, we use HTTP Authorization headers and MCP's built-in `authInfo` context - much cleaner!

### 2.1 Rely on MCP Built-in Authorization ✅ IMPLEMENTED
```typescript
// IN: src/mcp-server/cli/start/impl.ts - StreamableHTTP transport
app.all("/mcp", async (req, res) => {
  try {
    // No manual token extraction needed - MCP SDK handles this automatically
    // Create fresh server and transport per request for stateless behavior
    const requestServer = createMCPServer({
      logger,
      allowedTools: flags.tool,
      scopes: flags.scope,
      serverURL: flags["server-url"],
      serverIdx: flags["server-index"],
    });
    
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    
    await requestServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
```

**Key Insight**: MCP SDK automatically extracts `Authorization: Bearer <token>` headers and populates `RequestHandlerExtra.authInfo.token` per the [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization).

### 2.2 Update Tool Registration to Use Context Auth ✅ IMPLEMENTED
```typescript
// UPDATE: src/mcp-server/tools.ts - Tool execution wrapper
server.tool(tool.name, tool.description, tool.args, async (args, ctx) => {
  // Extract token from request context using MCP built-in authInfo
  const token = extractTokenFromContext(ctx);
  
  if (!token) {
    return createAuthRequiredError();
  }
  
  try {
    // Create authenticated client per request
    const client = createDwollaClient(token, serverURL);
    
    // Call original tool with authenticated client
    return await tool.tool(client, args, ctx);
  } catch (error) {
    logger.error("Tool execution failed", { tool: tool.name, error });
    return {
      isError: true,
      content: [{
        type: "text",
        text: `Tool execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]
    };
  }
});
```

**Implementation Details**:
- Created `client-factory.ts` with `createDwollaClient()` function
- Created `auth-utils.ts` with `extractTokenFromContext()` and `createAuthRequiredError()`  
- Updated `createRegisterTool()` to remove unused SDK parameter
- Tool registration now uses `server.tool()` instead of `setRequestHandler()`

### 2.3 Benefits of Header-Based Approach
- **✅ No tool schema changes** - All 87+ tools keep existing schemas
- **✅ Standard HTTP auth** - Uses `Authorization: Bearer <token>` header
- **✅ Leverages MCP built-ins** - Uses `RequestHandlerExtra.authInfo`
- **✅ Per-request authentication** - Different tokens per request
- **✅ Transport-agnostic** - Can work with both HTTP and stdio transports

## Phase 3: Create Client Factory and Update Tool Registration ✅ COMPLETED

**Status**: ✅ **COMPLETED** - Implemented as part of Phase 2

### 3.1 Create Client Factory Function ✅ IMPLEMENTED
```typescript
// CREATED: src/mcp-server/client-factory.ts
export function createDwollaClient(token: string, serverURL?: string): DwollaMcpCore {
  return new DwollaMcpCore({
    security: {
      bearerAuth: token,
    },
    serverURL: serverURL || "https://api-sandbox.dwolla.com",
  });
}
```

### 3.2 Update Tool Registration to Extract Token from Context ✅ IMPLEMENTED
```typescript
// UPDATED: src/mcp-server/tools.ts - createRegisterTool function  
export function createRegisterTool(
  logger: ConsoleLogger,
  server: McpServer,
  // Removed client parameter - no longer needed
  scopes: Set<MCPScope>,
  allowedTools?: Set<string>,
  serverURL?: string,
): <A extends ZodRawShape | undefined>(tool: ToolDefinition<A>) => void {
  return <A extends ZodRawShape | undefined>(tool: ToolDefinition<A>): void => {
    // Tool registration using server.tool() with per-request authentication
    server.tool(tool.name, tool.description, tool.args, async (args, ctx) => {
      const token = extractTokenFromContext(ctx);
      if (!token) return createAuthRequiredError();
      
      const client = createDwollaClient(token, serverURL);
      return await tool.tool(client, args, ctx);
    });
  };
}
```

## Phase 4: Implement Token Extraction from MCP Context ✅ COMPLETED

**Status**: ✅ **COMPLETED** - Implemented as part of Phase 2

### 4.1 Token Extraction Utility ✅ IMPLEMENTED
```typescript
// CREATED: src/mcp-server/auth-utils.ts
export function extractTokenFromContext(extra: RequestHandlerExtra): string | undefined {
  // MCP SDK automatically populates authInfo from Authorization header
  if (extra.authInfo?.token) {
    return extra.authInfo.token;
  }
  
  // Fallback option for custom context (if needed)
  return (extra as any).dwollaToken;
}

export function createAuthRequiredError() {
  return {
    isError: true,
    content: [{
      type: "text" as const,
      text: "Authentication required. Please provide Authorization: Bearer <token> header."
    }]
  };
}
```

### 4.2 MCP Built-in Authorization Handling ✅ IMPLEMENTED
The transport layer relies entirely on MCP's built-in authorization handling:

```typescript
// UPDATED: src/mcp-server/cli/start/impl.ts
// No manual token extraction - MCP SDK handles Authorization headers automatically
app.all("/mcp", async (req, res) => {
  try {
    const requestServer = createMCPServer({ /* ... */ });
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    
    await requestServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
    // MCP SDK automatically extracts Authorization header and populates ctx.authInfo.token
  } catch (error) {
    // Handle errors
  }
});
```

## Phase 5: Remove Server-Level Client Management (Already Complete!)

### 5.1 Update Server Creation
```typescript
// BEFORE: src/mcp-server/server.ts
export function createMCPServer(deps: MCPServerDependencies) {
  const client = new DwollaMcpCore({ ... });  // ← Remove this
  
  const registerTool = createRegisterTool(
    deps.logger,
    server,
    client,  // ← Remove this parameter
    // ...
  );
}

// AFTER:
export function createMCPServer(deps: MCPServerDependencies) {
  // No client creation at server level
  
  const registerTool = createRegisterTool(
    deps.logger,
    server,
    // client parameter removed
    // ...
  );
}
```

### 5.2 Update Tool Registration
```typescript
// BEFORE: src/mcp-server/tools.ts
export function createRegisterTool(
  logger: ConsoleLogger,
  server: McpServer,
  sdk: DwollaMcpCore,  // ← Remove this
  // ...
) {
  return (toolDef: ToolDefinition) => {
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      // Pass pre-authenticated client to tool
      return await toolDef.tool(sdk, args, ctx);  // ← Change this
    });
  };
}

// AFTER:
export function createRegisterTool(
  logger: ConsoleLogger,
  server: McpServer,
  // sdk parameter removed
  // ...
) {
  return (toolDef: ToolDefinition) => {
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      // Tools create their own clients
      return await toolDef.tool(null, args, ctx);  // ← Pass null for client
    });
  };
}
```

## Phase 6: Implement Token Validation

### 6.1 Add Token Validation Utility
```typescript
// NEW: src/mcp-server/token-validator.ts
export interface TokenValidationResult {
  valid: boolean;
  error?: string;
}

export async function validateDwollaToken(token: string): Promise<TokenValidationResult> {
  try {
    // Basic format validation
    if (!token || typeof token !== 'string') {
      return { valid: false, error: "Token is required and must be a string" };
    }
    
    // Optional: Test token with a lightweight API call
    const client = createDwollaClient(token);
    await client.root.get();  // Simple validation call
    
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : "Token validation failed" 
    };
  }
}
```

### 6.2 Add Validation to Tools
```typescript
// Pattern for tool implementations
tool: async (_, args, ctx) => {
  // Validate token first
  const validation = await validateDwollaToken(args.token);
  if (!validation.valid) {
    return {
      isError: true,
      content: [{
        type: "text",
        text: `Authentication failed: ${validation.error}`
      }]
    };
  }
  
  // Proceed with API call
  const client = createDwollaClient(args.token);
  // ...
}
```

## Phase 7: Update Error Handling

### 7.1 Standardize Authentication Errors
```typescript
// NEW: src/mcp-server/error-handler.ts
export function handleAuthenticationError(error: any) {
  return {
    isError: true,
    content: [{
      type: "text",
      text: "Authentication failed. Please provide a valid Dwolla API token."
    }]
  };
}

export function handleToolError(error: any) {
  if (isAuthenticationError(error)) {
    return handleAuthenticationError(error);
  }
  
  // Handle other error types
  return {
    isError: true,
    content: [{
      type: "text", 
      text: `Error: ${error.message || 'Unknown error occurred'}`
    }]
  };
}
```

### 7.2 Update All Tools with Consistent Error Handling
- Replace tool-specific error handling with standardized approach
- Ensure authentication errors are clearly identified
- Provide helpful error messages for token issues

## Phase 8: Update Documentation and Configuration

### 8.1 Update CLI Help Text
```typescript
// Update command descriptions to reflect stateless nature
const command = {
  name: "start",
  description: "Start the stateless MCP server (requires token per request)",
  // Remove client-id/client-secret from help
  // Update examples to show token usage
};
```

### 8.2 Update README and Examples
- Document new token-per-request requirement
- Provide examples of tool usage with tokens
- Update deployment instructions
- Add security considerations

### 8.3 Update Configuration Examples
```json
// Example for MCP Inspector usage
{
  "token": "your-dwolla-api-token-here",
  "request": {
    "id": "customer-id"
  }
}
```

## Phase 9: Testing and Validation

### 9.1 Unit Testing
- Test each tool with valid tokens
- Test authentication failure scenarios
- Verify no client state persistence
- Test concurrent requests with different tokens

### 9.2 Integration Testing
- Test with MCP Inspector
- Verify all tools work with token authentication
- Test error handling and edge cases
- Performance testing with multiple concurrent users

### 9.3 Security Testing
- Verify tokens are not logged or persisted
- Test token validation edge cases
- Ensure no credential leakage between requests
- Validate proper cleanup of client instances

## Benefits of This Architecture

### **Scalability**
- No server-side state to manage
- Horizontal scaling without session affinity
- Each request is independent

### **Security** 
- No stored credentials on server
- User controls their own authentication
- Reduced attack surface

### **Deployment Flexibility**
- Can be deployed as public service
- No environment-specific configuration
- Works with any Dwolla environment (sandbox/production)

### **Multi-tenancy**
- Multiple users can use same server instance
- Each user provides their own credentials
- Perfect isolation between users

## Implementation Order

1. **Phase 0**: ✅ Transport upgrade (foundation) 
2. **Phase 1**: ✅ Remove startup authentication
3. **Phase 2**: ✅ Header-based authentication (HTTP Authorization headers)
4. **Phase 3**: ✅ Client factory and tool registration updates  
5. **Phase 4**: ✅ Token extraction from MCP context
6. **Phase 5**: ✅ Server-level client management (already removed!)
7. **Phase 6-7**: Token validation and error handling
8. **Phase 8-9**: Documentation and testing

**Key Insight**: The new header-based approach eliminates the need to update 87+ individual tool files, making the implementation much more efficient and maintainable!

This systematic approach ensures a smooth transition from the current session-based architecture to a fully stateless, production-ready MCP server. 