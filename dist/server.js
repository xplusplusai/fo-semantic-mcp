import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ConfigError, getConfig } from './utils/config.js';
import { createLogger } from './utils/logger.js';
import { SearchApiClient } from './services/searchApiClient.js';
import { registerSearchTool } from './tools/searchFOArtifacts.js';
import { registerGoldenPathPrompts } from './prompts/goldenPathPrompts.js';
import { EMBEDDED_INSTRUCTIONS } from './embeddedInstructions.js';
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
        capabilities: {
            prompts: {},
        },
    });
    const searchClient = new SearchApiClient(config);
    registerSearchTool(server, searchClient, config);
    // Register Golden Path prompts for explicit workflow activation
    registerGoldenPathPrompts(server);
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
    // Use embedded instructions (compiled into the binary at build time)
    let instructions = EMBEDDED_INSTRUCTIONS;
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
start().catch((error) => {
    logger.error('Fatal error starting MCP server', error instanceof Error ? { message: error.message, stack: error.stack } : error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map