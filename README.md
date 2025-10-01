# FO Semantic MCP Server

🚀 **The ultimate Model Context Protocol server for Microsoft Dynamics 365 Finance & Operations development**

Transform your F&O development workflow with AI-powered semantic search over 50,000+ artifacts. Find examples, understand patterns, and accelerate development with intelligent code discovery.

## 📋 What You Get

✅ **Semantic Search** - Find F&O artifacts using natural language
✅ **50,000+ Artifacts** - Tables, Forms, Classes, EDT, Enums, Data Entities, Views, Queries
✅ **AI Summaries** - Understand artifact purpose without reading XML
✅ **Local File Access** - Read actual F&O XML files for complete analysis
✅ **Adaptive Thresholds** - Automatically retry searches with lower relevance scores
✅ **Multi-Platform** - Windows, macOS, Linux binaries
✅ **MCP Compatible** - Works with Cursor IDE, Claude Desktop, VS Code

## 🎯 Perfect For

- **F&O Developers** building extensions and customizations
- **Consultants** learning existing implementations
- **Architects** understanding system patterns
- **Teams** accelerating development cycles

## ⚡ Quick Start

### 1. Download

Download the latest release for your platform:
- **Windows**: `fo-semantic-mcp-win.exe`
- **macOS**: `fo-semantic-mcp-macos`
- **Linux**: `fo-semantic-mcp-linux`

### 2. Install

Choose one of these options:

**Option A: Automated Installation (Recommended)**

Windows:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/install-windows.ps1
```

macOS/Linux:
```bash
bash scripts/install-macos.sh  # or install-linux.sh
```

The script will:
- Copy binary to appropriate location
- Add to your PATH automatically
- Set up proper permissions

**Option B: Manual Installation**

1. Copy the binary to a location in your PATH
   - Windows: `C:\Program Files\fo-semantic-mcp\`
   - macOS/Linux: `/usr/local/bin/`
2. Make executable (macOS/Linux): `chmod +x fo-semantic-mcp-*`
3. Use full path in your IDE configuration if not in PATH

### 3. Get API Key

Get your API key from: **https://www.xplusplus.ai/**

Visit our website to view available plans and pricing.

### 4. Configure

Update your MCP client configuration:

**Cursor IDE** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "fo-semantic-mcp",
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here",
        "FO_SEARCH_DEFAULT_THRESHOLD": "0.75"
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
      "command": "fo-semantic-mcp",
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## 🔧 Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `FOINDEX_API_KEY` | **Required** - Your API key | - |
| `FO_SEARCH_DEFAULT_THRESHOLD` | Relevance filter (0-1) | `0.75` |
| `FO_LOCAL_ASSETS_PATH` | Path to F&O PackagesLocalDirectory | Optional |
| `FO_SEARCH_TIMEOUT_MS` | Request timeout | `10000` |
| `FO_SEARCH_DEFAULT_LIMIT` | Default result limit | `10` |

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
- **Configuration**: See `docs/CONFIGURATION.md`
- **Troubleshooting**: See `docs/TROUBLESHOOTING.md`
- **API Reference**: https://fo-semantic-mcp.xplusplus.ai/docs

## 🆘 Support

- **Documentation**: https://fo-semantic-mcp.xplusplus.ai
- **Issues**: Report bugs and feature requests on GitHub
- **Community**: Join our Discord for discussions
- **Enterprise**: Contact contact@xplusplus.ai for custom solutions

## 📄 License

This software is licensed for commercial use. See `LICENSE` file for details.

## 🚀 About FO-Index

Built by the team behind [FO-Index](https://www.xplusplus.ai) - the comprehensive knowledge base for Microsoft Dynamics 365 Finance & Operations development.

---

**Ready to supercharge your F&O development?** [Get your API key](https://www.xplusplus.ai) and start building better extensions today! 🎯