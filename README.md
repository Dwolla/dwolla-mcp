# dwolla-mcp

Model Context Protocol (MCP) Server for the _Dwolla_ API.

<div align="left">
    <a href="https://www.speakeasy.com/?utm_source=dwolla-mcp&utm_campaign=mcp-typescript"><img src="https://custom-icon-badges.demolab.com/badge/-Built%20By%20Speakeasy-212015?style=for-the-badge&logoColor=FBE331&logo=speakeasy&labelColor=545454" /></a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>

<br /><br />

<!-- Start Summary [summary] -->
## Summary

Dwolla API: Dwolla API Documentation
<!-- End Summary [summary] -->

<!-- Start custom addition -->
## 🏦 About Dwolla & This MCP Server

This MCP server enables AI agents to **retrieve and analyze** data from Dwolla's payment platform using natural language. It provides read-only access to Dwolla's comprehensive payment infrastructure, allowing you to inspect accounts, analyze transfer history, monitor customer data, and generate insights from your payment operations.

### 💡 What You Can Do

- **Account Monitoring** - View account details, balances, and funding sources
- **Customer Analytics** - Analyze customer data, beneficial ownership, and compliance status  
- **Transfer Analysis** - Examine transfer history, status, and failure reasons
- **Mass Payment Insights** - Review bulk payment operations and their items
- **Compliance Reporting** - Access documents, KBA sessions, and verification data
- **Business Intelligence** - Query exchange data, webhooks, and system events

### ⚠️ Current Scope

> **Read-Only Operations**: This MCP server currently supports **data retrieval and analysis only**. It does not support creating customers, initiating transfers, or modifying account data at the moment. This makes it ideal for reporting, analytics, and monitoring workflows while maintaining security for sensitive payment operations.

### 🌍 Environment Support

