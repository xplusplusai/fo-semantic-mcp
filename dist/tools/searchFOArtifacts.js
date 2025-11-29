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
const SearchFiltersSchema = z.object({
    foName: z.string().optional().describe('Exact match filter for specific F&O artifact name (e.g., "CustTable", "SalesTable")'),
}).optional();
const SearchToolInput = z.object({
    query: z.string().min(1, 'query is required'),
    artifact_types: z.array(FO_ARTIFACT_TYPE_ENUM).nonempty().optional(),
    include_related: z.boolean().optional(),
    limit: z.number().int().positive().max(50).optional(),
    threshold: z.number().min(0).max(1).optional().describe('Minimum relevance score (0-1) to filter results'),
    filters: SearchFiltersSchema,
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
/**
 * Build comprehensive tool description with examples and guidance
 */
function buildToolDescription() {
    return `Semantic search over Microsoft Dynamics 365 Finance & Operations standard artifacts (tables, forms, classes, etc.). 
Searches D365 metadata only - does not index user custom code.

🎯 BEST FOR (Technical/Structural Queries):
• Cross-reference lookup: "find where CustTable is used"
• Method search: "show classes with validateWrite method"  
• Inheritance: "what extends SalesLine"
• Table references: "tables that reference LedgerJournalTrans"
• Field search: "tables with CustAccount field"
• EDT search: "artifacts using AmountCur EDT"
• Module/domain: "sales order staging tables"

⚠️ NOT SUITABLE FOR (Business/Conceptual Queries):
• Process workflows: "how to validate customer credit limits" → Too conceptual, search for specific artifacts first
• Business processes: "sales order approval workflow" → Spans multiple artifacts, search by artifact name instead
• General concepts: "customer payment reconciliation" → Too broad, use specific artifact names

✅ QUERY TIPS:
1. Use specific artifact names: "CustTable", "SalesLine.validateWrite()"
2. Include technical terms: "extends", "uses", "implements", "references"
3. Use artifact_types filter to narrow results: ["Table"], ["Class"], etc.
4. For business questions: Search for specific artifact first, THEN read its metadata (aiDescription field)

📋 EXAMPLES:

Good Technical Queries:
• "find where CustTable is used" → Returns artifacts with CustTable in cross-references
• "show SalesTable methods" → Returns SalesTable with method list
• "tables extending Common" → Returns inheritance relationships
• "CustInvoiceJour staging" → Returns staging tables in invoice domain

Poor Business Queries (Use Different Approach):
• "how to manage credit limits" → Instead: Search "CreditMax" or "CustTable" first, then read metadata
• "invoice posting process" → Instead: Search "LedgerJournalTrans" or "CustInvoiceTrans", then read
• "sales order workflow" → Instead: Search "SalesTable" or "SalesLine", then explore cross-references

💡 WORKFLOW:
1. Search for specific artifact by name
2. Read artifact XML (using fullLocalPath from results)
3. Check cross-references (uses/usedBy in metadata)
4. Read related artifacts as needed
5. Use metadata.aiDescription for business context`;
}
export function registerSearchTool(server, client, config) {
    server.registerTool(SEARCH_TOOL_NAME, {
        title: 'Search F&O Artifacts',
        description: buildToolDescription(),
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
                        text: formatSuccessMessage(structured.results.length, structured.related?.length, structured),
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
function formatSuccessMessage(resultCount, relatedCount, structured) {
    const parts = [`Found ${resultCount} primary artifacts.`];
    if (relatedCount && relatedCount > 0) {
        parts.push(`Included ${relatedCount} related artifacts.`);
    }
    parts.push('Use fullLocalPath to read artifact XML files.');
    // Add structured data as JSON
    if (structured) {
        parts.push('\n\nDetailed Results:');
        parts.push(JSON.stringify(structured, null, 2));
    }
    return parts.join(' ');
}
//# sourceMappingURL=searchFOArtifacts.js.map