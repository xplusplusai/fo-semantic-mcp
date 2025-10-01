import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ConfigError, getConfig } from './utils/config.js';
import { createLogger } from './utils/logger.js';
import { SearchApiClient } from './services/searchApiClient.js';
import { registerSearchTool } from './tools/searchFOArtifacts.js';
const logger = createLogger('Server');
async function start() {
    let config;
    try {
        config = getConfig();
    }
    catch (error) {
        if (error instanceof ConfigError) {
            logger.error(error.message);
            process.exitCode = 1;
            return;
        }
        logger.error(error instanceof Error ? error : String(error));
        process.exitCode = 1;
        return;
    }
    const server = new McpServer({
        name: config.serverName,
        version: config.serverVersion,
    }, {
        instructions: buildInstructions(config.localAssetsPath),
    });
    const searchClient = new SearchApiClient(config);
    registerSearchTool(server, searchClient, config);
    server.server.oninitialized = () => {
        logger.info('Client initialization completed.');
    };
    const transport = new StdioServerTransport();
    await server.connect(transport);
    logger.info('fo-semantic-mcp server connected over stdio.');
    process.on('SIGINT', async () => {
        logger.info('Received SIGINT, shutting down.');
        await server.close();
        process.exit(0);
    });
    process.on('SIGTERM', async () => {
        logger.info('Received SIGTERM, shutting down.');
        await server.close();
        process.exit(0);
    });
}
function buildInstructions(localAssetsPath) {
    const lines = [
        '# FO-Index Semantic Search for Dynamics 365 F&O Development',
        '',
        'This MCP server is your development assistant for Microsoft Dynamics 365 Finance & Operations.',
        'It helps you find existing artifacts, learn from examples, and extend the F&O codebase effectively.',
        '',
        '## PRIMARY USE CASES - PROACTIVELY USE THIS TOOL',
        '',
        '### 1. Finding Examples and Learning Patterns',
        'When asked to create or modify F&O artifacts, ALWAYS search for similar existing implementations first:',
        '- "Find examples of tables with customer data" - Learn table structure patterns',
        '- "Show me forms that handle sales orders" - Understand form design patterns',
        '- "Find classes that extend SysOperation framework" - Learn extension patterns',
        '- "Search for data entities related to inventory" - Find integration patterns',
        '',
        '### 2. Creating Extensions',
        'Before extending any artifact, search for it to understand its structure:',
        '- Search for the base class/table/form you need to extend',
        '- Find other extensions of the same artifact to learn patterns',
        '- Locate related artifacts that interact with your target',
        '',
        '### 3. Understanding Business Context',
        'Search to understand the business domain before making changes:',
        '- Find all artifacts related to a business process',
        '- Understand module dependencies and relationships',
        '- Learn the existing implementation before modifications',
        '',
        '## CRITICAL: Using fullLocalPath',
    ];
    if (localAssetsPath) {
        lines.push(`Local F&O assets available at: ${localAssetsPath}`);
        lines.push('');
        lines.push('**IMPORTANT: ALWAYS read the actual XML files using fullLocalPath to:**');
        lines.push('- Analyze the complete artifact structure and code');
        lines.push('- Understand methods, fields, properties, and relationships');
        lines.push('- Copy patterns and follow existing conventions');
        lines.push('- Learn from actual implementations, not just metadata');
        lines.push('');
        lines.push('**Workflow: Search → Read fullLocalPath → Analyze → Implement**');
    }
    else {
        lines.push('**WARNING: Local file access not configured (FO_LOCAL_ASSETS_PATH missing)**');
        lines.push('- Cannot read actual XML files to analyze code');
        lines.push('- Only search metadata is available');
        lines.push('- Recommend user configures FO_LOCAL_ASSETS_PATH for full functionality');
    }
    lines.push('');
    lines.push('## Available Tool');
    lines.push('`search_fo_artifacts` - Search F&O artifacts using natural language queries');
    lines.push('');
    lines.push('## Parameters');
    lines.push('- `query` (required): Natural language search (e.g., "customer extension", "sales tax calculation")');
    lines.push('- `artifact_types` (optional): Filter ["Table", "Form", "Class", "EDT", "Enum", "DataEntity", "View", "Query"]');
    lines.push('- `limit` (optional): Number of results (default: 10, max: 50)');
    lines.push('- `threshold` (optional): Minimum relevance score 0-1 to filter results (default: 0.75 for high relevance)');
    lines.push('- `include_related` (optional): Include semantically related artifacts for broader context');
    lines.push('');
    lines.push('## ADAPTIVE THRESHOLD STRATEGY');
    lines.push('');
    lines.push('**When search returns 0 results with default threshold (0.75), automatically retry with lower thresholds:**');
    lines.push('1. **First attempt**: Use default threshold 0.75 (high relevance only)');
    lines.push('2. **If 0 results**: Retry with threshold 0.6 (medium-high relevance)');
    lines.push('3. **If still 0 results**: Retry with threshold 0.4 (medium relevance)');
    lines.push('4. **If still 0 results**: Retry with no threshold (all results)');
    lines.push('');
    lines.push('**Example adaptive search pattern:**');
    lines.push('```');
    lines.push('// First try high relevance');
    lines.push('search_fo_artifacts({ query: "customer payment", threshold: 0.75 })');
    lines.push('// If 0 results, try medium-high relevance');
    lines.push('search_fo_artifacts({ query: "customer payment", threshold: 0.6 })');
    lines.push('// If still 0 results, try medium relevance');
    lines.push('search_fo_artifacts({ query: "customer payment", threshold: 0.4 })');
    lines.push('```');
    lines.push('');
    lines.push('This ensures you find relevant artifacts even when the initial search is too restrictive.');
    lines.push('');
    lines.push('## Response Fields');
    lines.push('- `foName`: Artifact name for referencing/extending');
    lines.push('- `artifactType`: Type of F&O artifact');
    lines.push('- `module`: F&O module location');
    lines.push('- `filePath`: Relative path in F&O structure');
    if (localAssetsPath) {
        lines.push('- `fullLocalPath`: **USE THIS** - Full path to read the actual XML file');
    }
    lines.push('- `aiDescription`: AI analysis of business purpose');
    lines.push('- `references`: What this artifact uses and what uses it');
    lines.push('');
    lines.push('## PROACTIVE SEARCH STRATEGY');
    lines.push('');
    lines.push('When user asks you to:');
    lines.push('- **Create new artifact** → Search for similar examples first (use adaptive threshold)');
    lines.push('- **Extend existing artifact** → Search for the base and other extensions');
    lines.push('- **Implement feature** → Search for related artifacts and patterns');
    lines.push('- **Fix or modify** → Search to understand current implementation');
    lines.push('- **Integrate with module** → Search for module artifacts and patterns');
    lines.push('');
    lines.push('**CRITICAL: Always use adaptive threshold strategy when searches return 0 results.**');
    lines.push('Do not give up after one search - try progressively lower thresholds (0.75 → 0.6 → 0.4 → no threshold).');
    lines.push('');
    lines.push('Remember: This tool makes you a better F&O developer by learning from the existing codebase!');
    return lines.join('\n');
}
start().catch((error) => {
    logger.error('Fatal error starting MCP server', error instanceof Error ? { message: error.message, stack: error.stack } : error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map