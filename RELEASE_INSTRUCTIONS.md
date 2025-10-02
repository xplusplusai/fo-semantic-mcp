# Creating FO Semantic MCP v1.2.0 Release

This directory contains scripts to automate the creation of the v1.2.0 release for the FO Semantic MCP project.

## Quick Start

### Option 1: Double-click (Windows)
Simply double-click `create-release.bat` to run the release process.

### Option 2: PowerShell (Windows)
```powershell
.\create-release-v1.2.0.ps1
```

### Option 3: Bash (Git Bash, Linux, macOS)
```bash
bash create-release-v1.2.0.sh
```

## What the Scripts Do

1. **Verify Environment**: Check that you're in the correct directory and version is 1.2.0
2. **Commit Changes**: Stage and commit all current v1.2.0 changes
3. **Create Tag**: Create an annotated git tag for v1.2.0
4. **Push to GitHub**: Push both the commit and tag to the remote repository
5. **Create Release**:
   - If GitHub CLI (`gh`) is available: Automatically create the GitHub release with assets
   - If GitHub CLI not available: Provide detailed manual instructions

## Prerequisites

- Git configured with push access to the repository
- (Optional) GitHub CLI (`gh`) installed and authenticated for automatic release creation

## Release Assets

The following files will be included as release assets:
- `dist/` (entire folder with compiled JavaScript)
- `package.json`
- `package-lock.json`
- `README.md`
- `CHANGELOG.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `docs/` (documentation folder)
- `examples/` (examples folder)

## Manual Release (if GitHub CLI not available)

If the GitHub CLI is not available, the script will provide you with:
1. Complete step-by-step instructions
2. Pre-formatted release notes saved to `release-notes-v1.2.0.txt`
3. List of files to upload as assets

You can then:
1. Go to https://github.com/xplusplusai/fo-semantic-mcp/releases/new
2. Follow the provided instructions
3. Copy the release notes from the generated file
4. Upload the specified asset files

## Release Details

- **Tag**: v1.2.0
- **Title**: v1.2.0: Exact Artifact Matching with foName Filter
- **Target Branch**: main
- **Release Type**: Latest release (not pre-release)

## Key Features in v1.2.0

- **foName Filter**: Exact artifact matching by name
- **Enhanced MCP Tool**: Updated schema with filters.foName parameter
- **AI Assistant Integration**: Better integration with foName examples
- **Production Ready**: Real integrations with comprehensive documentation

## Troubleshooting

### "GitHub CLI not found"
- Install GitHub CLI from https://cli.github.com/
- Or follow the manual release instructions provided by the script

### "Permission denied" errors
- Ensure you have push access to the repository
- Run `git remote -v` to verify you're connected to the correct repository

### "Version mismatch" errors
- Verify that `package.json` shows version "1.2.0"
- Check that you're in the correct directory

## Post-Release Steps

After the release is created:
1. Verify the release appears at https://github.com/xplusplusai/fo-semantic-mcp/releases
2. Test downloading and installing the release package
3. Update any external documentation that references the version number
4. Announce the release to users and stakeholders

## Support

For issues with the release process, check:
- Repository permissions and authentication
- Git configuration and remote setup
- GitHub CLI installation and authentication (if using automatic mode)