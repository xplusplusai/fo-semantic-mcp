# FO Semantic MCP Server

🚀 **The ultimate Model Context Protocol server for Microsoft Dynamics 365 Finance & Operations development**

**Enable true AI pair programming for F&O development!** This MCP server supercharges your AI coding assistant with deep F&O knowledge, enabling AI agents in Cursor IDE, VS Code, and Claude Desktop to automatically query 50,000+ F&O artifacts, analyze local source code, and find relevant examples for your current development task.

🤖 **How it works:** When you're building F&O extensions, your AI assistant can now automatically:
- Find similar implementations and patterns in existing F&O code
- Read actual XML source files from your local F&O installation
- Understand F&O architecture and suggest best practices
- Accelerate extension development with relevant examples

Transform your F&O development workflow with AI-powered semantic search over 50,000+ artifacts. Find examples, understand patterns, and accelerate development with intelligent code discovery.

## 📋 What You Get

✅ **Semantic Search** - Find F&O artifacts using natural language
✅ **50,000+ Artifacts** - Tables, Forms, Classes, EDT, Enums, Data Entities, Views, Queries
✅ **AI Summaries** - Understand artifact purpose without reading XML
✅ **Local File Access** - Read actual F&O XML files for complete analysis
✅ **Adaptive Thresholds** - Automatically retry searches with lower relevance scores
✅ **Multi-Platform** - Works on Windows, macOS, Linux with Node.js
✅ **MCP Compatible** - Works with Cursor IDE, Claude Desktop, VS Code

## 🎯 Perfect For

- **F&O Developers** building extensions and customizations
- **Consultants** learning existing implementations
- **Architects** understanding system patterns
- **Teams** accelerating development cycles

## 🔥 Real-World AI Assistant Scenarios

**Extension Development:**
```
You: "I need to create a custom validation for sales orders"
AI: *automatically searches F&O artifacts* "I found SalesTable validation patterns. Let me read the XML files and show you 3 approaches..."
```

**Learning Existing Code:**
```
You: "How does inventory posting work?"
AI: *queries relevant artifacts* "Based on InventPosting class and related forms, here's the flow..." *reads actual source files*
```

**Best Practices:**
```
You: "What's the right way to extend purchase workflows?"
AI: *finds workflow examples* "Looking at PurchReqWorkflow implementations..." *analyzes local XML*
```

**🚀 True AI pair programming for F&O** - your AI partner has instant access to the entire F&O codebase and becomes your expert development companion!

## ⚡ Quick Start

### 1. Prerequisites

Ensure you have **Node.js** installed:
- Download from: https://nodejs.org/
- Minimum version: Node.js 18+

### 2. Download & Setup

1. Download the latest release and extract it anywhere on your system
2. The package includes:
   - `dist/` - Compiled server files
   - `node_modules/` - Dependencies (pre-installed)
   - `examples/` - Configuration examples for all platforms
   - `package.json` - Project configuration

**All Platforms:** Run with: `node dist/server.js`

### 3. Get API Key

Get your API key from: **https://www.xplusplus.ai/**

Visit our website to view available plans and pricing.

### 4. Configure

Update your MCP client configuration (replace `C:\\Downloads\\` with your extraction path):

**Cursor IDE** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "node",
      "args": ["C:\\Downloads\\fo-semantic-mcp\\dist\\server.js"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here",
        "FO_SEARCH_DEFAULT_THRESHOLD": "0.75",
        "FO_LOCAL_ASSETS_PATH": "C:\\Users\\[firstname.lastname]\\AppData\\Local\\Microsoft\\Dynamics365\\10.0.2263.74\\PackagesLocalDirectory"
      }
    }
  }
}
```

**Claude Desktop** (`~/AppData/Roaming/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "node",
      "args": ["C:\\Downloads\\fo-semantic-mcp\\dist\\server.js"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here",
        "FO_LOCAL_ASSETS_PATH": "C:\\Users\\[firstname.lastname]\\AppData\\Local\\Microsoft\\Dynamics365\\10.0.2263.74\\PackagesLocalDirectory"
      }
    }
  }
}
```


## 🔧 Configuration Options

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `FOINDEX_API_KEY` | **Required** - Your API key | - | `your_api_key_here` |
| `FO_SEARCH_DEFAULT_THRESHOLD` | Relevance filter (0-1) | `0.75` | `0.75` |
| `FO_LOCAL_ASSETS_PATH` | Path to F&O PackagesLocalDirectory | Optional | `C:\Users\[firstname.lastname]\AppData\Local\Microsoft\Dynamics365\10.0.2263.74\PackagesLocalDirectory` |
| `FO_SEARCH_TIMEOUT_MS` | Request timeout | `10000` | `10000` |
| `FO_SEARCH_DEFAULT_LIMIT` | Default result limit | `10` | `10` |

## 💡 Example Queries

```
"Find customer payment processing examples"
"Show me sales order validation patterns"
"Search for inventory transaction handling"
"Find examples of data entity extensions"
"Show purchase order approval workflows"
```

## 🔍 Search Features

### Adaptive Threshold Strategy
AI automatically retries searches with lower thresholds when no results found:
1. **0.75** - High relevance only
2. **0.6** - Medium-high relevance
3. **0.4** - Medium relevance
4. **No threshold** - All results

### Filter Options
- **Artifact Types**: Table, Form, Class, EDT, Enum, DataEntity, View, Query
- **Result Limits**: 1-50 results per search
- **Relevance Scoring**: 0-1 semantic similarity scores

## 📖 Documentation

- **Getting Started**: See `docs/GETTING_STARTED.md`

## 🆘 Support

- **Issues**: Report bugs and feature requests on GitHub
- **Enterprise**: Contact contact@xplusplus.ai for custom solutions

## 📄 License

This software is licensed for commercial use. See `LICENSE` file for details.

## 🚀 About FO-Index

Built by the team behind [FO-Index](https://www.xplusplus.ai) - the comprehensive knowledge base for Microsoft Dynamics 365 Finance & Operations development.

---

**Ready to supercharge your F&O development?** [Get your API key](https://www.xplusplus.ai) and start building better extensions today! 🎯