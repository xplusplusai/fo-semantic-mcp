# FO Semantic MCP v1.2.0 Release Script (PowerShell)
# Simple version that avoids PowerShell parsing issues

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

$commitMessage = "Release v1.2.0: Exact Artifact Matching with foName Filter

- Add foName filter for exact artifact matching
- Enhanced MCP tool schema with filters.foName parameter
- Updated API documentation and examples
- Improved AI assistant integration with foName examples
- Perfect for precise F&O artifact discovery when exact names are known"

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

$tagMessage = "v1.2.0: Exact Artifact Matching with foName Filter

New Feature: Precise F&O Artifact Discovery with foName filter for exact artifact matching.
Perfect for when you know the specific F&O artifact name and want guaranteed precise results.

Key Features:
- foName Filter for exact artifact matching
- Enhanced MCP tool schema
- AI Assistant Integration improvements
- Production Ready with comprehensive documentation"

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
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Pushed commit to main" -ForegroundColor Green
    } else {
        Write-Host "❌ Error: Failed to push commit" -ForegroundColor Red
        exit 1
    }

    git push origin v1.2.0
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Pushed tag v1.2.0" -ForegroundColor Green
    } else {
        Write-Host "❌ Error: Failed to push tag" -ForegroundColor Red
        exit 1
    }
}

# Create the GitHub Release
Write-Host "🎉 Creating GitHub Release..." -ForegroundColor Blue

# Check if GitHub CLI is available
$ghAvailable = Get-Command gh -ErrorAction SilentlyContinue

if ($ghAvailable -and -not $DryRun) {
    Write-Host "📋 Using GitHub CLI to create release..." -ForegroundColor Blue

    try {
        $releaseNotesPath = "release-notes-v1.2.0.txt"

        # Create release using GitHub CLI
        gh release create v1.2.0 --title "v1.2.0: Exact Artifact Matching with foName Filter" --notes-file $releaseNotesPath --target main --latest

        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ GitHub release created successfully!" -ForegroundColor Green

            # Upload assets
            Write-Host "📦 Uploading release assets..." -ForegroundColor Blue
            gh release upload v1.2.0 package.json package-lock.json README.md CHANGELOG.md LICENSE CONTRIBUTING.md

            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Release assets uploaded successfully!" -ForegroundColor Green
            } else {
                Write-Host "⚠️  Release created but some assets failed to upload" -ForegroundColor Yellow
            }
        } else {
            Write-Host "❌ Error: Failed to create GitHub release" -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "❌ Error creating release: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "⚠️  Please create the release manually..." -ForegroundColor Yellow
        $ghAvailable = $false
    }
}

if (-not $ghAvailable) {
    Write-Host "⚠️  GitHub CLI not available. Please create the release manually:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Manual Release Instructions:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/xplusplusai/fo-semantic-mcp/releases/new" -ForegroundColor White
    Write-Host "2. Tag: v1.2.0" -ForegroundColor White
    Write-Host "3. Title: v1.2.0: Exact Artifact Matching with foName Filter" -ForegroundColor White
    Write-Host "4. Target: main" -ForegroundColor White
    Write-Host "5. Copy release notes from: release-notes-v1.2.0.txt" -ForegroundColor White
    Write-Host "6. Upload these files as release assets:" -ForegroundColor White
    Write-Host "   - dist/ (entire folder)" -ForegroundColor Gray
    Write-Host "   - package.json" -ForegroundColor Gray
    Write-Host "   - package-lock.json" -ForegroundColor Gray
    Write-Host "   - README.md" -ForegroundColor Gray
    Write-Host "   - CHANGELOG.md" -ForegroundColor Gray
    Write-Host "   - LICENSE" -ForegroundColor Gray
    Write-Host "   - CONTRIBUTING.md" -ForegroundColor Gray
    Write-Host "   - docs/ (entire folder)" -ForegroundColor Gray
    Write-Host "   - examples/ (entire folder)" -ForegroundColor Gray
    Write-Host "7. Check 'Set as the latest release'" -ForegroundColor White
    Write-Host "8. Click 'Publish release'" -ForegroundColor White
    Write-Host ""
    Write-Host "📄 Release notes are saved in: release-notes-v1.2.0.txt" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 Release process completed!" -ForegroundColor Green
Write-Host "📦 Version: v1.2.0" -ForegroundColor Cyan
Write-Host "🔗 Repository: https://github.com/xplusplusai/fo-semantic-mcp" -ForegroundColor Cyan
Write-Host "📋 Releases: https://github.com/xplusplusai/fo-semantic-mcp/releases" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host ""
    Write-Host "ℹ️  This was a dry run. To execute the release, run:" -ForegroundColor Blue
    Write-Host "   .\create-release-simple.ps1" -ForegroundColor White
}