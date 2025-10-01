# Getting Started with FO Semantic MCP Server

## 🚀 Quick Setup (5 minutes)

### 1. Download & Place Binary
- Download your platform's binary from the [latest release](https://github.com/xplusplusai/fo-semantic-mcp/releases)
- Place it anywhere (e.g., `C:\Downloads\fo-semantic-mcp-win.exe`)
- Make executable on macOS/Linux: `chmod +x fo-semantic-mcp-*`

### 2. Get API Key
- Visit: https://www.xplusplus.ai/
- Sign up for a plan
- Copy your API key

### 3. Configure Your IDE

**Cursor IDE** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "C:\\Downloads\\fo-semantic-mcp-win.exe",
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here"
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
      "command": "C:\\Downloads\\fo-semantic-mcp-win.exe",
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### 4. Restart & Test
1. Restart your IDE
2. Look for green MCP indicator
3. Try: "Find customer payment processing examples"

## 🔧 Optional: Local F&O Integration

To enable reading your local F&O XML files, add:
```json
"FO_LOCAL_ASSETS_PATH": "C:\\Users\\[firstname.lastname]\\AppData\\Local\\Microsoft\\Dynamics365\\10.0.2263.74\\PackagesLocalDirectory"
```

Replace `[firstname.lastname]` with your actual Windows username.

## ✅ You're Ready!

Your AI assistant now has access to 50,000+ F&O artifacts and can help with:
- Finding implementation examples
- Understanding F&O patterns
- Accelerating extension development
- Learning existing code

## 🆘 Need Help?

- **Issues**: Report bugs on GitHub
- **Documentation**: See main [README](../README.md) for detailed features
- **Support**: contact@xplusplus.ai

Happy F&O development! 🎯