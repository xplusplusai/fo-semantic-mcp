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
5. Use metadata.aiDescription for business context

🔍 DETAIL LOOKUP (get structural metadata):
When you need full structural data (form control trees, table field details, entity mappings,
security entry points, full cross-references), use foName filter + single artifact_type.
This triggers SQL enrichment with detailed metadata not available in semantic search results.

Examples:
• Get form control tree: search_fo_artifacts({ query: "SalesTable", filters: { foName: "SalesTable" }, artifact_types: ["Form"] })
  → Returns: controlTree (nested control hierarchy), dataSources, formPattern
• Get table structure: search_fo_artifacts({ query: "CustTable", filters: { foName: "CustTable" }, artifact_types: ["Table"] })
  → Returns: fields (with EDT, mandatory, type), relations (with FK constraints), indexes, tableGroup
• Get entity mappings: search_fo_artifacts({ query: "SalesOrderHeaderV2Entity", filters: { foName: "SalesOrderHeaderV2Entity" }, artifact_types: ["DataEntity"] })
  → Returns: fieldMappings, dataSources, stagingTable
• Get security chain: search_fo_artifacts({ query: "SalesTableMaintain", filters: { foName: "SalesTableMaintain" }, artifact_types: ["SecurityPrivilege"] })
  → Returns: entry points (object, type, grant level)

IMPORTANT: foName alone is NOT enough for detail lookup — you MUST also specify a single artifact_type.
The same name can exist as Form, Table, Query, etc. Without artifact_type, only Pinecone semantic results are returned.

📐 CONTROL TREE FORMAT (Form detail lookups):
When you request a Form detail lookup, the controlTree field returns an indented text format:

  0 Design [Design]
  1   ActionPaneHeader [ActionPane]
  2     SalesOrder [ActionPaneTab]
  3       NewGroup [ButtonGroup]
  3       SalesOrderProcess [ButtonGroup]
  1   MainTab [Tab]
  2     TabPageDetails [TabPage]
  3       HeaderView [Group]
  4         TabHeaderGeneral [TabPage]

Format: "{level} {indent}{name} [{type}]"
- Level number = nesting depth (0=root). This is the source of truth for hierarchy.
- Indentation = visual aid (2 spaces per level)
- Type = abbreviated control type (ActionPane, Group, Tab, TabPage, Grid, String, CheckBox, ComboBox, MenuButton, etc.)
- Complete tree — all controls at all levels including action panes

Use this to understand form layout, find control groups for extensions, and identify where to add new controls.
To parse: split by newline, extract level number, name, and type from each line.`;
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