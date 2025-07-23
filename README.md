# dwolla-mcp

Model Context Protocol (MCP) Server for the _Dwolla_ API.

<div align="left">
    <a href="https://www.speakeasy.com/?utm_source=dwolla-mcp&utm_campaign=mcp-typescript"><img src="https://custom-icon-badges.demolab.com/badge/-Built%20By%20Speakeasy-212015?style=for-the-badge&logoColor=FBE331&logo=speakeasy&labelColor=545454" /></a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>

<br /><br />

> [!IMPORTANT]
> **Beta Release** - This MCP is currently in beta. Core operations including customer creation, funding sources, transfers, and beneficial ownership have been tested and are functional. We are conducting thorough internal testing of all operations before general availability. Please note that breaking changes may occur as we continue to make improvements. While suitable for development and testing, please use with appropriate caution in production environments.

<!-- Start Summary [summary] -->
## Summary

Dwolla API: Dwolla API Documentation
<!-- End Summary [summary] -->

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

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [dwolla-mcp](#dwolla-mcp)
  * [Installation](#installation)
* [Development](#development)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start Installation [installation] -->
## Installation

> [!TIP]
> To finish publishing your MCP Server to npm and others you must [run your first generation action](https://www.speakeasy.com/docs/github-setup#step-by-step-guide).

<details>
<summary>Claude</summary>

Add the following server definition to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "DwollaMcp": {
      "command": "npx",
      "args": [
        "-y",
        "--package",
        "@dwolla/mcp-server",
        "--",
        "mcp",
        "start",
        "--bearer-auth",
        "..."
      ]
    }
  }
}
```

</details>

<details>
<summary>Cursor</summary>

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=DwollaMcp&config=eyJtY3BTZXJ2ZXJzIjp7IkR3b2xsYU1jcCI6eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIi0tcGFja2FnZSIsIkBkd29sbGEvbWNwLXNlcnZlciIsIi0tIiwibWNwIiwic3RhcnQiLCItLWJlYXJlci1hdXRoIiwiLi4uIl19fX0=)

Or manually:

1. Open Cursor Settings
2. Select Tools and Integrations
3. Select New MCP Server
4. Paste the following JSON into the MCP Server Configuration field:

```json
{
  "mcpServers": {
    "DwollaMcp": {
      "command": "npx",
      "args": [
        "-y",
        "--package",
        "@dwolla/mcp-server",
        "--",
        "mcp",
        "start",
        "--bearer-auth",
        "..."
      ]
    }
  }
}
```

</details>

<details>
<summary>Claude Code CLI</summary>

```bash
npx -y --package @dwolla/mcp-server -- mcp start --bearer-auth ...
```

</details>

<details>
<summary>Manual installation</summary>




To start the MCP server, run:

```bash
npx -y --package @dwolla/mcp-server -- mcp start --bearer-auth ...
```

For a full list of server arguments, run:

```bash
npx -y --package @dwolla/mcp-server -- mcp start --help
```

</details>
<!-- End Installation [installation] -->

## 🔑 Environment Setup & Authentication

### Prerequisites

Before using the Dwolla MCP server, you'll need:

- **Node.js** 18+ and npm
- **Dwolla Account** ([Sign up](https://accounts-sandbox.dwolla.com/sign-up))
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
--server-url https://api-sandbox.dwolla.com
```

**Production Environment** (Live data):
```bash
--server-url https://api.dwolla.com
```

### Multi-Client Setup

Choose your preferred MCP client for detailed setup instructions:

<details>
<summary><strong>Claude Desktop</strong></summary>

1. Open Claude Desktop
2. Go to `Settings → Developer → Edit Config`
3. Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "DwollaMcp": {
      "command": "npx",
      "args": [
        "-y",
        "--package",
        "@dwolla/mcp-server",
        "--",
        "mcp",
        "start",
        "--bearer-auth",
        "your_token_here",
        "--server-url",
        "https://api-sandbox.dwolla.com"
      ]
    }
  }
}
```

4. Save and restart Claude Desktop
</details>

<details>
<summary><strong>Cursor</strong></summary>

1. Open Cursor Settings
2. Go to `Settings → Cursor Settings → MCP`
3. Click `+ Add New Global MCP Server`
4. Add this configuration:

```json
{
  "DwollaMcp": {
    "command": "npx",
    "args": [
      "-y",
      "--package",
      "@dwolla/mcp-server",
      "--",
      "mcp",
      "start",
      "--bearer-auth",
      "your_token_here",
      "--server-url",
      "https://api-sandbox.dwolla.com"
    ]
  }
}
```

5. Save the configuration
</details>

<details>
<summary><strong>VS Code</strong></summary>

1. Open VS Code Settings
2. Search for "mcp" to enable MCP support
3. Add to your settings.json or workspace settings:

```json
{
  "mcp": {
    "servers": {
      "dwolla": {
        "type": "stdio",
        "command": "npx",
        "args": [
          "-y",
          "--package", 
          "@dwolla/mcp-server",
          "--",
          "mcp",
          "start",
          "--bearer-auth",
          "your_token_here"
        ]
      }
    }
  }
}
```

4. Restart VS Code
</details>

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
node bin/mcp-server.js start --bearer-auth "your_token_here" --server-url https://api-sandbox.dwolla.com
```
</details>

