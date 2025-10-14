# Getting Started with FO Semantic MCP Server

## 🚀 Quick Setup (5 minutes)

### Prerequisites

- **Node.js 18+** - Download from https://nodejs.org/
- **API Key** - Get yours at https://www.xplusplus.ai/

### 1. Download & Extract

1. Download the latest release from [GitHub Releases](https://github.com/xplusplusai/fo-semantic-mcp/releases)
2. Extract the zip/tar.gz to any location (e.g., `C:\tools\fo-semantic-mcp`)

### 2. Install Dependencies

```bash
cd fo-semantic-mcp
npm install
```

This installs the required packages (@modelcontextprotocol/sdk, node-fetch, zod).

### 3. Get API Key

- Visit: https://www.xplusplus.ai/
- Sign up for a plan
- Copy your API key (starts with `ak_`)

### 4. Configure Your AI Client

**Cursor IDE** (`~/.cursor/mcp.json` or `%USERPROFILE%\.cursor\mcp.json`):
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "node",
      "args": ["C:\\tools\\fo-semantic-mcp\\dist\\server.js"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

**Claude Desktop** (Windows: `~/AppData/Roaming/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "node",
      "args": ["/path/to/fo-semantic-mcp/dist/server.js"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

**macOS/Linux** paths use forward slashes:
```json
{
  "args": ["/Users/yourname/fo-semantic-mcp/dist/server.js"]
}
```

### 5. Restart & Test

1. **Completely restart** your AI client (Cursor IDE or Claude Desktop)
2. Look for the MCP connection in logs/status
3. Try a search: **"Find customer payment processing examples in D365 F&O"**

## 🔧 Optional: Local F&O File Access

To enable reading your local F&O XML files, add `FO_LOCAL_ASSETS_PATH`:

### Finding Your PackagesLocalDirectory

**Windows:**
```powershell
Get-ChildItem "$env:LOCALAPPDATA\Microsoft\Dynamics365\" -Recurse -Filter "PackagesLocalDirectory" | Select-Object FullName
```

Example path: `C:\Users\YourName\AppData\Local\Microsoft\Dynamics365\10.0.2263.74\PackagesLocalDirectory`

### Add to Configuration

```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "node",
      "args": ["C:\\tools\\fo-semantic-mcp\\dist\\server.js"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here",
        "FO_LOCAL_ASSETS_PATH": "C:\\Users\\YourName\\AppData\\Local\\Microsoft\\Dynamics365\\10.0.2263.74\\PackagesLocalDirectory"
      }
    }
  }
}
```

## 🎯 Using the MCP Prompt (Claude Desktop Only)

Claude Desktop supports MCP prompts for guided workflows.

### Invoke the Development Assistant

1. In Claude Desktop, type `/` to see available prompts
2. Select `fo-development-assistant`
3. Enter your F&O development task (e.g., "Add field to SalesTable header")
4. Claude will follow the 6-step workflow automatically

### The 6-Step Workflow

When you invoke the prompt, Claude will:
1. Search standard D365 artifacts
2. Read standard implementations
3. Search your workspace for custom code
4. Read your customizations
5. Generate context-aware solutions
6. Present comprehensive analysis

**Note:** This workflow is user-invoked via the prompt selector. In Cursor IDE (which doesn't support prompts), you can guide the AI through similar steps manually.

## ✅ You're Ready!

Your AI assistant now has access to 50,000+ F&O artifacts and can help with:
- Finding implementation examples
- Understanding F&O patterns and best practices
- Accelerating extension development
- Learning existing code
- Context-aware code generation

## 💡 Example Queries

### Basic Searches
```
"Find customer tables in D365"
"Show me sales order forms"
"Search for pricing calculation classes"
"Find inventory transaction data entities"
```

### With Context
```
"What forms should I extend for a SalesTable header field?"
"How does Microsoft implement purchase order validation?"
"Find examples of data entity extensions"
```

### In Claude Desktop (with prompt)
```
Invoke: fo-development-assistant
Task: "Add custom approval workflow to purchase orders"
```

## 🔧 Configuration Options

Add these to the `env` section as needed:

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `FOINDEX_API_KEY` | **Required** - Your API key | - | `ak_xxx...` |
| `FO_LOCAL_ASSETS_PATH` | Path to PackagesLocalDirectory | - | `C:\Users\...\PackagesLocalDirectory` |
| `FO_SEARCH_DEFAULT_THRESHOLD` | Relevance filter (0-1) | `0.5` | `0.4` |
| `FO_SEARCH_TIMEOUT_MS` | Request timeout | `10000` | `30000` |
| `FO_SEARCH_DEFAULT_LIMIT` | Default result count | `10` | `20` |
| `FO_SEARCH_MAX_LIMIT` | Maximum results | `50` | `100` |

## 🐛 Troubleshooting

### "FOINDEX_API_KEY environment variable is required"
- Verify API key is set in `env` section
- Check for typos in the key
- Ensure key starts with `ak_`

### "Cannot connect to search API"
- Check internet connection
- Verify API key is active at https://www.xplusplus.ai/

### Server not starting
```bash
# Test manually
cd fo-semantic-mcp
node dist/server.js
# Should show: "FOINDEX_API_KEY environment variable is required"
# (This is expected - means server is working)
```

### Local files not accessible
- Verify `FO_LOCAL_ASSETS_PATH` points to correct directory
- Use double backslashes in Windows paths: `C:\\Users\\...`
- Check directory exists and is readable

## 🆘 Need Help?

- **Issues**: Report bugs at [GitHub Issues](https://github.com/xplusplusai/fo-semantic-mcp/issues)
- **Documentation**: See main [README](../README.md) for detailed features
- **Changelog**: See [CHANGELOG](../CHANGELOG.md) for version history
- **Support**: contact@xplusplus.ai

## 📖 What's New in v2.0

- ✅ Simplified architecture following proper MCP design
- ✅ Clean tool responses (data only, no checklists)
- ✅ Single clear prompt: `fo-development-assistant`
- ✅ Honest documentation about capabilities
- ✅ Production-ready package structure

See [CHANGELOG.md](../CHANGELOG.md) for full details.

---

Happy F&O development! 🎯
