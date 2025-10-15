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

### 2. Download & Setup

1. Download the latest release and extract it anywhere on your system
2. The package includes pre-compiled server files
3. Run `npm install` in the extracted folder to install dependencies

### 3. Get API Key

Get your API key from: **https://www.xplusplus.ai/**

Visit our website to view available plans and pricing.

### 4. Configure

Update your MCP client configuration (replace paths with your actual paths):

**Cursor IDE** (`~/.cursor/mcp.json` or `%USERPROFILE%\.cursor\mcp.json`):
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "node",
      "args": ["C:\\path\\to\\fo-semantic-mcp\\dist\\server.js"],
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
      "command": "node",
      "args": ["C:\\path\\to\\fo-semantic-mcp\\dist\\server.js"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here",
        "FO_LOCAL_ASSETS_PATH": "C:\\Users\\YourName\\AppData\\Local\\Microsoft\\Dynamics365\\10.0.xxxx\\PackagesLocalDirectory"
      }
    }
  }
}
```

**macOS/Linux** paths use forward slashes: `/Users/yourname/path/to/fo-semantic-mcp/dist/server.js`

### 5. Restart Your AI Client

Completely restart Cursor IDE or Claude Desktop to load the MCP server.

## 🔧 Configuration Options

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FOINDEX_API_KEY` | Your API key from xplusplus.ai | - | ✅ Yes |
| `FO_LOCAL_ASSETS_PATH` | Path to F&O PackagesLocalDirectory | - | Recommended |
| `FO_SEARCH_DEFAULT_THRESHOLD` | Relevance filter (0-1) | `0.5` | No |
| `FO_SEARCH_TIMEOUT_MS` | Request timeout (milliseconds) | `10000` | No |
| `FO_SEARCH_DEFAULT_LIMIT` | Default result limit | `10` | No |
| `FO_SEARCH_MAX_LIMIT` | Maximum result limit | `50` | No |

### Finding Your PackagesLocalDirectory

**Windows:**
```
C:\Users\[YourName]\AppData\Local\Microsoft\Dynamics365\[version]\PackagesLocalDirectory
```

**PowerShell command to find it:**
```powershell
Get-ChildItem "$env:LOCALAPPDATA\Microsoft\Dynamics365\" -Recurse -Filter "PackagesLocalDirectory" | Select-Object FullName
```

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

### In Claude Desktop
Use the `fo-development-assistant` prompt for guided F&O development workflows.

### In Cursor IDE
Ask your AI assistant to search F&O artifacts, then guide it to:
1. Search standard D365 implementations
2. Search your workspace for custom code
3. Combine insights for context-aware solutions

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

## 📖 What's New in v2.0

### Breaking Changes
- ✅ **Simplified architecture** - Server instructions now provide concise tool documentation only
- ✅ **Clean tool responses** - Returns data without workflow checklists
- ✅ **Single prompt** - One clear `fo-development-assistant` prompt (was 2 confusing prompts)
- ✅ **Removed obfuscation** - Standard TypeScript build for transparency
- ✅ **Production-ready package** - Only essential runtime files included

### Improvements
- ✅ **Honest capabilities** - Clear about what works automatically vs manually
- ✅ **Better MCP alignment** - Follows proper MCP architecture patterns
- ✅ **Simpler codebase** - Easier to understand and maintain
- ✅ **Cleaner release** - No development artifacts or intermediate files

### Migration from v1.x
No breaking API changes - just update your installation and restart your AI client.

## 🆘 Support

- **Issues**: Report bugs and feature requests on GitHub
- **Documentation**: See `docs/GETTING_STARTED.md` for detailed setup
- **Enterprise**: Contact contact@xplusplus.ai for custom solutions

## 📄 License

This software is licensed for commercial use. See `LICENSE` file for details.

## 🚀 About FO-Index

Built by the team behind [FO-Index](https://www.xplusplus.ai) - the comprehensive knowledge base for Microsoft Dynamics 365 Finance & Operations development.

---

**Ready to enhance your F&O development?** [Get your API key](https://www.xplusplus.ai) and start today! 🎯