- **Sandbox Environment** (`https://api-sandbox.dwolla.com`) - Perfect for development and testing
- **Production Environment** (`https://api.dwolla.com`) - Live payment data access
<!-- End custom addition -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [dwolla-mcp](#dwolla-mcp)
  * [🏦 About Dwolla & This MCP Server](#about-dwolla-this-mcp-server)
  * [🔑 Environment Setup & Authentication](#environment-setup-authentication)
  * [Installation](#installation)
  * [💬 Usage Examples & Business Applications](#usage-examples-business-applications)
  * [🛠️ Available Operations](#available-operations)
  * [❓ Troubleshooting](#troubleshooting)
* [Development](#development)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->


<!-- Start custom addition -->
## 🔑 Environment Setup & Authentication

### Prerequisites

Before using the Dwolla MCP server, you'll need:

- **Node.js** 18+ and npm
- **Dwolla Account** ([Sandbox Account Sign-up](https://accounts-sandbox.dwolla.com/sign-up))
- **Bearer Token** generated using your API client credential sfrom your Dwolla application

### Getting Your Bearer Token

1. **Log in to your Dwolla Dashboard**
   - Sandbox: [https://dashboard-sandbox.dwolla.com](https://dashboard-sandbox.dwolla.com) 
   - Production: [https://dashboard.dwolla.com](https://dashboard.dwolla.com)

2. **Create or select your application**
3. **Generate a bearer token** 
4. **Copy your bearer token**

### Environment Configuration

You will need to specify which environment you want to run the tools against:

**Sandbox Environment** (Recommended for testing):
```bash
--server sandbox
```

**Production Environment** (Live data):
```bash
--server prod
```

<details>
<summary><strong>Local Development</strong></summary>

For local development and testing:

```bash
# Clone the repository
git clone https://github.com/dwolla/dwolla-mcp.git
cd dwolla-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run with your bearer token
node bin/mcp-server.js start --bearer-auth "your_token_here" --server "sandbox"
```
</details>

<!-- End custom addition -->

<!-- Start Installation [installation] -->
## Installation

<details>
<summary>Claude Desktop</summary>

Install the MCP server as a Desktop Extension using the pre-built [`mcp-server.mcpb`](https://github.com/Dwolla/dwolla-mcp/releases/download/v1.1.1/mcp-server.mcpb) file:

Simply drag and drop the [`mcp-server.mcpb`](https://github.com/Dwolla/dwolla-mcp/releases/download/v1.1.1/mcp-server.mcpb) file onto Claude Desktop to install the extension.

The MCP bundle package includes the MCP server and all necessary configuration. Once installed, the server will be available without additional setup.

> [!NOTE]
> MCP bundles provide a streamlined way to package and distribute MCP servers. Learn more about [Desktop Extensions](https://www.anthropic.com/engineering/desktop-extensions).

</details>

<details>
<summary>Cursor</summary>

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=DwollaMcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyJAZHdvbGxhL21jcC1zZXJ2ZXIiLCJzdGFydCIsIi0tc2VydmVyIiwicHJvZCIsIi0tYmVhcmVyLWF1dGgiLCIiXX0=)

Or manually:

1. Open Cursor Settings
2. Select Tools and Integrations
3. Select New MCP Server
4. If the configuration file is empty paste the following JSON into the MCP Server Configuration:

```json
{
  "command": "npx",
  "args": [
    "@dwolla/mcp-server",
    "start",
    "--server",
    "prod",
    "--bearer-auth",
    ""
  ]
}
```

</details>

<details>
<summary>Claude Code CLI</summary>

```bash
claude mcp add DwollaMcp -- npx -y @dwolla/mcp-server start --server prod --bearer-auth 
```

</details>
<details>
<summary>Gemini</summary>

```bash
gemini mcp add DwollaMcp -- npx -y @dwolla/mcp-server start --server prod --bearer-auth 
```

</details>
<details>
<summary>Windsurf</summary>

Refer to [Official Windsurf documentation](https://docs.windsurf.com/windsurf/cascade/mcp#adding-a-new-mcp-plugin) for latest information

1. Open Windsurf Settings
2. Select Cascade on left side menu
3. Click on `Manage MCPs`. (To Manage MCPs you should be signed in with a Windsurf Account)
4. Click on `View raw config` to open up the mcp configuration file.
5. If the configuration file is empty paste the full json

```bash
{
  "command": "npx",
  "args": [
    "@dwolla/mcp-server",
    "start",
    "--server",
    "prod",
    "--bearer-auth",
    ""
  ]
}
```
</details>
<details>
<summary>VS Code</summary>

[![Install in VS Code](https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20DwollaMcp%20MCP&color=0098FF)](vscode://ms-vscode.vscode-mcp/install?name=DwollaMcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyJAZHdvbGxhL21jcC1zZXJ2ZXIiLCJzdGFydCIsIi0tc2VydmVyIiwicHJvZCIsIi0tYmVhcmVyLWF1dGgiLCIiXX0=)

Or manually:

Refer to [Official VS Code documentation](https://code.visualstudio.com/api/extension-guides/ai/mcp) for latest information

1. Open [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette)
1. Search and open `MCP: Open User Configuration`. This should open mcp.json file
2. If the configuration file is empty paste the full json

```bash
{
  "command": "npx",
  "args": [
    "@dwolla/mcp-server",
    "start",
    "--server",
    "prod",
    "--bearer-auth",
    ""
  ]
}
```

</details>
<details>
<summary> Stdio installation via npm </summary>
To start the MCP server, run:

```bash
npx @dwolla/mcp-server start --server prod --bearer-auth 
```

For a full list of server arguments, run:

```
npx @dwolla/mcp-server --help
```

</details>
<!-- End Installation [installation] -->

<!-- Start custom addition -->
## 💬 Usage Examples & Business Applications

### 🎧 Customer Support & Operations
**Business Problem**: Support teams need to quickly investigate customer issues and transfer failures.

**Solutions with AI**:
- *"Find all failed transfers for customer john.doe@company.com and explain why they failed"*
- *"Show me customer details for customer ID {id}"*
- *"List transfers for customer {id} in the last month"*

### 📊 Financial Reconciliation & Reporting  
**Business Problem**: Finance teams need automated reconciliation and reporting.

**Solutions with AI**:
- *"Calculate total transfer volume for Q1 2024 and compare to Q4 2023"*
- *"Show me all pending transfers over $10,000"*
- *"What's the current balance of my Dwolla Balance funding source?"*

### ⚖️ Compliance & Risk Management

**Problem**: Compliance teams need to monitor suspicious activity, verify customer information, and ensure regulatory compliance.

**Solutions with AI**:
- *"List all customers missing required beneficial ownership information"*
- *"Find transfers over $50,000 in the last 30 days for regulatory reporting"*
- *"Which customers need additional identity documents to maintain compliance?"*
- *"Identify customers with multiple failed transfer attempts this month"*

### 📈 Business Intelligence & Analytics

**Problem**: Business teams need insights into payment patterns, customer behavior, and platform performance.

**Solutions with AI**:
- *"What's the average transfer amount by customer segment and how has it changed?"*
- *"How many new verified customers were added this quarter vs last quarter?"*
- *"Which funding source types have the highest failure rates and why?"*
- *"Show me customers with increasing transfer volumes who might need premium features"*

### 👩‍💻 Developer Tools & Integration Support

**Problem**: Development teams need to debug integrations, test scenarios, and understand API behavior.

**Solutions with AI**:
- *"Show me the exact webhook events and timeline for transfer {id}"*
- *"What are the most common transfer failure reasons this week and their causes?"*
- *"Find examples of customers using each funding source type for testing"*
- *"Analyze the verification process for business customers who got stuck"*

### 🚨 Automated Monitoring & Alerting

**Problem**: Operations teams need proactive monitoring of system health and business metrics.

**Solutions with AI**:
- *"Has our daily failed transfer rate exceeded 5% and what's causing the failures?"*
- *"Show me any unusual spikes in transfer volumes or patterns today"*
- *"Which customers have been stuck in verification states for over 30 days?"*
- *"Are there any funding sources experiencing higher than normal failure rates?"*

### 💡 Real-World Workflow Example

**Scenario**: Support receives an escalation about failed payments

**Traditional Process** (45+ minutes):
1. Log into multiple dashboards
2. Look up customers across different systems  
3. Check transfer history manually
4. Research failure codes in documentation
5. Escalate to engineering for analysis

**With Dwolla MCP** (5 minutes):
```
User: "We're seeing more transfer failures lately. Can you investigate?"

AI: "I'll analyze recent transfer failures for you."
→ Pulls transfer data with failed status
→ Groups by failure reasons
→ Identifies top failure patterns
→ Suggests specific customers to investigate
→ Recommends remediation steps

Result: "I found a 15% increase in 'insufficient funds' failures, 
primarily from 3 specific customers. Here are the details and 
recommended actions..."
```

**Result**: Issue identified and resolved in 5 minutes instead of 45+ minutes, with complete context for the support agent.

## 🛠️ Available Operations

The Dwolla MCP server provides the following tools for data retrieval and analysis:

### Account Operations
- `accounts-get` - Retrieve account details and status
- `accounts-funding-sources-list` - List all funding sources for account
- `accounts-transfers-list` - List and search transfers for account  
- `accounts-mass-payments-list` - List mass payments for account
- `accounts-exchanges-list` - List exchanges for account

### Customer Management  
- `customers-list` - List and search customers with filtering
- `customers-get` - Retrieve detailed customer information
- `customers-funding-sources-list` - List customer funding sources
- `customers-transfers-list` - List customer transfer history
- `customers-mass-payments-list` - List customer mass payments
- `customers-documents-list` - List customer documents
- `customers-exchanges-list` - List customer exchanges
- `customers-beneficial-owners-list` - List customer beneficial owners
- `customers-list-available-connections` - List available exchange connections

### Transfer Operations
- `transfers-get` - Retrieve specific transfer details
- `transfers-get-failure-reason` - Get transfer failure analysis
- `transfers-list-fees` - List transfer fees and charges

### Mass Payment Operations
- `mass-payments-get` - Retrieve mass payment details
- `mass-payments-list-items` - List items within a mass payment
- `mass-payments-get-item` - Retrieve specific mass payment item

### Funding Source Operations
- `funding-sources-get` - Retrieve funding source details
- `funding-sources-get-balance` - Get funding source balance
- `funding-sources-get-micro-deposits` - Get micro-deposit verification details
- `funding-sources-get-van-routing` - Get Virtual Account Number routing info

### Compliance & Documents
- `documents-get` - Retrieve document details
- `beneficial-owners-get` - Retrieve beneficial owner information  
- `beneficial-owners-get-ownership-status` - Get beneficial ownership status
- `beneficial-owners-documents-list` - List beneficial owner documents
- `kba-get-questions` - Retrieve KBA (Knowledge-Based Authentication) questions

### Exchange Operations
- `exchanges-get` - Retrieve exchange details
- `exchange-partners-list` - List available exchange partners
- `exchange-sessions-get` - Get exchange session information

### Labels & Ledger
- `labels-list-for-customer` - List labels for customer
- `labels-get` - Retrieve label details
- `labels-list-ledger-entries` - List ledger entries
- `labels-get-ledger-entry` - Retrieve specific ledger entry
- `labels-get-reallocation` - Get label reallocation details

### Webhooks & Events
- `webhooks-get` - Retrieve webhook details
- `webhooks-list-retries` - List webhook retry attempts
- `webhook-subscriptions-list` - List webhook subscriptions
- `webhook-subscriptions-get` - Get webhook subscription details
- `webhook-subscriptions-list-webhooks` - List webhooks for subscription
- `events-list` - List events
- `events-get` - Retrieve specific event details

### Reference Data
- `business-classifications-list` - List business classifications
- `business-classifications-get` - Get business classification details
- `root-get` - API entry point for discovery

## ❓ Troubleshooting

### 🔧 Common Setup Issues

**MCP Server Not Connecting**
- Verify your bearer token is valid
- Check that Node.js 18+ is installed: `node --version`
- Ensure npm/npx is available: `npm --version`
- Try clearing npm cache: `npm cache clean --force`

**Environment Configuration Issues**  
- Confirm you're using the correct environment URL:
  - Sandbox: `https://api-sandbox.dwolla.com`
  - Production: `https://api.dwolla.com`
- Verify your bearer token matches your intended environment

**Authentication Errors**
- Verify token hasn't expired
- Check that your application is active

### 🖥️ Client-Specific Issues

**Claude Desktop**
- Restart Claude Desktop after configuration changes
- Check `claude_desktop_config.json` syntax with a JSON validator
- Verify file paths are absolute and properly escaped
- Look for error messages in Claude's developer console

**Cursor**
- Restart Cursor after adding MCP configuration
- Check Settings → Cursor Settings → MCP for configuration status
- Verify the server appears in the MCP tools list
- Try removing and re-adding the server configuration

**VS Code**
- Ensure GitHub Copilot extension is installed and active
- Check that MCP support is enabled in settings
- Restart VS Code after configuration changes
- Verify the MCP server appears in the agent tools list

### 🔍 Advanced Troubleshooting

**Token Validation**
```bash
# Test your bearer token directly
curl -H "Authorization: Bearer your_token_here" \
     https://api-sandbox.dwolla.com/

# Should return API root information
```

### 📊 Debugging Tips

**Verbose Logging**
- Check your MCP client's logs for detailed error messages
- Enable debug mode in your client if available
- Monitor network requests to identify API call failures

**Test with MCP Inspector**
- Use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) to test your server:
  ```bash
  npx @modelcontextprotocol/inspector npx -y --package @dwolla/mcp-server -- mcp start --bearer-auth "your_token" --server "sandbox"
  ```

### 💡 Performance Optimization

**Large Dataset Queries**
- Use specific date ranges when querying transfers or events
- Consider filtering by customer or status to reduce response size

### 🆘 Getting Help

- **Documentation**: [Dwolla API Docs](https://developers.dwolla.com/)
- **Community Support**: [Developer Forum](https://discuss.dwolla.com/)
- **Dwolla Support**: [Dwolla Developer Support](https://support.dwolla.com/s/)
- **MCP Protocol**: [Model Context Protocol Docs](https://modelcontextprotocol.io)
- **GitHub Issues**: Report bugs or request features in this repository

## 🔒 Security Considerations

> **Important**: This MCP server can provide access to sensitive financial data and systems. Following these security best practices is essential to protect your information, maintain data integrity and ensure compliance.

### 🛡️ Authentication Security

**Bearer Token Management**
- **Never commit** bearer tokens to version control
- Use environment variables for token storage

**Environment Separation**
- **Always start with Sandbox** for development and testing
- Use separate tokens for sandbox and production environments
- Never use production tokens in development/testing

<!-- End custom addition -->

<!-- Start Progressive Discovery [dynamic-mode] -->
## Progressive Discovery

MCP servers with many tools can bloat LLM context windows, leading to increased token usage and tool confusion. Dynamic mode solves this by exposing only a small set of meta-tools that let agents progressively discover and invoke tools on demand.

To enable dynamic mode, pass the `--mode dynamic` flag when starting your server:

```jsonc
{
  "mcpServers": {
    "DwollaMcp": {
      "command": "npx",
      "args": ["@dwolla/mcp-server", "start", "--mode", "dynamic"],
      // ... other server arguments
    }
  }
}
```

In dynamic mode, the server registers only the following meta-tools instead of every individual tool:

- **`list_tools`**: Lists all available tools with their names and descriptions.
- **`describe_tool`**: Returns the input schema for one or more tools by name.
- **`execute_tool`**: Executes a tool by name with the provided input parameters.
- **`list_scopes`**: Lists the scopes available on the server.

This approach significantly reduces the number of tokens sent to the LLM on each request, which is especially useful for servers with a large number of tools.

You can combine dynamic mode with scope and tool filters:

```jsonc
{
  "mcpServers": {
    "DwollaMcp": {
      "command": "npx",
      "args": ["@dwolla/mcp-server", "start", "--mode", "dynamic", "--scope", "read"],
      // ... other server arguments
    }
  }
}
```
<!-- End Progressive Discovery [dynamic-mode] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Contributions

While we value contributions to this MCP Server, the code is generated programmatically. Any manual
changes added to internal files will be overwritten on the next generation. We look forward to
hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our
best to include it in a future release.
