# Publishing fo-semantic-mcp to MCP Registry

This guide explains how to publish this MCP server to the official Model Context Protocol registry.

> 💡 **Want to understand how the automation works?** See [CICD_PIPELINE_EXPLAINED.md](CICD_PIPELINE_EXPLAINED.md) for a complete walkthrough from code commit to registry update, including where the pipeline is hosted and how authentication works.

## ✅ What's Already Done

The automated publishing infrastructure is now set up:

1. **`package.json`** - Added `mcpName` field for package validation
2. **`server.json`** - Created and validated against MCP registry schema
3. **`.github/workflows/publish-mcp.yml`** - GitHub Actions workflow for automated publishing

## 📋 Prerequisites

Before you can publish, you need:

1. **npm Account** - Create one at https://www.npmjs.com/signup
2. **npm Package Published** - The package must be on npm first
3. **GitHub Repository** - Already set up at https://github.com/xplusplusai/fo-semantic-mcp

## 🚀 Publishing Steps

### Step 1: Publish to npm (First Time Only)

The package **must** be published to npm before the MCP registry can validate it.

```bash
# Login to npm
npm login

# Publish the package
cd fo-semantic-mcp-release
npm publish
```

**Important Notes:**
- You only need to do this once manually
- Future releases will be automated via GitHub Actions
- The MCP registry validates that your npm package contains the `mcpName` field

### Step 2: Add npm Token to GitHub Secrets

For automated publishing to work, you need to add your npm token to GitHub:

1. **Generate npm Token:**
   ```bash
   npm token create
   ```
   Choose "Publish" when prompted.

2. **Add to GitHub Secrets:**
   - Go to: https://github.com/xplusplusai/fo-semantic-mcp/settings/secrets/actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste the token from step 1
   - Click "Add secret"

### Step 3: Create a Version Tag

Once npm is set up, publish new versions by creating git tags:

```bash
cd fo-semantic-mcp-release

# Update version in package.json and server.json first
# Then commit and create a tag

git add .
git commit -m "Release v2.0.0"
git tag v2.0.0
git push origin main
git push origin v2.0.0
```

The GitHub Actions workflow will automatically:
1. ✅ Run tests (if present)
2. ✅ Build the package
3. ✅ Publish to npm
4. ✅ Authenticate with MCP registry via GitHub OIDC
5. ✅ Publish to MCP registry

### Step 4: Verify Publication

After the workflow completes, verify your server appears in the registry:

```bash
curl "https://registry.modelcontextprotocol.io/v0/servers?search=io.github.xplusplusai/fo-semantic-mcp"
```

You should see your server metadata in the JSON response.

## 🔄 Publishing Future Versions

For subsequent releases, the process is simple:

1. **Update version numbers:**
   - `package.json`: Update `"version": "2.0.1"`
   - `server.json`: Update `"version": "2.0.1"` AND `packages[0].version: "2.0.1"`

2. **Create and push tag:**
   ```bash
   git add package.json server.json
   git commit -m "Release v2.0.1"
   git tag v2.0.1
   git push origin main
   git push origin v2.0.1
   ```

3. **Done!** GitHub Actions handles the rest.

## 📝 Server Configuration Details

### server.json

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-10-17/server.schema.json",
  "name": "io.github.xplusplusai/fo-semantic-mcp",
  "title": "FO Semantic MCP",
  "description": "Semantic search over 50,000+ Dynamics 365 F&O artifacts: tables, forms, classes, and more.",
  "version": "2.0.0",
  "packages": [
    {
      "registryType": "npm",
      "identifier": "fo-semantic-mcp",
      "version": "2.0.0",
      "transport": {
        "type": "stdio"
      }
    }
  ]
}
```

**Key Fields:**
- **name**: `io.github.xplusplusai/fo-semantic-mcp` - Uses GitHub namespace for automatic OIDC auth
- **description**: Max 100 characters
- **packages**: References the npm package identifier

### package.json

```json
{
  "name": "fo-semantic-mcp",
  "mcpName": "io.github.xplusplusai/fo-semantic-mcp",
  ...
}
```

The `mcpName` field is **required** for MCP registry validation. It must match the `name` field in `server.json`.

## 🔧 Troubleshooting

**"Package validation failed"**
- Ensure the package is published to npm first
- Verify `mcpName` in package.json matches `name` in server.json
- Check that the npm package is publicly accessible

**"Authentication failed"**
- Verify the GitHub Actions workflow has `id-token: write` permission (already configured)
- Check that you're pushing to the correct repository

**"Namespace not authorized"**
- The `io.github.xplusplusai/*` namespace requires the repository to be owned by `xplusplusai`
- OIDC authentication is automatic for matching GitHub usernames

**npm publish fails**
- Verify you're logged in: `npm whoami`
- Check package name isn't already taken
- Ensure you have publish permissions

## 📚 Additional Resources

- [MCP Publishing Guide](https://github.com/modelcontextprotocol/registry/blob/main/docs/guides/publishing/publish-server.md)
- [GitHub Actions Guide](https://github.com/modelcontextprotocol/registry/blob/main/docs/guides/publishing/github-actions.md)
- [MCP Registry](https://registry.modelcontextprotocol.io)

## 🎯 Quick Reference Commands

```bash
# Publish to npm (first time)
npm login
npm publish

# Release new version
# 1. Update version in package.json and server.json
# 2. Then:
git add package.json server.json
git commit -m "Release v2.0.1"
git tag v2.0.1
git push origin main
git push origin v2.0.1

# Verify in registry
curl "https://registry.modelcontextprotocol.io/v0/servers?search=io.github.xplusplusai/fo-semantic-mcp"
```

---

**Ready to publish?** Start with Step 1 above to publish to npm, then follow the automated workflow for all future releases!
