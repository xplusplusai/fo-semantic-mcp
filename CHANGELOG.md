# Changelog

All notable changes to FO Semantic MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-06

🚀 **Initial Public Release**

### Features
- ✅ **Semantic Search**: Natural language search over 50,000+ F&O artifacts
- ✅ **Node.js Distribution**: Cross-platform compatibility with standard Node.js approach
- ✅ **MCP Protocol**: Full Model Context Protocol implementation
- ✅ **AI Summaries**: Intelligent artifact summaries for quick understanding
- ✅ **Local File Access**: Read actual F&O XML files from PackagesLocalDirectory
- ✅ **Adaptive Thresholds**: Automatic retry with lower relevance scores
- ✅ **Multi-Platform**: Works on Windows, macOS, Linux

### Supported Integrations
- ✅ **Cursor IDE**: Seamless integration via MCP configuration
- ✅ **Claude Desktop**: Direct AI assistant integration
- ✅ **VS Code**: Compatible with MCP extensions

### What's Included
- 📦 **Pre-compiled Distribution**: Ready-to-use `dist/` folder
- 🔧 **Production Dependencies**: Optimized `node_modules/` included
- 📋 **Configuration Examples**: Ready-to-use examples for all platforms
- 📚 **Complete Documentation**: Installation, configuration, and usage guides

### Quick Start
1. **Prerequisites**: Node.js 18+ from https://nodejs.org/
2. **Download**: Extract this release to any folder
3. **Configure**: Update MCP client with `node dist/server.js` command
4. **API Key**: Set `FOINDEX_API_KEY` environment variable
5. **Start**: Begin semantic searching F&O artifacts!

### Configuration
All MCP clients use the same Node.js approach:
```json
{
  "command": "node",
  "args": ["/path/to/fo-semantic-mcp/dist/server.js"],
  "env": {
    "FOINDEX_API_KEY": "your_api_key_here"
  }
}
```

---

**Get your API key**: https://www.xplusplus.ai/
**Documentation**: Complete setup guides included
**Support**: contact@xplusplus.ai