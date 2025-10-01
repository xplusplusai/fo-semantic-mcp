#!/bin/bash
# FO Semantic MCP Server Installation Script for Linux
# Run as: bash install-linux.sh

INSTALL_DIR="$HOME/.local/bin"
API_KEY=""

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --install-dir)
            INSTALL_DIR="$2"
            shift 2
            ;;
        --api-key)
            API_KEY="$2"
            shift 2
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

echo "🚀 Installing FO Semantic MCP Server for Linux..."

# Create installation directory
echo "📁 Creating installation directory: $INSTALL_DIR"
mkdir -p "$INSTALL_DIR"

# Copy binary
echo "📦 Installing fo-semantic-mcp binary..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BINARY_SOURCE="$SCRIPT_DIR/../bin/fo-semantic-mcp-linux"
BINARY_TARGET="$INSTALL_DIR/fo-semantic-mcp"

if [[ -f "$BINARY_SOURCE" ]]; then
    cp "$BINARY_SOURCE" "$BINARY_TARGET"
    chmod +x "$BINARY_TARGET"
    echo "✅ Binary installed successfully!"
else
    echo "❌ Binary not found: $BINARY_SOURCE"
    exit 1
fi

# Add to PATH
echo "🔧 Adding to PATH..."
SHELL_RC=""
if [[ "$SHELL" == *"zsh"* ]]; then
    SHELL_RC="$HOME/.zshrc"
elif [[ "$SHELL" == *"bash"* ]]; then
    SHELL_RC="$HOME/.bashrc"
fi

if [[ -n "$SHELL_RC" ]]; then
    if ! grep -q "$INSTALL_DIR" "$SHELL_RC" 2>/dev/null; then
        echo "export PATH=\"$INSTALL_DIR:\$PATH\"" >> "$SHELL_RC"
        echo "✅ Added to PATH in $SHELL_RC"
    else
        echo "ℹ️  Already in PATH"
    fi
fi

# Create example configuration
echo "📝 Creating example configuration..."
CONFIG_DIR="$HOME/.config/fo-semantic-mcp"
mkdir -p "$CONFIG_DIR"

cat > "$CONFIG_DIR/example-config.json" << EOF
{
  "mcpServers": {
    "fo-semantic-mcp": {
      "command": "fo-semantic-mcp",
      "env": {
        "FOINDEX_API_KEY": "${API_KEY:-your_api_key_here}",
        "FO_SEARCH_DEFAULT_THRESHOLD": "0.75"
      }
    }
  }
}
EOF

echo "✅ Example configuration created: $CONFIG_DIR/example-config.json"

echo ""
echo "🎉 Installation complete!"
echo "📖 Next steps:"
echo "   1. Get your API key from https://www.xplusplus.ai/"
echo "   2. Update the configuration file with your API key"
echo "   3. Restart your terminal to refresh PATH"
echo "   4. Configure your MCP client with the settings"
echo "   5. Start using fo-semantic-mcp for F&O development!"

if [[ -z "$API_KEY" ]]; then
    echo ""
    echo "⚠️  Remember to replace 'your_api_key_here' with your actual API key!"
fi