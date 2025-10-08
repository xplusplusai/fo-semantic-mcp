# Changelog

All notable changes to FO Semantic MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-10-08

**AI Workflow Enhancement - The Golden Path**

### Added
- 🎯 **Golden Path Workflow**: AI now follows proven 6-step development methodology for every F&O task
- 🔧 **Custom Code Discovery Instructions**: Enhanced MCP instructions emphasize searching user's workspace for existing extensions
- 📊 **Context-Aware Generation Guidance**: AI combines standard D365 patterns with user's existing customizations
- 💡 **Structured Presentation Templates**: AI presents findings with clear distinction between standard and custom code
- ⚠️ **Conflict Prevention Protocol**: Critical workflow ensures AI checks existing extensions before generating code

### Enhanced
- **MCP Server Instructions**: Complete rewrite with 857-line AI-optimized instruction document
- **Visual Formatting**: Added emoji-based visual hierarchy for AI agent parsing (🎯, ⭐, ✅, ❌, 🔧, 📦, 💡)
- **Workflow Documentation**: ASCII diagrams showing complete 6-step development workflow
- **Integration Patterns**: Detailed guidance on combining search_fo_artifacts with workspace file tools
- **Common Mistake Prevention**: Explicit warnings about skipping user code search (Steps 3 & 4)

### Changed
- **Instruction Loading**: Instructions now loaded from external markdown file (`docs/MCP_instruction_doc/MCP_Tool_SearchFOArtifacts_Instructions.md`)
- **Dynamic Configuration**: Local assets path dynamically injected into instructions at runtime
- **Fallback Mechanism**: Graceful degradation if instruction file cannot be read

### Why This Matters
**Problem Solved**: AI was generating code that conflicted with users' existing F&O extensions because it only searched standard D365 artifacts without checking user's custom code.

**Solution**: The Golden Path workflow ensures AI ALWAYS:
1. Searches standard D365 (this tool)
2. Reads standard implementation
3. **Searches user's workspace for existing extensions** (critical step)
4. **Reads user's customizations** (critical step)
5. Generates code that extends user's existing implementation
6. Presents with full context showing both standard and custom code

**Result**: Code that integrates seamlessly with existing customizations on first try.

### Technical Changes
- New file: `docs/MCP_instruction_doc/MCP_Tool_SearchFOArtifacts_Instructions.md` (29,171 bytes)
- Updated: `buildInstructions()` function to read from external file
- Enhanced: Placeholder replacement for dynamic configuration
- Improved: Error handling with fallback instructions

---

## [1.2.1] - 2025-10-02

**Critical Threshold Fix**

### Fixed
- **Default Threshold**: Lowered from 0.75 to 0.5 for better result balance
- **foName Filter Issues**: Fixed exact matches being filtered out by high thresholds
- **Configuration Examples**: Updated all examples to use proven 0.5 threshold
- **AI Instructions**: Enhanced guidance for threshold usage with foName filter

### Enhanced
- **Adaptive Strategy**: Updated to 0.5 → 0.4 → 0.3 → no threshold progression
- **Debug Logging**: Added request/response logging for troubleshooting
- **Documentation**: Comprehensive foName filter usage examples

### Why This Fix Matters
The original 0.75 threshold was too restrictive and filtered out exact artifact matches even when using the foName filter. This patch ensures reliable exact matching while maintaining semantic search quality.

---

## [1.2.0] - 2025-10-01

**New Feature: Exact Artifact Matching**

### Added
- **foName Filter**: New exact match filter for finding specific F&O artifacts by name
- **MCP Tool Enhancement**: Added `filters.foName` parameter to `search_fo_artifacts` tool
- **AI Assistant Integration**: Updated MCP server instructions with foName filter examples
- **API Documentation**: Added foName filter usage examples and documentation

### Enhanced
- **Search Precision**: When you know the exact F&O artifact name (e.g., "CustTable", "SalesTable"), use foName filter for precise results
- **MCP Server Instructions**: Added examples showing how AI assistants should use foName for exact matches
- **Tool Schema**: Updated MCP tool input schema to include filters.foName parameter

### Use Cases
- **Exact Artifact Lookup**: `search_fo_artifacts({ query: "currency table", filters: { foName: "Currency" } })`
- **AI Assistant Guidance**: When AI knows specific artifact names, use foName for guaranteed exact matches
- **Development Workflow**: Faster artifact discovery when exact names are known from requirements

### Technical Changes
- Updated `SearchFOArtifactsInput` interface to include filters.foName
- Enhanced `SearchApiClient` to pass foName filter to backend API
- Added foName parameter to MCP tool schema with proper Zod validation
- Comprehensive documentation updates across API docs and MCP server instructions

---

## [1.1.2] - 2025-10-01

**Critical Bug Fix**

### Fixed
- **MCP Protocol Compliance**: Restored `structuredContent` field to maintain MCP protocol compliance
- **Tool Output Schema**: Fixed "MCP error -32602: Tool has an output schema but no structured content was provided"
- **Dual Format Support**: Now provides both embedded JSON in text content AND structured content for maximum compatibility

### Technical Details
- Maintains backward compatibility with both older and newer Cursor IDE versions
- Structured content available for older clients with structured content display and MCP protocol compliance
- Embedded JSON in text content for newer clients with structured content display issues
- Fixed fullLocalPath usage instructions

### ⚠️ Compatibility Note
**Dual-Format Response**: This version temporarily returns search results in **two formats simultaneously** (structured content + embedded JSON in text) to ensure compatibility across all Cursor IDE versions. This approach resolves both MCP protocol compliance and display issues across different client versions.

---

## [1.1.1] - 2025-10-01

🐛 **MCP Client Compatibility Fix**

### Fixed
- ✅ **Cursor IDE 2025 Compatibility**: Fixed structured content display issues in newer Cursor versions
- ✅ **Response Format**: Now returns single text response with embedded JSON instead of separate structuredContent
- ✅ **File Path Instructions**: Corrected guidance to use `fullLocalPath` directly instead of concatenating paths
- ✅ **AI Client Parsing**: Structured data now included as parseable JSON text for better AI assistant integration

### Changed
- 🔄 **MCP Response Format**: Simplified from dual-part response to single text response with embedded JSON
- 📝 **Instructions**: Updated file access instructions to reflect correct fullLocalPath usage

---

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
- `FO_SEARCH_DEFAULT_THRESHOLD` - Default relevance filter (0.5)
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