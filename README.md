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

✅ **AI-Optimized Workflow** - Proven 6-step methodology for context-aware development
✅ **Custom Code Awareness** - AI checks your existing extensions before generating code
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

## 🚀 v1.3.0 - AI Workflow Enhancement

**AI-Optimized Instructions**: Enhanced MCP server instructions with proven 6-step development workflow ensuring AI always checks user's existing customizations before generating code.

**Key Features:**
- **🎯 Golden Path Workflow**: AI now follows structured 6-step methodology for every F&O development task
- **🔧 Custom Code Discovery**: AI automatically searches YOUR workspace for existing extensions before generating code
- **📊 Context-Aware Generation**: Combines standard D365 patterns with your existing customizations
- **⚠️ Prevents Conflicts**: Eliminates #1 problem - AI generating code that conflicts with your extensions

**Why This Matters**: AI never generates code blindly - it always checks your existing extensions first, ensuring generated code integrates seamlessly with your current implementation.

## 🔧 v1.2.1 - Critical Threshold Fix

**Resolved**: Fixed threshold settings that were filtering out exact matches. Updated all examples to use 0.5 threshold for reliable foName filter functionality.

## 🆕 v1.2.0 - Exact Artifact Matching

**Exact Artifact Matching**: Added `foName` filter for precise artifact lookup when you know the exact F&O artifact name.

**Key Features:**
- **foName Filter**: Find specific artifacts by exact name (e.g., "CustTable", "SalesTable")
- **AI Assistant Integration**: Enhanced MCP server instructions for exact matching
- **Improved Precision**: Perfect for when you know exact artifact names from requirements

## ⚠️ Compatibility Note

**Cursor IDE Compatibility**: This version maintains dual-format response support to ensure compatibility across all Cursor IDE versions:

1. **Structured Content** - For older clients with structured content display and MCP protocol compliance
2. **Embedded JSON in Text** - For newer clients with structured content display issues

---

## 🤖 How AI Uses This Tool - The Golden Path Workflow

When you ask AI to help with F&O development, it now follows a **proven 6-step workflow** that ensures context-aware code generation:

### **The Workflow in Action:**

**You:** "Add a custom field to SalesTable form"

**AI follows Golden Path:**
```
Step 1: 🔍 Search Standard D365
        → Finds SalesTable form in Microsoft's implementation

Step 2: 📖 Read Standard Implementation
        → Reads Microsoft's XML to understand structure and patterns

Step 3: 🔧 Search YOUR Custom Code (Critical!)
        → Searches YOUR workspace for existing SalesTable extensions

Step 4: 📖 Read YOUR Customizations
        → Reads your current extensions to understand your style

Step 5: ✨ Generate Context-Aware Code
        → Creates extension that works with YOUR existing code

Step 6: 💡 Present with Full Context
        → Shows: Standard artifacts + Your extensions + Generated code
```

**Result:** Code that integrates perfectly with your existing customizations, not generic code that conflicts with your extensions.

### **Why This Matters:**

**❌ Old Way (Without Golden Path):**
```
You: "Add field to SalesTable"
AI: *searches standard only* → generates code → conflicts with your existing extensions
```

**✅ New Way (With Golden Path):**
```
You: "Add field to SalesTable"
AI: *searches standard + YOUR code* → generates code that extends YOUR implementation
```

## 🔥 Real-World Scenarios

**Extension Development:**
```
You: "I need to create a custom validation for sales orders"
AI: Step 1-2: *searches + reads standard SalesTable validation*
    Step 3-4: *finds + reads YOUR existing SalesTable extensions*
    Step 5-6: "I see you already have SalesTable.Extension1. Here's validation
              code that extends YOUR implementation..."
```

**Learning Existing Code:**
```
You: "How does inventory posting work?"
AI: *follows Golden Path* "In standard D365: [shows InventPosting]
    In YOUR code: [shows your customizations]
    Here's how they work together..."
```

**🚀 True AI pair programming for F&O** - your AI partner has instant access to BOTH the entire F&O codebase AND your existing customizations!

## ⚡ Quick Start

### 1. Prerequisites

Ensure you have **Node.js** installed:
- Download from: https://nodejs.org/
- Minimum version: Node.js 18+

### 2. Download & Setup

1. Download the latest release and extract it anywhere on your system
2. Use correct file and folder path in mcp configuration json

**Windows:** Use the provided `fo-semantic-mcp-win.cmd` launcher

**macOS/Linux:** Run directly with: `node dist/server.js`

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
        "FO_SEARCH_DEFAULT_THRESHOLD": "0.5",
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

**Alternative for Windows** - Use the launcher script:
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "C:\\Downloads\\fo-semantic-mcp\\fo-semantic-mcp-win.cmd",
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
| `FO_SEARCH_DEFAULT_THRESHOLD` | Relevance filter (0-1) | `0.5` | `0.5` |
| `FO_LOCAL_ASSETS_PATH` | Path to F&O PackagesLocalDirectory | Optional | `C:\Users\[firstname.lastname]\AppData\Local\Microsoft\Dynamics365\10.0.2263.74\PackagesLocalDirectory` |
| `FO_SEARCH_TIMEOUT_MS` | Request timeout | `10000` | `10000` |
| `FO_SEARCH_DEFAULT_LIMIT` | Default result limit | `10` | `10` |

## 💡 Example Queries

### Natural Language Search
```
"Find customer payment processing examples"
"Show me sales order validation patterns"
"Search for inventory transaction handling"
"Find examples of data entity extensions"
"Show purchase order approval workflows"
```

### Exact Artifact Matching (New in v1.2.0)
```javascript
// When you know the exact artifact name
search_fo_artifacts({
  query: "currency table",
  filters: { foName: "Currency" }
})

// Find specific table by exact name
search_fo_artifacts({
  query: "customer data",
  filters: { foName: "CustTable" }
})

// Locate exact form
search_fo_artifacts({
  query: "sales order form",
  filters: { foName: "SalesTable" }
})
```

## 🔍 Search Features

### Adaptive Threshold Strategy
AI automatically retries searches with lower thresholds when no results found:
1. **0.5** - High relevance only
2. **0.6** - Medium-high relevance
3. **0.4** - Medium relevance
4. **No threshold** - All results

### Filter Options
- **Artifact Types**: Table, Form, Class, EDT, Enum, DataEntity, View, Query
- **foName Filter**: Exact match by specific F&O artifact name (e.g., "CustTable", "SalesTable")
- **Result Limits**: 1-50 results per search
- **Relevance Scoring**: 0-1 semantic similarity scores

### When to Use foName Filter
- **Known Artifact Names**: When you have exact F&O artifact names from requirements or documentation
- **Precise Lookup**: Skip semantic matching and get the exact artifact you need
- **Development Workflow**: Faster artifact discovery when exact names are specified

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