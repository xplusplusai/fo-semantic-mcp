import { z } from 'zod';
import { createLogger } from '../utils/logger.js';
import { SearchApiError } from '../services/searchApiClient.js';
const logger = createLogger('SearchTool');
const FO_ARTIFACT_TYPE_ENUM = z.enum([
    'Table',
    'Form',
    'Class',
    'EDT',
    'Enum',
    'DataEntity',
    'View',
    'Query',
]);
const SearchToolInput = z.object({
    query: z.string().min(1, 'query is required'),
    artifact_types: z.array(FO_ARTIFACT_TYPE_ENUM).nonempty().optional(),
    include_related: z.boolean().optional(),
    limit: z.number().int().positive().max(50).optional(),
    threshold: z.number().min(0).max(1).optional().describe('Minimum relevance score (0-1) to filter results'),
});
const ArtifactResultSchema = z.object({
    foName: z.string(),
    artifactType: z.string(),
    description: z.string().optional(),
    relevanceScore: z.number().optional(),
    fullLocalPath: z.string().optional(),
    foUrl: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
});
const SearchToolOutput = z.object({
    results: z.array(ArtifactResultSchema),
    related: z.array(ArtifactResultSchema).optional(),
    usage_instructions: z.string().optional(),
    localAssetsPath: z.string(),
    raw: z.unknown().optional(),
});
export const SEARCH_TOOL_NAME = 'search_fo_artifacts';
export function registerSearchTool(server, client, config) {
    server.registerTool(SEARCH_TOOL_NAME, {
        title: 'Search F&O Artifacts',
        description: 'Semantic search over Microsoft Dynamics 365 Finance & Operations artifacts (tables, forms, classes, etc.).',
        inputSchema: SearchToolInput.shape,
        outputSchema: SearchToolOutput.shape,
    }, async (args) => {
        const parsedArgs = SearchToolInput.parse(args);
        const limit = parsedArgs.limit ? Math.min(parsedArgs.limit, config.hardLimit) : undefined;
        try {
            const response = await client.search({
                ...parsedArgs,
                limit,
            });
            const structured = SearchToolOutput.parse(response);
            return {
                content: [
                    {
                        type: 'text',
                        text: formatSuccessMessage(structured.results.length, structured.related?.length),
                    },
                ],
                structuredContent: structured,
            };
        }
        catch (error) {
            return handleToolError(error, config);
        }
    });
}
function handleToolError(error, config) {
    if (error instanceof SearchApiError) {
        const text = `${error.message}\nSuggestion: ${error.suggestion}`;
        return {
            isError: true,
            content: [
                {
                    type: 'text',
                    text,
                },
            ],
            structuredContent: SearchToolOutput.parse({
                results: [],
                usage_instructions: 'Resolve the reported issue before retrying the search.',
                localAssetsPath: config.localAssetsPath ?? 'Not configured',
                raw: error.details,
            }),
        };
    }
    logger.error('Unhandled error in search tool', error instanceof Error ? { message: error.message } : error);
    return {
        isError: true,
        content: [
            {
                type: 'text',
                text: 'Unexpected error while running search_fo_artifacts tool. Check server logs for details.',
            },
        ],
    };
}
function formatSuccessMessage(resultCount, relatedCount) {
    const parts = [`Found ${resultCount} primary artifacts.`];
    if (relatedCount && relatedCount > 0) {
        parts.push(`Included ${relatedCount} related artifacts.`);
    }
    parts.push('Use structuredContent.localAssetsPath + fullLocalPath to open files.');
    return parts.join(' ');
}
//# sourceMappingURL=searchFOArtifacts.js.map