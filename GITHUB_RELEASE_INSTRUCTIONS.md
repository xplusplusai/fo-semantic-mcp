# GitHub Release Instructions for v1.2.0

## ✅ Prerequisites Completed
- ✅ Committed all v1.2.0 changes to main branch
- ✅ Created and pushed v1.2.0 tag to GitHub
- ✅ Release notes prepared in `release-notes-v1.2.0.txt`

## 🚀 Create GitHub Release

### Step 1: Navigate to Releases
Go to: **https://github.com/xplusplusai/fo-semantic-mcp/releases/new**

### Step 2: Release Configuration
Fill in the following details:

- **Tag**: `v1.2.0` (should auto-populate since tag exists)
- **Release title**: `v1.2.0: Exact Artifact Matching with foName Filter`
- **Target branch**: `main`
- **Release type**: ✅ Latest release (checked)
- **Pre-release**: ❌ Unchecked

### Step 3: Release Description
Copy the contents from `release-notes-v1.2.0.txt` into the description field.

### Step 4: Upload Release Assets

**Required Files** (upload these individually):
- `package.json`
- `package-lock.json`
- `README.md`
- `CHANGELOG.md`
- `LICENSE`
- `CONTRIBUTING.md`

**Required Folders** (create ZIP files and upload):
1. Create `dist.zip` containing the entire `dist/` folder
2. Create `docs.zip` containing the entire `docs/` folder
3. Create `examples.zip` containing the entire `examples/` folder

### Step 5: Asset Creation Commands

Run these commands to create the ZIP files:

```bash
# Create ZIP files for folder assets
zip -r dist.zip dist/
zip -r docs.zip docs/
zip -r examples.zip examples/
```

Or on Windows with PowerShell:
```powershell
Compress-Archive -Path "dist" -DestinationPath "dist.zip"
Compress-Archive -Path "docs" -DestinationPath "docs.zip"
Compress-Archive -Path "examples" -DestinationPath "examples.zip"
```

### Step 6: Complete Release
1. ✅ Check "Set as the latest release"
2. ❌ Leave "Set as a pre-release" unchecked
3. Click **"Publish release"**

## 📋 Release Summary

**What this release includes:**
- **New foName Filter**: Exact artifact matching capability
- **Enhanced MCP Tool**: Updated schema with filters.foName parameter
- **AI Integration**: Better assistant integration with foName examples
- **Documentation**: Comprehensive updates and examples
- **Production Ready**: Real integrations following project standards

**Installation for users:**
1. Download the release ZIP
2. Extract to desired location
3. Update MCP configuration to point to `dist/server.js`
4. Add `FOINDEX_API_KEY` environment variable

## 🔗 Quick Links

- **Repository**: https://github.com/xplusplusai/fo-semantic-mcp
- **Releases**: https://github.com/xplusplusai/fo-semantic-mcp/releases
- **API Key Signup**: https://www.xplusplus.ai/

## ✅ Verification Steps

After publishing the release:
1. Verify the release appears in the releases list
2. Check that all assets are downloadable
3. Test the download and installation process
4. Confirm the release is marked as "Latest"

---

**The commit and tag are already pushed to GitHub. You just need to create the release through the GitHub web interface using the instructions above.**