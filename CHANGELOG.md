# Changelog

All notable changes to FO Semantic MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-06

### Changed
- 🔄 **Distribution Method**: Switched from binary executables to Node.js approach
- ✅ **Better MCP Compatibility**: Resolves MCP SDK issues with binary packaging
- ✅ **Simplified Installation**: Node.js + launcher script for all platforms
- ✅ **Reduced Package Size**: No more large binary files
- ✅ **Better Debugging**: JavaScript stack traces and standard Node.js tooling

### Added
- 📁 **Windows Launcher**: `fo-semantic-mcp-win.cmd` for easy Windows usage
- 📦 **Pre-installed Dependencies**: `node_modules` included in release
- 🔧 **Multiple Config Options**: Direct node command or launcher script
- 📚 **Updated Documentation**: Node.js installation instructions

### Removed
- ❌ **Binary Executables**: No longer providing .exe/.app binaries
- ❌ **Binary-specific Scripts**: Removed pkg and nexe build commands

### Migration Guide
**From v1.0.0 (Binary) to v1.1.0 (Node.js):**

1. **Install Node.js** (18+) from https://nodejs.org/
2. **Update MCP config** to use `node` command:
   ```json
   {
     "command": "node",
     "args": ["C:\\Downloads\\fo-semantic-mcp\\dist\\server.js"]
   }
   ```
3. **Alternative**: Use launcher script:
   ```json
   {
     "command": "C:\\Downloads\\fo-semantic-mcp\\fo-semantic-mcp-win.cmd"
   }
   ```

### Why This Change?
- **MCP SDK Compatibility**: Binary packaging had module resolution issues
- **Industry Standard**: Most MCP servers use Node.js approach
- **Better Error Handling**: Clearer debugging and error messages
- **Smaller Downloads**: No large binary files required

## [1.0.0] - 2024-09-29

### Added
- 🚀 **Initial public release**
- ✅ **Semantic search** over 50,000+ F&O artifacts
- ✅ **Multi-platform binaries** (Windows, macOS, Linux)
- ✅ **MCP protocol support** for Cursor IDE, Claude Desktop
- ✅ **Adaptive threshold strategy** - Auto-retry with lower relevance scores
- ✅ **Local file access** - Read actual F&O XML files
- ✅ **AI summaries** for artifact understanding
- ✅ **Filter support** - By artifact type, relevance score
- ✅ **Cross-platform installers** with automated setup
- ✅ **Comprehensive documentation** and examples

### Features
- **Search Tool**: `search_fo_artifacts` with natural language queries
- **Artifact Types**: Table, Form, Class, EDT, Enum, DataEntity, View, Query
- **Relevance Filtering**: 0-1 threshold with adaptive retry strategy
- **Result Limits**: Configurable 1-50 results per search
- **Local Integration**: PackagesLocalDirectory access for XML files
- **API Key Authentication**: Secure access via FO-Index API

### Configuration Options
- `FOINDEX_API_KEY` - API key authentication
- `FO_SEARCH_DEFAULT_THRESHOLD` - Default relevance filter (0.75)
- `FO_LOCAL_ASSETS_PATH` - Path to F&O installation
- `FO_SEARCH_TIMEOUT_MS` - Request timeout (10s)
- `FO_SEARCH_DEFAULT_LIMIT` - Default result limit (10)

### Supported Platforms
- **Windows**: x64 executable
- **macOS**: x64 binary
- **Linux**: x64 binary

### MCP Clients Tested
- ✅ Cursor IDE
- ✅ Claude Desktop
- ✅ VS Code (with MCP extension)

---

**Get your API key**: https://www.xplusplus.ai/
**Documentation**: https://fo-semantic-mcp.xplusplus.ai/