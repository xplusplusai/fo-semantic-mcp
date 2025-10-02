# GitHub Release Instructions for v1.2.1

## ✅ Prerequisites Completed
- ✅ Committed all v1.2.1 changes to main branch
- ✅ Created v1.2.1 tag locally
- ✅ Release notes prepared in `release-notes-v1.2.1.txt`

## 🚀 Create GitHub Release

### Step 1: Navigate to Releases
Go to: **https://github.com/xplusplusai/fo-semantic-mcp/releases/new**

### Step 2: Release Configuration
Fill in the following details:

- **Tag**: `v1.2.1` (create new tag if not yet pushed)
- **Release title**: `v1.2.1 - Critical Threshold Fix`
- **Target branch**: `main`
- **Release type**: ✅ Latest release (checked)
- **Pre-release**: ❌ Unchecked

### Step 3: Release Description
Copy the contents from `release-notes-v1.2.1.txt` into the description field.

### Step 4: Upload Release Assets

**Required Files** (upload these individually):
- `package.json`
- `package-lock.json`
- `README.md`
- `CHANGELOG.md`
- `LICENSE`
- `CONTRIBUTING.md`

**Required Folders** (already created as ZIP files):
- `dist.tar.gz` (contains the entire `dist/` folder)
- `docs.tar.gz` (contains the entire `docs/` folder)
- `examples.tar.gz` (contains the entire `examples/` folder)

### Step 5: Complete Release
1. ✅ Check "Set as the latest release"
2. ❌ Leave "Set as a pre-release" unchecked
3. Click **"Publish release"**

## 📋 Release Summary

**What this release fixes:**
- **Critical Threshold Issue**: Fixed 0.75 threshold filtering out exact foName matches
- **Better Balance**: 0.5 threshold provides optimal relevance vs. recall balance
- **Reliable foName Filter**: Exact artifact matching now works consistently
- **Updated Examples**: All configuration examples use proven 0.5 threshold
- **Enhanced Documentation**: Clear guidance on threshold usage

**Installation for users:**
1. Download the release ZIP
2. Extract to desired location
3. Update MCP configuration to point to `dist/server.js`
4. Add `FOINDEX_API_KEY` environment variable
5. **IMPORTANT**: Set `FO_SEARCH_DEFAULT_THRESHOLD` to `0.5`

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
5. Test foName filter with 0.5 threshold works correctly

---

**The commit is complete and local tag is created. You need to push the tag and create the release through the GitHub web interface using the instructions above.**

### Manual Push Commands (if needed):
```bash
cd "C:\Users\tmpsp\OneDrive\Documents\AI Work\FO-Index-MCP\fo-semantic-mcp-release"
git push origin main
git push origin v1.2.1
```