## 💬 Usage Examples & Workflows

Once configured, you can interact with your Dwolla data using natural language. Here are common scenarios and example queries:

### 🏢 Account Overview & Monitoring

**Get account information:**
- "Show me my Dwolla account details and current status"
- "What funding sources are connected to my account?"
- "List all transfers associated with my account from the last 30 days"
- "Show me recent mass payments I've processed"

**Account balance monitoring:**
- "What's the current balance of my Dwolla Balance funding source?"

### 👥 Customer Management & Analytics

**Customer insights:**
- "List all customers with status 'verified'"
- "Find customers by business name containing 'Tech'"
- "Show me customer details for customer ID {id}"
- "How many customers have been added in the last 30 days?"

**Customer compliance:**
- "List beneficial owners for customer {id}"
- "Check beneficial ownership status for customer {id}"

### 💸 Transfer Analysis & Reporting

**Transfer monitoring:**
- "Show me all failed transfers in the past week and their failure reasons"
- "List transfers for customer {id} in the last month"
- "Get details for transfer {id} including any fees"
- "Find transfers with correlation ID 'payment_batch_001'"

**Transfer analytics:**
- "Analyze transfer patterns between $1000 and $5000"
- "Show me transfers that occurred yesterday"
- "List all pending transfers across my platform"

### 📦 Mass Payment Operations

**Mass payment insights:**
- "Show me all mass payment batches from this quarter"
- "List items in mass payment {id}"
- "Get details for mass payment item {id}"
- "Find mass payments by correlation ID for customer analysis"

### 🏦 Funding Source Management

**Funding source analysis:**
- "List all funding sources for customer {id}"
- "Get micro-deposit details for funding source {id}"
- "Show me VAN routing information for funding source {id}"
- "Check if any funding sources are unverified or removed"

### 🔄 Exchange & Connection Data

**Exchange monitoring:**
- "List all available exchange connections for customer {id}"
- "Show me exchange partners and their details"
- "Get exchange session information for session {id}"
- "List all exchanges associated with customer {id}"

### 📊 Business Intelligence & Reporting

**System events:**
- "Show me recent webhook events and their status"
- "List webhook subscriptions and their configurations"
- "Get event details for event {id}"

**Reference data:**
- "List all business classifications available"
- "Show me industry classifications for business type 'Technology'"
- "Get details for business classification {id}"

**Label & ledger analysis:**
- "List all labels associated with customer {id}"
- "Show me ledger entries for label {id}"
- "Get reallocation details for label reallocation {id}"

### 🔍 Compliance & Document Review

**Document management:**
- "List all documents for customer {id}"
- "Get document details for document {id}"
- "Show me beneficial owner documents for owner {id}"

**Compliance monitoring:**
- "Check beneficial ownership compliance for customer {id}"
- "List customers requiring additional documentation"
- "Show me recent compliance events and their resolutions"

### 📈 Advanced Analytics Queries

**Cross-entity analysis:**
- "Compare transfer volumes between customers {id-A} and {id-B}"
- "Show me the relationship between funding source types and transfer success rates"
- "Analyze mass payment completion patterns across different customer segments"

**Time-based reporting:**
- "Generate a summary of all payment activity from last week"
- "Show me month-over-month growth in customer onboarding"
- "List all transfers that occurred during business hours vs after hours"

### 🚨 Troubleshooting & Monitoring

**Issue investigation:**
- "Find all failed transfers and categorize them by failure reason"
- "Show me customers with incomplete verification status"
- "List webhook retries and their success/failure rates"

**System health:**
- "Check the status of recent webhook deliveries"
- "Show me any exchange connections that need attention"

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
  npx @modelcontextprotocol/inspector npx -y --package @dwolla/mcp-server -- mcp start --bearer-auth "your_token" --server-url https://api-sandbox.dwolla.com
  ```

### 💡 Performance Optimization

**Large Dataset Queries**
- Use specific date ranges when querying transfers or events
- Consider filtering by customer or status to reduce response size

### 🆘 Getting Help

- **Documentation**: [Dwolla API Docs](https://developers.dwolla.com/)
- **Community Support**: [Developer Forum](https://support.dwolla.com/s/)
- **Dwolla Support**: [Dwolla Developer Support](https://support.dwolla.com/s/)
- **MCP Protocol**: [Model Context Protocol Docs](https://modelcontextprotocol.io)
- **GitHub Issues**: Report bugs or request features in this repository

## 🔒 Security Considerations

> **Important**: The Dwolla MCP server provides access to sensitive financial data. Follow these security best practices to protect your information and comply with financial regulations.

### 🛡️ Authentication Security

**Bearer Token Management**
- **Never commit** bearer tokens to version control
- Use environment variables for token storage

**Environment Separation**
- **Always start with Sandbox** for development and testing
- Use separate tokens for sandbox and production environments
- Never use production tokens in development/testing

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Contributions

While we value contributions to this MCP Server, the code is generated programmatically. Any manual
changes added to internal files will be overwritten on the next generation. We look forward to
hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our
best to include it in a future release.
