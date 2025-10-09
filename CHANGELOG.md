# Changelog

All notable changes to FO Semantic MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
