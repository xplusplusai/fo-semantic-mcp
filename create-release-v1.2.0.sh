#!/bin/bash

# FO Semantic MCP v1.2.0 Release Script
# This script commits changes, creates tags, and creates a GitHub release

set -e

echo "🚀 Creating FO Semantic MCP v1.2.0 Release"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the fo-semantic-mcp-release directory."
    exit 1
fi

# Check if version in package.json is 1.2.0
VERSION=$(node -p "require('./package.json').version")
if [ "$VERSION" != "1.2.0" ]; then
    echo "❌ Error: package.json version is $VERSION, expected 1.2.0"
    exit 1
fi

echo "✅ Version check passed: $VERSION"

# Commit the current changes
echo "📝 Committing v1.2.0 changes..."
git add .
git commit -m "Release v1.2.0: Exact Artifact Matching with foName Filter

- Add foName filter for exact artifact matching
- Enhanced MCP tool schema with filters.foName parameter
- Updated API documentation and examples
- Improved AI assistant integration with foName examples
- Perfect for precise F&O artifact discovery when exact names are known"

echo "✅ Changes committed"

# Create and push the tag
echo "🏷️  Creating v1.2.0 tag..."
git tag -a v1.2.0 -m "v1.2.0: Exact Artifact Matching with foName Filter

New Feature: Precise F&O Artifact Discovery

This release introduces the foName filter for exact artifact matching - perfect for when you know the specific F&O artifact name and want guaranteed precise results.

Key Features:
- foName Filter: Find specific artifacts by exact name (e.g., \"CustTable\", \"SalesTable\")
- Skip Semantic Search: When you know the exact name, get instant results
- AI Assistant Integration: Enhanced MCP server with foName examples
- Production Ready: Real integrations with comprehensive documentation

Perfect for Development Teams, AI Assistants, and Requirements Implementation."

echo "✅ Tag created"

# Push the commit and tag
echo "📤 Pushing to GitHub..."
git push origin main
git push origin v1.2.0

echo "✅ Pushed to GitHub"

# Create the GitHub Release
echo "🎉 Creating GitHub Release..."

# Release notes content
RELEASE_NOTES="# v1.2.0: Exact Artifact Matching with foName Filter

**New Feature: Precise F&O Artifact Discovery**

This release introduces the \`foName\` filter for exact artifact matching - perfect for when you know the specific F&O artifact name and want guaranteed precise results.

## 🆕 What's New

### foName Filter
- **Exact Match**: Find specific artifacts by exact name (e.g., \"CustTable\", \"SalesTable\")
- **Skip Semantic Search**: When you know the exact name, get instant results
- **AI Assistant Integration**: Enhanced MCP server with foName examples

### Usage Examples
\`\`\`javascript
// Find specific Currency table
search_fo_artifacts({
  query: \"currency table\",
  filters: { foName: \"Currency\" }
})

// Locate exact customer table
search_fo_artifacts({
  query: \"customer data\",
  filters: { foName: \"CustTable\" }
})
\`\`\`

### Technical Enhancements
- Updated MCP tool schema with filters.foName parameter
- Enhanced SearchApiClient to pass foName filter to backend
- Comprehensive documentation updates
- Added foName examples to MCP server instructions

## 🎯 Perfect For
- **Development Teams**: Faster artifact lookup with known names
- **AI Assistants**: Precise artifact matching in automated workflows
- **Requirements Implementation**: Direct artifact access from specifications

## 📥 Installation

Download the release, extract, and update your MCP configuration:

\`\`\`json
{
  \"mcpServers\": {
    \"fo-semantic-mcp\": {
      \"command\": \"node\",
      \"args\": [\"path/to/fo-semantic-mcp/dist/server.js\"],
      \"env\": {
        \"FOINDEX_API_KEY\": \"your_api_key_here\"
      }
    }
  }
}
\`\`\`

## 🔗 Resources
- **Get API Key**: https://www.xplusplus.ai/
- **Documentation**: Included in release package
- **GitHub**: https://github.com/xplusplusai/fo-semantic-mcp

**Ready to accelerate your F&O development with precise artifact matching!** 🚀"

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "📋 Using GitHub CLI to create release..."

    # Create release with assets using GitHub CLI
    gh release create v1.2.0 \
        --title "v1.2.0: Exact Artifact Matching with foName Filter" \
        --notes "$RELEASE_NOTES" \
        --target main \
        --latest \
        dist/* \
        package.json \
        package-lock.json \
        README.md \
        CHANGELOG.md \
        LICENSE \
        CONTRIBUTING.md

    echo "✅ GitHub release created successfully with GitHub CLI!"

else
    echo "⚠️  GitHub CLI not found. You'll need to create the release manually."
    echo ""
    echo "📋 Manual Release Instructions:"
    echo "1. Go to: https://github.com/xplusplusai/fo-semantic-mcp/releases/new"
    echo "2. Tag: v1.2.0"
    echo "3. Title: v1.2.0: Exact Artifact Matching with foName Filter"
    echo "4. Target: main"
    echo "5. Copy the release notes below:"
    echo ""
    echo "=== RELEASE NOTES ==="
    echo "$RELEASE_NOTES"
    echo "=== END RELEASE NOTES ==="
    echo ""
    echo "6. Upload these files as release assets:"
    echo "   - dist/ (entire folder)"
    echo "   - package.json"
    echo "   - package-lock.json"
    echo "   - README.md"
    echo "   - CHANGELOG.md"
    echo "   - LICENSE"
    echo "   - CONTRIBUTING.md"
    echo "   - docs/ (entire folder)"
    echo "   - examples/ (entire folder)"
    echo ""
    echo "7. Check 'Set as the latest release'"
    echo "8. Click 'Publish release'"
fi

echo ""
echo "🎉 Release process completed!"
echo "📦 Version: v1.2.0"
echo "🔗 Repository: https://github.com/xplusplusai/fo-semantic-mcp"
echo "📋 Releases: https://github.com/xplusplusai/fo-semantic-mcp/releases"