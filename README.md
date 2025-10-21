# FO Semantic MCP Server

🚀 **Model Context Protocol server for Microsoft Dynamics 365 Finance & Operations development**

Supercharge your AI coding assistant with deep F&O knowledge. This MCP server enables AI agents in Cursor IDE, Claude Desktop, and VS Code to search 50,000+ F&O artifacts, read local source code, and find relevant examples for your development tasks.

🤖 **What it provides:** When building F&O extensions, your AI assistant can:
- Search F&O artifacts using natural language queries
- Find similar implementations and patterns in standard D365 code
- Read actual XML source files from your local F&O installation
- Access rich metadata about tables, forms, classes, and more

## 📋 Features

✅ **Semantic Search** - Find F&O artifacts using natural language
✅ **50,000+ Artifacts** - Tables, Forms, Classes, EDT, Enums, Data Entities, Views, Queries
✅ **AI Descriptions** - Understand artifact purpose without reading XML
✅ **Local File Access** - Read actual F&O XML files for complete analysis
✅ **Rich Metadata** - Business domains, modules, configuration keys, usage context
✅ **Multi-Platform** - Works on Windows, macOS, Linux with Node.js
✅ **MCP Compatible** - Works with Cursor IDE, Claude Desktop, VS Code

## 🎯 Perfect For

- **F&O Developers** building extensions and customizations
- **Consultants** learning existing implementations
- **Architects** understanding system patterns
- **Teams** accelerating development cycles

## 🔧 What's Included

### MCP Tool: `search_FO_artifacts`
Search Microsoft D365 F&O standard artifacts semantically. Returns artifact metadata including:
- Artifact name, type, and module
- AI-generated descriptions and usage context
- Business domain classification
- Local file paths (if configured)

### MCP Prompt: `fo-development-assistant` (Claude Desktop only)
A complete 6-step development workflow for F&O customizations:
1. Search standard D365 artifacts
2. Read standard implementations
3. Search your workspace for custom code
4. Read your customizations
5. Generate context-aware solutions
6. Present comprehensive analysis

**Note:** The prompt workflow is user-invoked and works in Claude Desktop. In Cursor IDE, you can guide the AI through similar steps manually.

## ⚡ Quick Start

### 1. Prerequisites

Ensure you have **Node.js** installed:
- Download from: https://nodejs.org/
- Minimum version: Node.js 18+

### 2. Get API Key

Get your API key from: **https://www.xplusplus.ai/**

Visit our website to view available plans and pricing.

### 3. Installation

Choose the installation method that works best for you:

#### Option A: Use with npx (Recommended - Always Latest Version)

No installation needed! Your MCP client will automatically fetch the latest version when started.

**Cursor IDE** (`~/.cursor/mcp.json` or `%USERPROFILE%\.cursor\mcp.json`):
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "npx",
      "args": ["-y", "fo-semantic-mcp"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here",
        "FO_LOCAL_ASSETS_PATH": "C:\\Users\\YourName\\AppData\\Local\\Microsoft\\Dynamics365\\10.0.xxxx\\PackagesLocalDirectory"
      }
    }
  }
}
```

**Claude Desktop** (`~/AppData/Roaming/Claude/claude_desktop_config.json` on Windows):
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "npx",
      "args": ["-y", "fo-semantic-mcp"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here",
        "FO_LOCAL_ASSETS_PATH": "C:\\Users\\YourName\\AppData\\Local\\Microsoft\\Dynamics365\\10.0.xxxx\\PackagesLocalDirectory"
      }
    }
  }
}
```

**VS Code** (similar to Cursor IDE configuration above)

**Benefits of npx:**
- ✅ No installation required
- ✅ Always uses latest version automatically
- ✅ No manual updates needed
- ✅ Works on Windows, macOS, and Linux

**macOS/Linux users:** Use forward slashes in paths:
```json
{
  "env": {
    "FOINDEX_API_KEY": "your_api_key_here",
    "FO_LOCAL_ASSETS_PATH": "/Users/yourname/.local/Microsoft/Dynamics365/10.0.xxxx/PackagesLocalDirectory"
  }
}
```

#### Option B: Global Installation

Install the package globally on your system:

```bash
npm install -g fo-semantic-mcp
```

Then configure your MCP client:

