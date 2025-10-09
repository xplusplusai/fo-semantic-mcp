# Changelog

All notable changes to FO Semantic MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.4] - 2025-10-09

**Minimalist Obfuscation - Surgical IP Protection**

### Changed
- **Obfuscation Strategy**: Only `embeddedInstructions.js` obfuscated (29KB → 115KB)
- **Zero Bundling**: All files remain at original locations
- **MCP Protocol**: Completely untouched - guaranteed compatibility
- **File Structure**: Standard dist/ with only instructions file protected

### Fixed
- **Tool Registration**: Works correctly (no bundling = no protocol issues)
- **MCP Compliance**: 100% protocol standard compliance
- **Client Compatibility**: All MCP clients work perfectly

### Technical Details
- Surgical approach: Protect only proprietary IP (instruction content)
- All other code readable/debuggable (server.js, tools/, services/)
- No bundling, no SDK modification, no protocol interference
- Result: 115KB obfuscated instructions + clean MCP implementation

### Why This Works
**Previous Problem**: Bundling/obfuscating everything broke MCP JSON-RPC protocol

**Minimalist Solution**:
- ✅ Obfuscate ONLY what matters (your proprietary instruction content)
- ✅ Leave MCP protocol implementation completely clean
- ✅ Zero bundling = zero protocol issues

**Result**: MCP clients work perfectly + instruction IP fully protected

---

## [1.3.3] - 2025-10-09

**Critical Fix - MCP Tool Registration**

### Fixed
- **Tool Registration Failure**: MCP SDK was bundled and obfuscated, breaking protocol compliance
- **External MCP SDK**: MCP SDK now excluded from bundling (loaded at runtime)
- **Bundle Size**: Reduced from 5.3MB to 2.3MB by externalizing SDK
- **Client Detection**: MCP clients now properly detect and list available tools

### Technical Changes
- Added `--external:@modelcontextprotocol/sdk` to esbuild configuration
- MCP SDK loads from node_modules at runtime (not bundled)
- Reserved names for tool response format (content, structuredContent, isError)
- Maintained full obfuscation for proprietary instruction content only

### Why This Matters
**Problem**: v1.3.2 bundled and obfuscated the entire MCP SDK, breaking JSON-RPC protocol compliance and tool registration.

**Solution**: Industry best practice - externalize protocol libraries, obfuscate proprietary code only. MCP SDK loads at runtime while instruction content remains fully protected.

**Result**: MCP protocol compliance maintained + proprietary content protected = tools work correctly with IP protection.

---

## [1.3.2] - 2025-10-08

**Code Obfuscation - Enhanced Security**

### Changed
- **Code Obfuscation**: JavaScript code now heavily obfuscated to protect proprietary instruction content
- **Build Process**: New `build:obfuscated` script using javascript-obfuscator with aggressive settings
- **Distribution Security**: Instruction content no longer readable as plain text in released code
- **Bundle Optimization**: Single-file ESM bundle (388KB) obfuscated to 5.2MB with maximum protection

### Security Enhancements
- Control flow flattening (threshold 0.75)
- Dead code injection (threshold 0.4)
- Base64 string array encoding
- Hexadecimal identifier names
- Self-defending code
- String splitting and rotation
- Object key transformation
- Function wrapper chains

### Technical Changes
- New build script: `scripts/build-obfuscated.js`
- Updated package.json with `build:obfuscated` and `build:release` scripts
- Output: `dist-obfuscated/server.js` (fully obfuscated, production-ready)
- Maintains full functionality while protecting intellectual property

### Why This Matters
**Problem Solved**: MCP instruction content was visible as plain text JavaScript on GitHub, exposing proprietary AI guidance and development methodologies.

**Solution**: Multi-stage build process that embeds instructions at build time, then heavily obfuscates the entire codebase. Result is fully functional but completely unreadable code.

**Security Level**: Instruction content now protected by enterprise-grade JavaScript obfuscation, making reverse engineering extremely difficult while maintaining runtime performance.

---

## [1.3.1] - 2025-10-08

**Embedded Instructions - Security Enhancement**

### Changed
- **Embedded Instructions**: MCP instructions now compiled directly into JavaScript at build time
- **Security**: Proprietary instruction content no longer exposed as plain text markdown files
- **Self-Contained**: No external file dependencies - instructions embedded in compiled code
- **Distribution**: Cleaner release package with only essential runtime files

### Technical Changes
- Instructions embedded at build time via `embeddedInstructions.js` (30KB compiled)
- Removed external markdown file dependency from release distribution
- Instructions compiled into JavaScript bundle, not readable as plain text
- Maintains full AI guidance capability with enhanced security

### Fixed
- Release package no longer includes development/documentation files
- Removed redundant examples folder (configs available in README)
- Removed MCP instruction markdown from public distribution

---

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
- **Instruction Loading**: Instructions now loaded from external markdown file (\`docs/MCP_instruction_doc/MCP_Tool_SearchFOArtifacts_Instructions.md\`)
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
- New file: \`docs/MCP_instruction_doc/MCP_Tool_SearchFOArtifacts_Instructions.md\` (29,171 bytes)
- Updated: \`buildInstructions()\` function to read from external file
- Enhanced: Placeholder replacement for dynamic configuration
- Improved: Error handling with fallback instructions

---
