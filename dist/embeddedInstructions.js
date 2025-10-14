// Auto-generated file - DO NOT EDIT
// Generated from: docs/MCP_instruction_doc/MCP_Tool_SearchFOArtifacts_Instructions.md
export const EMBEDDED_INSTRUCTIONS = `# MCP Tool: search_FO_artifacts

## Purpose
Semantic search over Microsoft Dynamics 365 Finance & Operations standard artifacts.

## What It Searches
- Standard D365 metadata only (tables, forms, classes, EDTs, enums, entities, views, queries)
- Does NOT index user's custom code

## Usage
**Tool:** search_FO_artifacts

**Parameters:**
- \`query\`: Natural language description (e.g., "forms that display sales order headers")
- \`artifact_types\`: Optional array to filter (["Form", "Table", "Class"], etc.)

**Returns:** Artifacts with metadata, descriptions, and fullLocalPath for reading

## Result Fields
- \`foName\`: Artifact identifier (e.g., "SalesTable")
- \`artifactType\`: Type (Form, Table, Class, EDT, Enum, DataEntity, View, Query)
- \`subType\`: More specific type (e.g., "FormExtension", "TableExtension")
- \`module\`: D365 module (Foundation, ApplicationSuite, etc.)
- \`fullLocalPath\`: Absolute path to XML file (use with read_file tool)
- \`aiDescription\`: Purpose and functionality
- \`aiUsageContext\`: How business users interact with it
- \`businessDomain\`: Business area (Sales, Inventory, Purchasing, etc.)
- \`configurationKey\`: Feature flag (if applicable)

## Best Practices
- Use complete questions with context (not single keywords)
  - Good: "forms that display or edit sales order header information"
  - Bad: "salesTable"
- Use artifact_types filter for focused results
- Use fullLocalPath with read_file to examine implementation
- Workspace search for user customizations not included - use IDE file search tools

## Limitations
- Results from local D365 installation only (PackagesLocalDirectory)
- No custom code indexing
- File paths require FO_LOCAL_ASSETS_PATH configuration
- Search limits apply based on usage tier

## Available Artifact Types
Table, Form, Class, EDT, Enum, DataEntity, View, Query
`;
//# sourceMappingURL=embeddedInstructions.js.map