**Cursor IDE / Claude Desktop / VS Code**:
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "fo-semantic-mcp",
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here",
        "FO_LOCAL_ASSETS_PATH": "C:\\Users\\YourName\\AppData\\Local\\Microsoft\\Dynamics365\\10.0.xxxx\\PackagesLocalDirectory"
      }
    }
  }
}
```

**When to use global installation:**
- You want to pin to a specific version
- You have limited internet connectivity
- You prefer explicit version control

**To update:**
```bash
npm update -g fo-semantic-mcp
```

#### Option C: Manual Installation from GitHub Release

Download and run from a local directory:

1. Download the [latest release](https://github.com/xplusplusai/fo-semantic-mcp/releases) from GitHub
2. Extract to your preferred location (e.g., `C:\tools\fo-semantic-mcp`)
3. Run `npm install` in the extracted folder

Then configure using the full path:

```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "node",
      "args": ["C:\\tools\\fo-semantic-mcp\\dist\\server.js"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here",
        "FO_LOCAL_ASSETS_PATH": "C:\\Users\\YourName\\AppData\\Local\\Microsoft\\Dynamics365\\10.0.xxxx\\PackagesLocalDirectory"
      }
    }
  }
}
```

**macOS/Linux** paths use forward slashes: `/path/to/fo-semantic-mcp/dist/server.js`

**When to use manual installation:**
- You want full control over the installation location
- You're developing or customizing the server
- Your environment restricts npm package execution

### 4. Restart Your AI Client

Completely restart Cursor IDE, Claude Desktop, or VS Code to load the MCP server.

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FOINDEX_API_KEY` | Your API key from xplusplus.ai | - | ✅ Yes |
| `FO_LOCAL_ASSETS_PATH` | Path to F&O PackagesLocalDirectory | - | Recommended |
| `FO_SEARCH_DEFAULT_THRESHOLD` | Relevance filter (0-1) | No threshold | No |
| `FO_SEARCH_TIMEOUT_MS` | Request timeout (milliseconds) | `10000` | No |
| `FO_SEARCH_DEFAULT_LIMIT` | Default result limit | `10` | No |
| `FO_SEARCH_MAX_LIMIT` | Maximum result limit | `50` | No |

### Finding Your PackagesLocalDirectory

The `FO_LOCAL_ASSETS_PATH` enables reading actual F&O XML source files. This is **optional** but highly recommended for full analysis capabilities.

**Windows:**
```
C:\Users\[YourName]\AppData\Local\Microsoft\Dynamics365\[version]\PackagesLocalDirectory
```

**PowerShell command to find it:**
```powershell
Get-ChildItem "$env:LOCALAPPDATA\Microsoft\Dynamics365\" -Recurse -Filter "PackagesLocalDirectory" | Select-Object FullName
```

**macOS/Linux:**
Depends on your F&O development setup. Common locations:
```
~/.local/Microsoft/Dynamics365/[version]/PackagesLocalDirectory
~/Library/Application Support/Microsoft/Dynamics365/[version]/PackagesLocalDirectory
```

**Note:** If `FO_LOCAL_ASSETS_PATH` is not configured, the server will still work for semantic search but won't be able to read local XML files.

## 💡 Example Usage

### Basic Searches
```
"Find customer tables in D365"
"Show me sales order forms"
"Search for pricing calculation classes"
"Find inventory transaction data entities"
```

### Artifact Type Filters
You can filter by artifact type for more focused results:
- Tables
- Forms
- Classes
- EDT (Extended Data Types)
- Enums
- DataEntity
- Views
- Queries

### Advanced Queries
```
"Find all tables related to inventory management"
"Show me forms that use the CustTable datasource"
"Search for classes that implement pricing logic"
"Find data entities for financial reporting"
```

### In Claude Desktop
Use the `fo-development-assistant` prompt for guided F&O development workflows. Simply type `/fo-development-assistant` to activate the structured workflow.

### In Cursor IDE & VS Code
Ask your AI assistant to search F&O artifacts, then guide it through a workflow:
1. Search standard D365 implementations
2. Read source files to understand patterns
3. Search your workspace for existing customizations
4. Combine insights for context-aware solutions

## 🎬 Live Demo

