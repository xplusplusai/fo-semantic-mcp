# CI/CD Pipeline Explained: From Code to MCP Registry

This document explains how the automated publishing pipeline works for fo-semantic-mcp, from code commit to appearing in the MCP registry.

---

## 🏗️ Where is the Pipeline Defined and Hosted?

### Pipeline Definition
**Location:** `.github/workflows/publish-mcp.yml`

This YAML file defines the entire automation workflow. It lives in your **GitHub repository** at:
```
fo-semantic-mcp-release/
└── .github/
    └── workflows/
        └── publish-mcp.yml  ← Pipeline definition
```

### Pipeline Hosting & Execution
**Hosted by:** **GitHub Actions** (GitHub's built-in CI/CD service)

- **Free for public repositories** (unlimited minutes)
- **Runs on GitHub's cloud infrastructure** (Ubuntu Linux runners)
- **No external servers needed** - everything runs on GitHub's machines
- **Zero configuration** - just push the YAML file to your repo

---

## 🔄 Complete CI/CD Flow: Code Commit → Registry Update

### Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. DEVELOPER ACTION                                                     │
│    (Your Local Machine)                                                 │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              │ Developer updates version and creates tag:
                              │   git tag v2.0.0
                              │   git push origin v2.0.0
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 2. TRIGGER EVENT                                                        │
│    (GitHub Repository)                                                  │
│    https://github.com/xplusplusai/fo-semantic-mcp                      │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              │ GitHub detects: push of tag matching "v*"
                              │ Reads: .github/workflows/publish-mcp.yml
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 3. GITHUB ACTIONS RUNNER                                                │
│    (GitHub's Cloud Infrastructure - Ubuntu VM)                          │
│                                                                          │
│    Job: "publish"                                                        │
│    Permissions: id-token:write, contents:read                            │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              │ GitHub Actions spins up fresh Ubuntu VM
                              │ and executes workflow steps sequentially
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 1: Checkout Code                                                   │
│ ────────────────────────────────────────────────────────────────────── │
│ Action: actions/checkout@v4                                             │
│ Result: Clones your repository to the runner's workspace                │
│                                                                          │
│ Runner now has:                                                          │
│   /home/runner/work/fo-semantic-mcp/fo-semantic-mcp/                   │
│   ├── package.json                                                       │
│   ├── server.json                                                        │
│   ├── dist/                                                              │
│   └── ...                                                                │
└─────────────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 2: Setup Node.js                                                   │
│ ────────────────────────────────────────────────────────────────────── │
│ Action: actions/setup-node@v4                                           │
│ Config: node-version: "lts/*" (latest LTS)                              │
│         registry-url: "https://registry.npmjs.org"                      │
│                                                                          │
│ Result: Installs Node.js and npm                                        │
│         Configures npm to use public npm registry                       │
└─────────────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 3: Install Dependencies                                            │
│ ────────────────────────────────────────────────────────────────────── │
│ Command: npm ci                                                          │
│                                                                          │
│ What happens:                                                            │
│   - Reads package.json dependencies                                     │
│   - Downloads @modelcontextprotocol/sdk, node-fetch, zod               │
│   - Installs exact versions from package-lock.json                      │
│   - Creates node_modules/ directory                                     │
└─────────────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 4: Publish to npm                                                  │
│ ────────────────────────────────────────────────────────────────────── │
│ Command: npm publish                                                     │
│ Auth: Uses NPM_TOKEN secret from GitHub                                 │
│                                                                          │
│ What happens:                                                            │
│   1. npm packages all files (dist/, package.json, README.md, etc.)     │
│   2. Creates tarball: fo-semantic-mcp-2.0.0.tgz                        │
│   3. Authenticates to registry.npmjs.org using NPM_TOKEN               │
│   4. Uploads tarball to npm registry                                    │
│   5. npm publishes package as: fo-semantic-mcp@2.0.0                   │
│                                                                          │
│ Package now available at:                                                │
│   https://www.npmjs.com/package/fo-semantic-mcp                         │
└─────────────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 5: Install MCP Publisher CLI                                       │
│ ────────────────────────────────────────────────────────────────────── │
│ Command: curl + tar to download mcp-publisher binary                    │
│                                                                          │
│ What happens:                                                            │
│   1. Detects OS (Linux) and architecture (amd64)                        │
│   2. Downloads from GitHub releases:                                     │
│      github.com/modelcontextprotocol/registry/releases/latest/         │
│      download/mcp-publisher_linux_amd64.tar.gz                          │
│   3. Extracts mcp-publisher binary to current directory                 │
│   4. Binary ready: ./mcp-publisher                                       │
└─────────────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 6: Authenticate with MCP Registry (GitHub OIDC)                   │
│ ────────────────────────────────────────────────────────────────────── │
│ Command: ./mcp-publisher login github-oidc                              │
│                                                                          │
│ What happens (OIDC Magic):                                               │
│   1. mcp-publisher requests OIDC token from GitHub Actions              │
│   2. GitHub Actions generates JWT token proving:                        │
│      - This workflow is running from xplusplusai/fo-semantic-mcp        │
│      - It's running in an official GitHub Actions runner                │
│      - Job has id-token:write permission                                │
│   3. Token contains claims:                                              │
│      - repository: "xplusplusai/fo-semantic-mcp"                        │
│      - workflow: "publish-mcp.yml"                                       │
│      - ref: "refs/tags/v2.0.0"                                           │
│   4. mcp-publisher sends token to MCP registry                          │
│   5. MCP registry validates token signature                             │
│   6. Registry grants publish permission for io.github.xplusplusai/*     │
│   7. Authentication stored in ~/.mcp/credentials                        │
│                                                                          │
│ ✅ NO SECRETS NEEDED! OIDC proves identity automatically                │
└─────────────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 7: Publish to MCP Registry                                         │
│ ────────────────────────────────────────────────────────────────────── │
│ Command: ./mcp-publisher publish                                        │
│                                                                          │
│ What happens:                                                            │
│   1. Reads server.json from repository                                  │
│   2. Validates schema and required fields                               │
│   3. Checks package validation:                                         │
│      a. Fetches https://registry.npmjs.org/fo-semantic-mcp             │
│      b. Verifies mcpName field in package.json matches server name      │
│      c. Confirms package exists and is publicly accessible              │
│   4. Sends server metadata to MCP registry API                          │
│   5. MCP registry stores metadata in database                           │
│   6. Server now searchable and installable via MCP clients              │
│                                                                          │
│ Server now live at:                                                      │
│   https://registry.modelcontextprotocol.io/v0/servers/                  │
│   io.github.xplusplusai/fo-semantic-mcp                                 │
└─────────────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 4. WORKFLOW COMPLETE                                                    │
│    (GitHub Actions UI)                                                  │
│                                                                          │
│    ✅ Workflow succeeded                                                │
│    ✅ Package published to npm                                          │
│    ✅ Server published to MCP registry                                  │
│                                                                          │
│    View at: https://github.com/xplusplusai/fo-semantic-mcp/actions     │
└─────────────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 5. USERS CAN NOW DISCOVER & INSTALL                                    │
│                                                                          │
│    MCP Clients (Claude Desktop, Cursor, etc.) can:                      │
│    • Search registry for "dynamics 365" or "f&o"                        │
│    • Discover io.github.xplusplusai/fo-semantic-mcp                     │
│    • Install with: npm install fo-semantic-mcp                          │
│    • Configure in their MCP client                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication & Secrets

### npm Publishing Authentication
**How it works:**
1. You create an npm token: `npm token create`
2. You add it to GitHub Secrets: `NPM_TOKEN`
3. GitHub Actions injects it as environment variable during workflow
4. npm CLI reads `NODE_AUTH_TOKEN` env var and authenticates

**Where secrets are stored:** GitHub Secrets (encrypted at rest)
**Scope:** Only accessible to workflows in this repository

### MCP Registry Authentication (GitHub OIDC)
**How it works:**
1. **No secrets needed!** Uses OpenID Connect (OIDC)
2. GitHub generates cryptographically signed JWT tokens
3. Token proves the workflow is running from your repository
4. MCP registry validates token signature using GitHub's public keys
5. Registry grants permission based on repository ownership

**Why OIDC is better than tokens:**
- ✅ No long-lived secrets to manage
- ✅ No credential rotation needed
- ✅ Automatic identity verification
- ✅ Tokens expire after workflow completes
- ✅ Can't be stolen or leaked

---

## 📝 Pipeline Configuration File Explained

Let's break down `.github/workflows/publish-mcp.yml`:

```yaml
name: Publish to MCP Registry
# Human-readable name shown in GitHub Actions UI

on:
  push:
    tags: ["v*"]
# TRIGGER: Only run when tags matching "v*" are pushed
# Examples: v1.0.0, v2.0.0, v2.1.3-beta
# Does NOT run on regular commits to branches

jobs:
  publish:
    # Job name: "publish"

    runs-on: ubuntu-latest
    # Use GitHub's Ubuntu Linux runner (free for public repos)

    permissions:
      id-token: write  # REQUIRED for OIDC authentication
      contents: read   # Read repository files
    # These permissions enable GitHub to generate OIDC tokens

    steps:
      # Sequential steps executed on the runner

      - name: Checkout code
        uses: actions/checkout@v4
        # Downloads your repository code to the runner

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "lts/*"
          registry-url: "https://registry.npmjs.org"
        # Installs Node.js and configures npm

      - name: Install dependencies
        run: npm ci
        # Installs packages from package.json

      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        # Publishes package to npm using your token

      - name: Install MCP Publisher
        run: |
          curl -L "..." | tar xz mcp-publisher
        # Downloads mcp-publisher CLI tool

      - name: Login to MCP Registry
        run: ./mcp-publisher login github-oidc
        # Authenticates using OIDC (no secrets!)

      - name: Publish to MCP Registry
        run: ./mcp-publisher publish
        # Publishes server metadata to registry
```

---

## 🎬 Real-World Example: Publishing v2.0.1

Here's what happens when you release a new version:

### Your Actions (Local Machine):
```bash
# 1. Update versions
# Edit package.json: "version": "2.0.1"
# Edit server.json: "version": "2.0.1" AND packages[0].version: "2.0.1"

# 2. Commit and tag
git add package.json server.json
git commit -m "Release v2.0.1"
git tag v2.0.1

# 3. Push
git push origin main
git push origin v2.0.1  # ← This triggers the pipeline
```

### What Happens Automatically:

**T+0s:** GitHub detects tag push `v2.0.1`
- Matches trigger pattern `tags: ["v*"]`
- Queues workflow job

**T+5s:** GitHub Actions starts Ubuntu runner
- Fresh VM spins up
- Runner downloads actions/checkout and actions/setup-node

**T+10s:** Code checkout complete
- Repository cloned to `/home/runner/work/`

**T+15s:** Node.js installed
- npm configured for registry.npmjs.org

**T+20s:** Dependencies installed
- MCP SDK, zod, node-fetch downloaded

**T+25s:** npm publish starts
- Package tarball created
- Authenticates with npm using NPM_TOKEN
- Uploads fo-semantic-mcp@2.0.1

**T+30s:** npm publish complete
- Package live at npmjs.com

**T+35s:** MCP Publisher downloaded
- Binary extracted to workspace

**T+40s:** OIDC authentication
- GitHub generates JWT token
- Token sent to MCP registry
- Credentials stored

**T+45s:** MCP publish validation
- Fetches npm package metadata
- Validates mcpName field
- Checks package accessibility

**T+50s:** MCP publish complete
- Server metadata stored in registry
- Server now discoverable

**T+55s:** Workflow complete ✅
- All steps succeeded
- Green checkmark in GitHub UI
- Email notification sent (if configured)

---

## 🏢 Infrastructure Summary

| Component | Hosted By | Location | Access |
|-----------|-----------|----------|--------|
| **Workflow Definition** | Your Repository | `.github/workflows/publish-mcp.yml` | GitHub repo |
| **Workflow Execution** | GitHub Actions | GitHub's cloud (Ubuntu VMs) | Automatic |
| **npm Package** | npm Registry | registry.npmjs.org | Public |
| **MCP Server Metadata** | MCP Registry | registry.modelcontextprotocol.io | Public |
| **Secrets (NPM_TOKEN)** | GitHub Secrets | Encrypted storage | Workflow only |
| **OIDC Tokens** | GitHub Actions | Generated per-run, expires | Workflow only |

---

## 🚦 Pipeline Triggers

The pipeline will run when:
- ✅ You push a tag matching `v*` (e.g., `v2.0.0`, `v1.5.3-beta`)

The pipeline will NOT run when:
- ❌ You push regular commits to main branch
- ❌ You create pull requests
- ❌ You push tags not starting with 'v' (e.g., `release-2.0.0`)

---

## 🔍 Monitoring & Debugging

### View Workflow Runs
https://github.com/xplusplusai/fo-semantic-mcp/actions

Each run shows:
- ✅ All steps and their status
- 📋 Full logs for each step
- ⏱️ Execution time
- 🔴 Error messages if failed

### Common Failure Points

1. **npm publish fails**
   - Check: NPM_TOKEN secret is valid
   - Check: Package version not already published
   - Check: Package name not taken

2. **MCP publish fails**
   - Check: Package exists on npm first
   - Check: mcpName in package.json matches server.json
   - Check: server.json validates against schema

3. **OIDC auth fails**
   - Check: Workflow has `id-token: write` permission
   - Check: Running from correct repository
   - Check: Repository owned by xplusplusai

---

## 💡 Key Takeaways

1. **Zero Maintenance:** Once configured, pipeline runs automatically on every tag push
2. **No External Services:** Everything runs on GitHub's infrastructure (free)
3. **Security:** OIDC eliminates long-lived secrets for MCP registry
4. **Transparency:** Full logs available for every run
5. **Reliability:** GitHub Actions has 99.9% uptime SLA
6. **Cost:** $0 for public repositories

---

**Questions?** Check the workflow logs at: https://github.com/xplusplusai/fo-semantic-mcp/actions
