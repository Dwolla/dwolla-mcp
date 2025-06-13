# dwolla-mcp

Model Context Protocol (MCP) Server for the _dwolla-mcp_ API.

<div align="left">
    <a href="https://www.speakeasy.com/?utm_source=dwolla-mcp&utm_campaign=mcp-typescript"><img src="https://custom-icon-badges.demolab.com/badge/-Built%20By%20Speakeasy-212015?style=for-the-badge&logoColor=FBE331&logo=speakeasy&labelColor=545454" /></a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>

<br /><br />

> [!IMPORTANT] This MCP Server is not yet ready for production use. To complete setup please follow
> the steps outlined in your [workspace](https://app.speakeasy.com/org/dwolla-vc3/dwolla). Delete
> this notice before publishing to a package manager.

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

### Claude

Add the following server definition to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "DwollaMcp": {
      "command": "npx",
      "args": [
        "-y", "--package", "dwolla-mcp",
        "--",
        "mcp", "start",
        "--bearer-auth", "..."
      ]
    }
  }
}
```

### Cursor

Create a `.cursor/mcp.json` file in your project root with the following content:

```json
{
  "mcpServers": {
    "DwollaMcp": {
      "command": "npx",
      "args": [
        "-y", "--package", "dwolla-mcp",
        "--",
        "mcp", "start",
        "--bearer-auth", "..."
      ]
    }
  }
}
```

### Standalone Binary

Run the MCP server as a standalone binary with no additional dependencies. Pull these binaries from available Github releases:

```bash
curl -L -o mcp-server \
    https://github.com/{org}/{repo}/releases/download/{tag}/mcp-server-bun-darwin-arm64 && \
chmod +x mcp-server
```

If the repo is a private repo you must add your Github PAT to download a release `-H "Authorization: Bearer {GITHUB_PAT}"`.

```json
{
  "mcpServers": {
    "Todos": {
      "command": "./DOWNLOAD/PATH/mcp-server",
      "args": [
        "start"
      ]
    }
  }
}
```

For a full list of server arguments, run:

```bash
npx -y --package dwolla-mcp -- mcp start --help
```

### Package Managers

The MCP Server can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

#### NPM

```bash
npm add <UNSET>
```

#### PNPM

```bash
pnpm add <UNSET>
```

#### Bun

```bash
bun add <UNSET>
```

#### Yarn

```bash
yarn add <UNSET>
```
<!-- End Installation [installation] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Contributions

While we value contributions to this MCP Server, the code is generated programmatically. Any manual
changes added to internal files will be overwritten on the next generation. We look forward to
hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our
best to include it in a future release.

### MCP Server Created by [Speakeasy](https://www.speakeasy.com/?utm_source=dwolla-mcp&utm_campaign=mcp-typescript)
