import { ListPromptsRequestSchema, GetPromptRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { createLogger } from '../utils/logger.js';
const logger = createLogger('GoldenPathPrompts');
/**
 * Register Golden Path workflow prompts with the MCP server.
 * These prompts make the Golden Path workflow explicitly visible to AI clients.
 */
export function registerGoldenPathPrompts(server) {
    // List available prompts
    server.server.setRequestHandler(ListPromptsRequestSchema, async () => {
        logger.info('Listing available prompts');
        return {
            prompts: [
                {
                    name: 'fo-development-assistant',
                    description: 'Complete D365 F&O development workflow: searches standard artifacts, reads implementations, checks user customizations, generates context-aware code',
                    arguments: [
                        {
                            name: 'task',
                            description: 'Your D365 F&O development task (e.g., "Add field to SalesTable header")',
                            required: true,
                        },
                    ],
                },
            ],
        };
    });
    // Get prompt content
    server.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        logger.info(`Getting prompt: ${name}`, { args });
        if (name === 'fo-development-assistant') {
            const userRequest = args?.task || '[User development task]';
            return {
                messages: [
                    {
                        role: 'user',
                        content: {
                            type: 'text',
                            text: buildGoldenPathPrompt(userRequest),
                        },
                    },
                ],
            };
        }
        throw new Error(`Unknown prompt: ${name}`);
    });
    logger.info('Golden Path prompts registered successfully');
}
/**
 * Build the Golden Path workflow prompt that AI clients will see and follow
 */
function buildGoldenPathPrompt(userRequest) {
    return `**GOLDEN PATH F&O DEVELOPMENT WORKFLOW ACTIVATED**

User Request: "${userRequest}"

**I will now follow the MANDATORY 6-step Golden Path workflow for D365 Finance & Operations development:**

---

## STEP 1: SEARCH STANDARD D365 ARTIFACTS

**Action:** Use \`search_FO_artifacts\` MCP tool to find relevant Microsoft standard implementations.

**Purpose:** Discover what Microsoft provides out-of-the-box and understand the standard patterns.

**Query Construction Tips:**
- ✅ Use specific artifact names: "SalesTable", "CustTable", "InventTable"
- ✅ Include technical terms: "extends", "uses", "staging", "entity"
- ✅ Filter by type: artifact_types: ["Table"], ["Form"], ["Class"]
- ⚠️ Avoid vague business terms: "workflow", "process", "how to"

**Good Query Examples:**
- "find where CustTable is used" (cross-reference lookup)
- "show SalesTable methods" (method search)
- "tables extending Common" (inheritance)
- "sales order staging tables" (domain + type)

**I will search for:** [Describe what standard artifacts I'll search for based on the user's request]

---

## STEP 2: READ STANDARD IMPLEMENTATION

**Action:** Use \`read_file\` on standard artifact paths (from Step 1 results).

**Purpose:** Learn Microsoft's proven patterns - XML structure, naming conventions, control hierarchy, etc.

**I will read:** [Specify which standard files I'll examine to understand the pattern]

---

## STEP 3: SEARCH USER'S WORKSPACE (AUTOMATIC!)

**Action:** Use \`glob_file_search\` or \`codebase_search\` to find user's existing customizations.

**Purpose:** Discover what the user has already implemented - this is CRITICAL to avoid missing context.

**IMPORTANT:** This step is AUTOMATIC - I will NOT wait for the user to ask about their customizations!

**I will search for:** [Describe workspace search patterns based on Step 1 findings]

---

## STEP 4: READ USER'S CUSTOM CODE

**Action:** Use \`read_file\` on all custom files found in Step 3.

**Purpose:** Understand the user's coding style, naming conventions, and current implementation state.

**I will read:** [List all custom files discovered in workspace search]

---

## STEP 5: SYNTHESIZE SOLUTION

**Action:** Combine Microsoft's standard patterns (Step 2) with user's existing code context (Step 4).

**Purpose:** Generate code that follows proven patterns AND adapts to the user's project structure.

**I will create:** [Describe the solution that merges standard patterns with user context]

---

## STEP 6: PRESENT WITH FULL CONTEXT

**Action:** Show comprehensive results with clear categorization and actionable recommendations.

**I will present:**

### Standard D365 Artifacts Found
- List all relevant standard artifacts with context (module, purpose, type)

### Your Customizations
- What you've already customized
- What you haven't extended yet (with reasoning)

### Gap Analysis
- Compare what you have vs what you need
- Explain implications of any gaps

### Generated Code/Recommendations
- Code examples following Microsoft's patterns
- Adapted to your naming conventions and structure
- Explanation of why this approach works

### Next Steps
- Clear, actionable steps to implement
- File paths ready for editing
- Testing recommendations

---

## CRITICAL RULES I WILL FOLLOW:

- **NEVER skip Steps 3 & 4** - Workspace search is MANDATORY and AUTOMATIC
- **NEVER generate code** without first reading standard implementation
- **NEVER present results** without checking user's existing customizations
- **NEVER guess** at XML structure or X++ patterns - always read actual code
- **ALWAYS present side-by-side** comparison of standard vs custom
- **ALWAYS explain the "why"** behind recommendations
- **ALWAYS reference** which standard file the pattern came from

---

## STARTING WORKFLOW NOW...

I will now execute all 6 steps in sequence and provide a comprehensive response that includes:
1. Standard artifacts discovered
2. Your existing customizations
3. Gap analysis
4. Generated solution with full explanation
5. Next steps for implementation

**Beginning Step 1: Searching standard D365 artifacts...**`;
}
//# sourceMappingURL=goldenPathPrompts.js.map