# FO Semantic MCP v1.2.0 Release Script
param([switch]$DryRun = $false)

Write-Host "🚀 Creating FO Semantic MCP v1.2.0 Release" -ForegroundColor Cyan

# Verify we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found" -ForegroundColor Red
    exit 1
}

# Check version
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if ($packageJson.version -ne "1.2.0") {
    Write-Host "❌ Error: Version mismatch. Expected 1.2.0, got $($packageJson.version)" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Version verified: 1.2.0" -ForegroundColor Green

if ($DryRun) {
    Write-Host "🔍 DRY RUN MODE - No changes will be made" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Would perform these actions:" -ForegroundColor Cyan
    Write-Host "1. Commit current changes" -ForegroundColor White
    Write-Host "2. Create v1.2.0 tag" -ForegroundColor White
    Write-Host "3. Push to GitHub" -ForegroundColor White
    Write-Host "4. Create GitHub release" -ForegroundColor White
    Write-Host ""
    Write-Host "To execute: .\create-v1.2.0-release.ps1" -ForegroundColor Yellow
    exit 0
}

# Commit changes
Write-Host "📝 Committing changes..." -ForegroundColor Blue
git add .
$commitMsg = "Release v1.2.0: Exact Artifact Matching with foName Filter"
git commit -m $commitMsg

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Commit failed" -ForegroundColor Red
    exit 1
}

# Create tag
Write-Host "🏷️  Creating tag..." -ForegroundColor Blue
$tagMsg = "v1.2.0: Exact Artifact Matching with foName Filter - New foName filter for exact artifact matching"
git tag -a v1.2.0 -m $tagMsg

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Tag creation failed" -ForegroundColor Red
    exit 1
}

# Push changes
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Blue
git push origin main
git push origin v1.2.0

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Changes pushed successfully" -ForegroundColor Green

# Check for GitHub CLI
$ghCmd = Get-Command gh -ErrorAction SilentlyContinue

if ($ghCmd) {
    Write-Host "📋 Creating GitHub release..." -ForegroundColor Blue

    gh release create v1.2.0 --title "v1.2.0: Exact Artifact Matching with foName Filter" --notes-file "release-notes-v1.2.0.txt" --target main --latest

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ GitHub release created!" -ForegroundColor Green

        # Upload key assets
        Write-Host "📦 Uploading assets..." -ForegroundColor Blue
        gh release upload v1.2.0 package.json package-lock.json README.md CHANGELOG.md LICENSE CONTRIBUTING.md

        Write-Host "✅ Release complete!" -ForegroundColor Green
    } else {
        Write-Host "❌ Release creation failed" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  GitHub CLI not found" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Manual Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/xplusplusai/fo-semantic-mcp/releases/new" -ForegroundColor White
    Write-Host "2. Tag: v1.2.0" -ForegroundColor White
    Write-Host "3. Title: v1.2.0: Exact Artifact Matching with foName Filter" -ForegroundColor White
    Write-Host "4. Target: main" -ForegroundColor White
    Write-Host "5. Copy notes from: release-notes-v1.2.0.txt" -ForegroundColor White
    Write-Host "6. Upload dist/, docs/, examples/, and main files as assets" -ForegroundColor White
    Write-Host "7. Set as latest release and publish" -ForegroundColor White
}

Write-Host ""
Write-Host "🎉 Process complete!" -ForegroundColor Green
Write-Host "📦 Version: v1.2.0" -ForegroundColor Cyan
Write-Host "🔗 Repo: https://github.com/xplusplusai/fo-semantic-mcp" -ForegroundColor Cyan