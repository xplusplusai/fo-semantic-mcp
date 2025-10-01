# FO Semantic MCP Server Installation Script for Windows
# Run as: powershell -ExecutionPolicy Bypass -File install-windows.ps1

param(
    [string]$InstallPath = "$env:LOCALAPPDATA\fo-semantic-mcp",
    [string]$ApiKey = ""
)

Write-Host "🚀 Installing FO Semantic MCP Server..." -ForegroundColor Green

# Create installation directory
Write-Host "📁 Creating installation directory: $InstallPath"
New-Item -ItemType Directory -Force -Path $InstallPath | Out-Null

# Copy binary
Write-Host "📦 Installing fo-semantic-mcp binary..."
$binarySource = Join-Path $PSScriptRoot "..\bin\fo-semantic-mcp-win.exe"
$binaryTarget = Join-Path $InstallPath "fo-semantic-mcp.exe"

if (Test-Path $binarySource) {
    Copy-Item $binarySource $binaryTarget -Force
    Write-Host "✅ Binary installed successfully!"
} else {
    Write-Error "❌ Binary not found: $binarySource"
    exit 1
}

# Add to PATH
Write-Host "🔧 Adding to PATH..."
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($currentPath -notlike "*$InstallPath*") {
    [Environment]::SetEnvironmentVariable("PATH", "$currentPath;$InstallPath", "User")
    Write-Host "✅ Added to user PATH"
} else {
    Write-Host "ℹ️  Already in PATH"
}

# Create example configuration
Write-Host "📝 Creating example MCP configuration..."
$configPath = "$env:USERPROFILE\.cursor"
New-Item -ItemType Directory -Force -Path $configPath | Out-Null

$exampleConfig = @{
    "mcpServers" = @{
        "fo-semantic-mcp" = @{
            "command" = "fo-semantic-mcp.exe"
            "env" = @{
                "FOINDEX_API_KEY" = if ($ApiKey) { $ApiKey } else { "your_api_key_here" }
                "FO_SEARCH_DEFAULT_THRESHOLD" = "0.75"
            }
        }
    }
} | ConvertTo-Json -Depth 4

$configFile = Join-Path $configPath "mcp-example.json"
$exampleConfig | Out-File -FilePath $configFile -Encoding UTF8
Write-Host "✅ Example configuration created: $configFile"

Write-Host "`n🎉 Installation complete!" -ForegroundColor Green
Write-Host "📖 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Get your API key from https://www.xplusplus.ai/"
Write-Host "   2. Update the configuration file: $configFile"
Write-Host "   3. Restart your MCP client (Cursor, Claude Desktop, etc.)"
Write-Host "   4. Start using fo-semantic-mcp for F&O development!"

if (-not $ApiKey) {
    Write-Host "`n⚠️  Remember to replace 'your_api_key_here' with your actual API key!" -ForegroundColor Red
}