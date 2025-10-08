import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ConfigError, getConfig } from './utils/config.js';
import { createLogger } from './utils/logger.js';
import { SearchApiClient } from './services/searchApiClient.js';
import { registerSearchTool } from './tools/searchFOArtifacts.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
    try {
        // Read instruction from external markdown file
        const instructionPath = join(__dirname, '..', 'docs', 'MCP_instruction_doc', 'MCP_Tool_SearchFOArtifacts_Instructions.md');
        let instructions = readFileSync(instructionPath, 'utf-8');
        // Replace placeholder with actual local assets path if configured
        if (localAssetsPath) {
            instructions = instructions.replace(/Local F&O assets path: `\[Will be configured\]`/g, `Local F&O assets path: \`${localAssetsPath}\``);
            instructions = instructions.replace(/fullLocalPath: \[Available when FO_LOCAL_ASSETS_PATH is configured\]/g, `fullLocalPath: Full path to XML file (configured: ${localAssetsPath})`);
        }
        else {
            // Add warning if local assets not configured
            instructions = instructions.replace(/Local F&O assets path: `\[Will be configured\]`/g, 'Local F&O assets path: `NOT CONFIGURED - Set FO_LOCAL_ASSETS_PATH environment variable`');
            instructions = instructions.replace(/fullLocalPath: \[Available when FO_LOCAL_ASSETS_PATH is configured\]/g, 'fullLocalPath: NOT AVAILABLE - Configure FO_LOCAL_ASSETS_PATH to read artifact XML files');
        }
        return instructions;
    }
    catch (error) {
        logger.error('Failed to load instruction document, using fallback', error instanceof Error ? { message: error.message } : error);
        // Fallback instructions if file cannot be read
        return `# FO-Index Semantic Search for Dynamics 365 F&O Development

This MCP server provides semantic search over Microsoft Dynamics 365 Finance & Operations artifacts.

## Available Tool
\`search_fo_artifacts\` - Search F&O artifacts using natural language queries

## Configuration
Local assets path: ${localAssetsPath || 'NOT CONFIGURED'}

For detailed usage instructions, see docs/MCP_instruction_doc/MCP_Tool_SearchFOArtifacts_Instructions.md

## Error
The detailed instruction document could not be loaded. Please check server logs.`;
    }
}
start().catch((error) => {
    logger.error('Fatal error starting MCP server', error instanceof Error ? { message: error.message, stack: error.stack } : error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map