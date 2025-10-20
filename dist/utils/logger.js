const LEVEL_RANK = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
};
const activeLevel = normaliseLevel(process.env.LOG_LEVEL);
export function createLogger(scope) {
    return {
        debug: (message, meta) => emit('debug', message, meta, scope),
        info: (message, meta) => emit('info', message, meta, scope),
        warn: (message, meta) => emit('warn', message, meta, scope),
        error: (message, meta) => emit('error', message, meta, scope),
    };
}
function emit(level, message, meta, scope) {
    if (LEVEL_RANK[level] < LEVEL_RANK[activeLevel]) {
        return;
    }
    const time = new Date().toISOString();
    const prefix = scope ? `[${scope}]` : '';
    const payload = message instanceof Error ? { error: serializeError(message), meta } : { message, meta };
    const line = `${time} ${level.toUpperCase()} ${prefix}`.trim();
    // CRITICAL: MCP STDIO protocol requires ALL logs to go to STDERR (not STDOUT)
    // STDOUT is reserved exclusively for JSON-RPC messages
    // All logging levels must use console.error() to write to STDERR
    console.error(line, payload);
}
function normaliseLevel(rawLevel) {
    switch ((rawLevel || '').toLowerCase()) {
        case 'debug':
            return 'debug';
        case 'info':
            return 'info';
        case 'warn':
            return 'warn';
        case 'error':
            return 'error';
        default:
            return 'info';
    }
}
function serializeError(error) {
    return {
        name: error.name,
        message: error.message,
        stack: error.stack,
    };
}
//# sourceMappingURL=logger.js.map