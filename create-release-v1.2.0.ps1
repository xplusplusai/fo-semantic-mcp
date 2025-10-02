# FO Semantic MCP v1.2.0 Release Script (PowerShell)
# This script commits changes, creates tags, and creates a GitHub release

param(
    [switch]$DryRun = $false
)

Write-Host "🚀 Creating FO Semantic MCP v1.2.0 Release" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the fo-semantic-mcp-release directory." -ForegroundColor Red
    exit 1
}

# Check if version in package.json is 1.2.0
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$version = $packageJson.version
if ($version -ne "1.2.0") {
    Write-Host "❌ Error: package.json version is $version, expected 1.2.0" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Version check passed: $version" -ForegroundColor Green

if ($DryRun) {
    Write-Host "🔍 DRY RUN MODE - No actual changes will be made" -ForegroundColor Yellow
}

# Commit the current changes
Write-Host "📝 Committing v1.2.0 changes..." -ForegroundColor Blue

$commitMessage = @"
Release v1.2.0: Exact Artifact Matching with foName Filter

- Add foName filter for exact artifact matching
- Enhanced MCP tool schema with filters.foName parameter
- Updated API documentation and examples
- Improved AI assistant integration with foName examples
- Perfect for precise F&O artifact discovery when exact names are known
"@

if (-not $DryRun) {
    git add .
    git commit -m $commitMessage
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error: Failed to commit changes" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Changes committed" -ForegroundColor Green

# Create and push the tag
Write-Host "🏷️  Creating v1.2.0 tag..." -ForegroundColor Blue

$tagMessage = @"
v1.2.0: Exact Artifact Matching with foName Filter

New Feature: Precise F&O Artifact Discovery

This release introduces the foName filter for exact artifact matching - perfect for when you know the specific F&O artifact name and want guaranteed precise results.

Key Features:
- foName Filter: Find specific artifacts by exact name (e.g., "CustTable", "SalesTable")
- Skip Semantic Search: When you know the exact name, get instant results
- AI Assistant Integration: Enhanced MCP server with foName examples
- Production Ready: Real integrations with comprehensive documentation

Perfect for Development Teams, AI Assistants, and Requirements Implementation.
"@

if (-not $DryRun) {
    git tag -a v1.2.0 -m $tagMessage
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error: Failed to create tag" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Tag created" -ForegroundColor Green

# Push the commit and tag
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Blue

if (-not $DryRun) {
    git push origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error: Failed to push commit" -ForegroundColor Red
        exit 1
    }

    git push origin v1.2.0
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error: Failed to push tag" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Pushed to GitHub" -ForegroundColor Green

# Create the GitHub Release
Write-Host "🎉 Creating GitHub Release..." -ForegroundColor Blue

# Release notes content - stored in a file to avoid PowerShell parsing issues
$releaseNotesPath = "release-notes-v1.2.0.txt"
$releaseNotes = @'
# v1.2.0: Exact Artifact Matching with foName Filter

**New Feature: Precise F&O Artifact Discovery**

This release introduces the `foName` filter for exact artifact matching - perfect for when you know the specific F&O artifact name and want guaranteed precise results.

## 🆕 What's New

### foName Filter
- **Exact Match**: Find specific artifacts by exact name (e.g., "CustTable", "SalesTable")
- **Skip Semantic Search**: When you know the exact name, get instant results
- **AI Assistant Integration**: Enhanced MCP server with foName examples

### Usage Examples
```javascript
// Find specific Currency table
search_fo_artifacts({
  query: "currency table",
  filters: { foName: "Currency" }
})

// Locate exact customer table
search_fo_artifacts({
  query: "customer data",
  filters: { foName: "CustTable" }
})
```

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

```json
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "node",
      "args": ["path/to/fo-semantic-mcp/dist/server.js"],
      "env": {
        "FOINDEX_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## 🔗 Resources
- **Get API Key**: https://www.xplusplus.ai/
- **Documentation**: Included in release package
- **GitHub**: https://github.com/xplusplusai/fo-semantic-mcp

**Ready to accelerate your F&O development with precise artifact matching!** 🚀
'@

# Save release notes to file
$releaseNotes | Out-File -FilePath $releaseNotesPath -Encoding UTF8 -Force

# Check if GitHub CLI is available
$ghAvailable = Get-Command gh -ErrorAction SilentlyContinue

if ($ghAvailable -and -not $DryRun) {
    Write-Host "📋 Using GitHub CLI to create release..." -ForegroundColor Blue

    # Create release with assets using GitHub CLI
    try {
        gh release create v1.2.0 --title "v1.2.0: Exact Artifact Matching with foName Filter" --notes-file $releaseNotesPath --target main --latest --generate-notes=false dist/* package.json package-lock.json README.md CHANGELOG.md LICENSE CONTRIBUTING.md

        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ GitHub release created successfully with GitHub CLI!" -ForegroundColor Green
        } else {
            Write-Host "❌ Error: Failed to create GitHub release" -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "❌ Error creating release: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "⚠️  Falling back to manual instructions..." -ForegroundColor Yellow
    }

} else {
    Write-Host "⚠️  GitHub CLI not found or dry run mode. You'll need to create the release manually." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Manual Release Instructions:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/xplusplusai/fo-semantic-mcp/releases/new"
    Write-Host "2. Tag: v1.2.0"
    Write-Host "3. Title: v1.2.0: Exact Artifact Matching with foName Filter"
    Write-Host "4. Target: main"
    Write-Host "5. Copy the release notes from: $releaseNotesPath" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "6. Upload these files as release assets:" -ForegroundColor Yellow
    Write-Host "   - dist/ (entire folder)" -ForegroundColor White
    Write-Host "   - package.json" -ForegroundColor White
    Write-Host "   - package-lock.json" -ForegroundColor White
    Write-Host "   - README.md" -ForegroundColor White
    Write-Host "   - CHANGELOG.md" -ForegroundColor White
    Write-Host "   - LICENSE" -ForegroundColor White
    Write-Host "   - CONTRIBUTING.md" -ForegroundColor White
    Write-Host "   - docs/ (entire folder)" -ForegroundColor White
    Write-Host "   - examples/ (entire folder)" -ForegroundColor White
    Write-Host ""
    Write-Host "7. Check 'Set as the latest release'" -ForegroundColor Yellow
    Write-Host "8. Click 'Publish release'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📄 Release notes saved to: $releaseNotesPath" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 Release process completed!" -ForegroundColor Green
Write-Host "📦 Version: v1.2.0" -ForegroundColor Cyan
Write-Host "🔗 Repository: https://github.com/xplusplusai/fo-semantic-mcp" -ForegroundColor Cyan
Write-Host "📋 Releases: https://github.com/xplusplusai/fo-semantic-mcp/releases" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host ""
    Write-Host "ℹ️  This was a dry run. To execute the release, run:" -ForegroundColor Blue
    Write-Host "   .\create-release-v1.2.0.ps1" -ForegroundColor White
}