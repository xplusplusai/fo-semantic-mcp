import fetch from 'node-fetch';
import { join } from 'node:path';
import { createLogger } from '../utils/logger.js';
const logger = createLogger('SearchApiClient');
export class SearchApiError extends Error {
    status;
    suggestion;
    details;
    constructor(message, status, suggestion, details) {
        super(message);
        this.status = status;
        this.suggestion = suggestion;
        this.details = details;
        this.name = 'SearchApiError';
    }
}
export class SearchApiClient {
    config;
    constructor(config) {
        this.config = config;
    }
    async search(params) {
        const limit = Math.min(params.limit ?? this.config.defaultLimit, this.config.hardLimit);
        const body = {
            query: params.query,
            limit,
        };
        // Add threshold if specified (or use default from config)
        if (params.threshold !== undefined) {
            body.threshold = params.threshold;
        }
        else if (this.config.defaultThreshold !== undefined) {
            body.threshold = this.config.defaultThreshold;
        }
        // Add filters if specified - using correct Pinecone syntax
        if (params.artifact_types?.length) {
            body.filters = body.filters || {};
            if (params.artifact_types.length === 1) {
                // Single value: "artifactType": "Table"
                body.filters.artifactType = params.artifact_types[0];
            }
            else {
                // Multiple values: "artifactType": {"$in": ["Table", "Form"]}
                body.filters.artifactType = { "$in": params.artifact_types };
            }
        }
        const url = `${this.config.searchApiBaseUrl}/api/v1/search`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.config.requestTimeoutMs);
        try {
            logger.debug('Issuing search request', { url, body });
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': this.config.apiKey,
                },
                body: JSON.stringify(body),
                signal: controller.signal,
            });
            const raw = (await safeJson(response));
            if (!response.ok) {
                const errorMsg = raw.error || `Search API responded with status ${response.status}`;
                throw new SearchApiError(errorMsg, response.status, suggestForStatus(response.status), raw);
            }
            if (!raw.success || !raw.data) {
                throw new SearchApiError(raw.error || 'Search API returned unsuccessful response', response.status, 'Check the search query and try again.', raw);
            }
            const results = Array.isArray(raw.data.results) ? raw.data.results : [];
            const related = undefined; // Search service doesn't currently return related results
            const usage = deriveUsage(results.length);
            // Add fullLocalPath to each result if localAssetsPath is configured
            const processedResults = results.map(result => {
                if (this.config.localAssetsPath && result.filePath) {
                    // Remove leading slash and split path by forward slashes
                    const normalizedPath = result.filePath.startsWith('/') ? result.filePath.substring(1) : result.filePath;
                    const pathParts = normalizedPath.split('/');
                    // Use Node.js path.join for proper cross-platform path construction
                    const fullLocalPath = join(this.config.localAssetsPath, ...pathParts);
                    return {
                        ...result,
                        fullLocalPath
                    };
                }
                return result;
            });
            return {
                results: processedResults,
                related,
                usage_instructions: usage,
                localAssetsPath: this.config.localAssetsPath ?? 'Not configured',
                raw,
            };
        }
        catch (error) {
            if (error instanceof SearchApiError) {
                logger.error(error, { stage: 'search-response' });
                throw error;
            }
            if (error instanceof Error && error.name === 'AbortError') {
                const timeoutError = new SearchApiError(`Search request timed out after ${this.config.requestTimeoutMs}ms`, 408, 'Retry or increase FO_SEARCH_TIMEOUT_MS.');
                logger.error(timeoutError);
                throw timeoutError;
            }
            const wrapped = new SearchApiError('Unexpected error while querying search API', 500, 'Check network connectivity and FOINDEX_API_KEY configuration.', error instanceof Error ? { message: error.message, stack: error.stack } : error);
            logger.error(wrapped);
            throw wrapped;
        }
        finally {
            clearTimeout(timeout);
        }
    }
}
async function safeJson(response) {
    try {
        return await response.json();
    }
    catch (error) {
        return {
            parseError: error instanceof Error ? error.message : String(error),
        };
    }
}
function deriveUsage(resultCount) {
    if (resultCount > 0) {
        return 'Use file reading tools on fullLocalPath values to inspect artifact contents.';
    }
    return 'No results found. Try broadening your query or removing filters.';
}
function suggestForStatus(status) {
    if (status === 401 || status === 403) {
        return 'Verify FOINDEX_API_KEY is valid and has access to the FO-Index search service.';
    }
    if (status === 429) {
        return 'Search API rate limit exceeded. Retry with backoff.';
    }
    if (status >= 500) {
        return 'Search service reported an error. Retry later or contact support.';
    }
    return 'Check request parameters and try again.';
}
//# sourceMappingURL=searchApiClient.js.map