**See it in action!** Check out our [Real-Life Demo](https://www.xplusplus.ai/mcp-demo.html) showing how an AI agent uses the MCP server to complete a full D365 F&O customization task - from natural language request to working code.

**Task:** "Create a new field 'External name' on vendor group table and add it to form general tab"

**What you'll see:**
- AI using semantic search to find D365 artifacts
- Reading standard implementations via file paths
- Checking workspace for existing customizations
- Generating complete table and form extensions
- All in a single session with proper D365 patterns

👉 [**View the Complete Demo**](https://www.xplusplus.ai/mcp-demo.html)

## 🔧 Troubleshooting

### Tools Not Loading

**Symptom:** MCP server appears in your client but tools don't show up

**Solutions:**
1. Verify `FOINDEX_API_KEY` is set correctly (no quotes in JSON, no extra spaces)
2. Completely restart your AI client (not just reload window)
3. Check MCP server logs in your client's developer console
4. Test with `npx fo-semantic-mcp` directly in terminal to verify installation

### Timeout Errors

**Symptom:** "Request timeout" or "Connection refused" errors

**Solutions:**
1. Verify internet connectivity to `https://search.xplusplus.ai`
2. Increase timeout: `"FO_SEARCH_TIMEOUT_MS": "30000"` (30 seconds)
3. Check if firewall/proxy is blocking the connection
4. Try with a different network (corporate firewalls may block external APIs)

### Local File Reading Not Working

**Symptom:** Can search artifacts but can't read XML source files

**Solutions:**
1. Verify `FO_LOCAL_ASSETS_PATH` points to correct directory
2. Ensure the path exists and is accessible
3. On Windows, use double backslashes: `"C:\\Users\\..."`
4. Check file permissions for the PackagesLocalDirectory
5. Restart your AI client after updating the path

### npx Command Fails

**Symptom:** "npx: command not found" or npm errors

**Solutions:**
1. Ensure Node.js 18+ is installed: `node --version`
2. Ensure npm is installed: `npm --version`
3. Update npm: `npm install -g npm@latest`
4. Try global installation method instead (Option B above)

### Version-Specific Issues

**To check your installed version:**
```bash
# For global installation
npm list -g fo-semantic-mcp

# For npx (shows latest available)
npm view fo-semantic-mcp version
```

**To force specific version with npx:**
```json
{
  "command": "npx",
  "args": ["-y", "fo-semantic-mcp@2.0.7"]
}
```

## 📖 What's New in v2.0.7

### Latest Fixes
- ✅ **MCP STDIO protocol compliance** - Fixed initialization timeouts in Claude Desktop
- ✅ **MCP registry publication** - Now discoverable in official MCP catalog at registry.modelcontextprotocol.io
- ✅ **npm installation support** - Install via `npm install -g` or use directly with `npx`
- ✅ **Character encoding fixes** - Clean display of prompts and responses
- ✅ **Logging improvements** - All logs use STDERR for proper MCP protocol compliance

### Previous v2.0 Improvements
- ✅ **Simplified architecture** - Concise tool documentation and clean responses
- ✅ **Single prompt** - One clear `fo-development-assistant` prompt
- ✅ **Standard TypeScript build** - Removed obfuscation for transparency
- ✅ **Production-ready package** - Only essential runtime files included
- ✅ **Better MCP alignment** - Follows proper MCP architecture patterns

### Migration from Earlier Versions

**From v1.x:**
- No breaking API changes
- Update installation and restart your AI client
- Configuration format is compatible

**From v2.0.0-2.0.6:**
- Use npx method for easiest updates
- Update configuration to use `npx` command (recommended)
- Restart AI client to load new version

## 🆘 Support

- **Issues**: Report bugs and feature requests on [GitHub Issues](https://github.com/xplusplusai/fo-semantic-mcp/issues)
- **Documentation**: See [Getting Started Guide](https://github.com/xplusplusai/fo-semantic-mcp/blob/main/docs/GETTING_STARTED.md)
- **Enterprise**: Contact contact@xplusplus.ai for custom solutions and enterprise support
- **Community**: Join discussions on GitHub

## 📄 License

This software is licensed for commercial use. See [LICENSE](https://github.com/xplusplusai/fo-semantic-mcp/blob/main/LICENSE) file for details.

## 🚀 About FO-Index

Built by the team behind [FO-Index](https://www.xplusplus.ai) - the comprehensive knowledge base for Microsoft Dynamics 365 Finance & Operations development.

**Our Mission:** Accelerate D365 F&O development by making Microsoft's vast standard artifact library searchable and understandable through AI.

---

**Ready to enhance your F&O development?** [Get your API key](https://www.xplusplus.ai) and start today! 🎯
