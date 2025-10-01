# Getting Started with FO Semantic MCP Server

## 🎯 What is FO Semantic MCP Server?

**FO Semantic MCP Server enables true AI pair programming for F&O development!**

This MCP server enables AI agents in Cursor IDE, Claude Desktop, and VS Code to automatically query 50,000+ F&O artifacts and analyze local source code when you're building extensions.

🤖 **How Your AI Assistant Uses This:**
- **Automatically finds relevant examples** when you describe what you want to build
- **Reads actual F&O XML source files** from your local installation
- **Suggests implementation patterns** based on existing F&O code
- **Understands F&O architecture** and provides context-aware guidance

**Transform your development workflow** - experience true AI pair programming where your AI partner has instant access to the entire F&O codebase and becomes your expert development companion!

## 🚀 Quick Installation

### Step 1: Download Binary
Choose your platform from the [latest release](https://github.com/your-org/fo-semantic-mcp/releases):
- **Windows**: `fo-semantic-mcp-win.exe`
- **macOS**: `fo-semantic-mcp-macos`
- **Linux**: `fo-semantic-mcp-linux`

### Step 2: Install
**Windows:**
```powershell
# Download and run installer
powershell -ExecutionPolicy Bypass -File scripts/install-windows.ps1
```

**macOS/Linux:**
```bash
# Download and run installer
bash scripts/install-macos.sh
```

### Step 3: Get API Key
1. Visit: https://www.xplusplus.ai/
2. Sign up and choose a plan that fits your needs
3. Check our website for current pricing and plan details

### Step 4: Configure Your IDE

**Cursor IDE:**
1. Open `~/.cursor/mcp.json` (create if doesn't exist)
2. Add configuration:
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

**Claude Desktop:**
1. Open `~/AppData/Roaming/Claude/claude_desktop_config.json`
2. Add configuration:
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

### Step 5: Restart & Test
1. Restart your IDE
2. Look for the green MCP indicator
3. Try a search: "Find customer payment processing examples"

## 🔍 Your First Search

### Example Queries
```
"Find examples of sales order validation"
"Show me inventory transaction handling"
"Search for customer payment processing"
"Find data entity extensions"
"Show purchase approval workflows"
```

### Search Results Include
- **foName**: Artifact name for referencing
- **artifactType**: Table, Form, Class, etc.
- **aiDescription**: AI summary of purpose
- **relevanceScore**: How well it matches your query
- **fullLocalPath**: Path to actual XML file (if configured)

## 🎛️ Advanced Configuration

### Environment Variables
```bash
# Required
FOINDEX_API_KEY=your_api_key_here

# Optional - Fine-tuning
FO_SEARCH_DEFAULT_THRESHOLD=0.75    # Relevance filter (0-1)
FO_LOCAL_ASSETS_PATH=C:\path\to\PackagesLocalDirectory
FO_SEARCH_TIMEOUT_MS=10000          # Request timeout
FO_SEARCH_DEFAULT_LIMIT=10          # Results per search
```

### Local F&O Integration
To read actual XML files:
1. Set `FO_LOCAL_ASSETS_PATH` to your F&O installation
2. Example: `C:\AOSService\PackagesLocalDirectory`
3. Results will include `fullLocalPath` for direct file access

## 🤖 How AI Uses This Tool

The MCP server is designed to work seamlessly with AI assistants:

### Adaptive Search Strategy
When you ask for something and no results are found at high relevance (0.75), the AI automatically tries:
1. **0.6** - Medium-high relevance
2. **0.4** - Medium relevance
3. **No threshold** - All results

### Intelligent Workflows
AI will typically:
1. **Search** for relevant artifacts
2. **Read** XML files using `fullLocalPath`
3. **Analyze** patterns and structure
4. **Implement** following F&O conventions

## 📚 Next Steps
- Read [Configuration Guide](CONFIGURATION.md)
- Check [Troubleshooting](TROUBLESHOOTING.md)
- Join our community Discord
- Report issues on GitHub

## 💡 Pro Tips
- Start with **broad queries** then refine
- Use **artifact type filters** for specific searches
- **Lower threshold** for more results when stuck
- **Local assets path** enables complete code analysis
- **Multiple searches** help understand patterns

Happy F&O development! 🎯