# dwolla-mcp

Model Context Protocol (MCP) Server for the _dwolla-mcp_ API.

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
        "dwolla-mcp",
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

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=DwollaMcp&config=eyJtY3BTZXJ2ZXJzIjp7IkR3b2xsYU1jcCI6eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIi0tcGFja2FnZSIsImR3b2xsYS1tY3AiLCItLSIsIm1jcCIsInN0YXJ0IiwiLS1iZWFyZXItYXV0aCIsIi4uLiJdfX19)

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
        "dwolla-mcp",
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
npx -y --package dwolla-mcp -- mcp start --bearer-auth ...
```

</details>

<details>
<summary>Manual installation</summary>




To start the MCP server, run:

```bash
npx -y --package dwolla-mcp -- mcp start --bearer-auth ...
```

For a full list of server arguments, run:

```bash
npx -y --package dwolla-mcp -- mcp start --help
```

</details>
<!-- End Installation [installation] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Contributions

While we value contributions to this MCP Server, the code is generated programmatically. Any manual
changes added to internal files will be overwritten on the next generation. We look forward to
hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our
best to include it in a future release.
