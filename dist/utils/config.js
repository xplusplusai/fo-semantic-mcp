import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_LIMIT = 10;
const HARD_LIMIT = 50;
const DEFAULT_SERVER_VERSION = '2.0.5';
const DEFAULT_THRESHOLD = undefined; // No threshold by default - return all results
let cachedConfig = null;
export class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConfigError';
    }
}
export function getConfig() {
    if (cachedConfig) {
        return cachedConfig;
    }
    const apiKey = process.env.FOINDEX_API_KEY?.trim();
    if (!apiKey) {
        throw new ConfigError('FOINDEX_API_KEY environment variable is required. Get your API key from https://www.xplusplus.ai/');
    }
    const serverName = process.env.FO_SEMANTIC_MCP_NAME?.trim() || 'fo-semantic-mcp';
    const serverVersion = process.env.FO_SEMANTIC_MCP_VERSION?.trim() || DEFAULT_SERVER_VERSION;
    // Production URL hardcoded, with optional override for development
    const DEFAULT_PRODUCTION_URL = 'https://search.xplusplus.ai';
    const searchApiBaseUrl = (process.env.FOINDEX_DEV_API_URL?.trim() || DEFAULT_PRODUCTION_URL).replace(/\/$/, '');
    const requestTimeoutMs = parsePositiveInt(process.env.FO_SEARCH_TIMEOUT_MS, DEFAULT_TIMEOUT_MS);
    const defaultLimit = clampLimit(parsePositiveInt(process.env.FO_SEARCH_DEFAULT_LIMIT, DEFAULT_LIMIT));
    const hardLimit = clampLimit(parsePositiveInt(process.env.FO_SEARCH_MAX_LIMIT, HARD_LIMIT));
    // Parse optional threshold (0-1 range for relevance score filtering)
    let defaultThreshold = DEFAULT_THRESHOLD;
    // Try both the original name and a shorter alternative
    const rawThreshold = process.env.FO_SEARCH_DEFAULT_THRESHOLD?.trim() || process.env.FO_THRESHOLD?.trim();
    if (rawThreshold) {
        const parsed = Number.parseFloat(rawThreshold);
        if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) {
            defaultThreshold = parsed;
        }
        else {
            console.error(`Warning: Threshold must be between 0 and 1. Got: ${rawThreshold}. Ignoring.`);
        }
    }
    let localAssetsPath;
    const rawPath = process.env.FO_LOCAL_ASSETS_PATH?.trim();
    if (rawPath) {
        const resolved = resolve(rawPath);
        if (!existsSync(resolved)) {
            // Log warning but don't fail - local assets are optional
            console.error(`Warning: F&O installation not found at path: ${resolved}`);
            console.error('Local file reading will not be available, but search functionality will work.');
            // Don't set localAssetsPath if directory doesn't exist
        }
        else {
            localAssetsPath = resolved;
        }
    }
    cachedConfig = {
        serverName,
        serverVersion,
        searchApiBaseUrl,
        apiKey,
        localAssetsPath,
        requestTimeoutMs,
        defaultLimit,
        hardLimit,
        defaultThreshold,
    };
    return cachedConfig;
}
function parsePositiveInt(rawValue, fallback) {
    if (!rawValue) {
        return fallback;
    }
    const parsed = Number.parseInt(rawValue, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return fallback;
    }
    return parsed;
}
function clampLimit(value) {
    return Math.max(1, Math.min(HARD_LIMIT, value));
}
//# sourceMappingURL=config.js.map