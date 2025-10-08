# MCP Tool Instructions: `search_FO_artifacts`

**AI Client Guide for D365 F&O Development Assistance**

---

## 🎯 Core Purpose

The `search_FO_artifacts` MCP tool searches **Microsoft Dynamics 365 Finance & Operations standard metadata** using semantic understanding. 

**Key Point:** This tool is an expert in **standard D365 artifacts only** - it does NOT index the user's custom code.

---

## ⭐ THE GOLDEN PATH: Primary F&O Development Workflow

**This is THE way AI should assist with F&O/X++ development. Follow this workflow for EVERY coding request.**

### **The Default Workflow (ALWAYS Follow This):**

```
┌─────────────────────────────────────────────────────────────┐
│  USER REQUEST: "Add field to SalesTable form"              │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: SEARCH STANDARD D365                               │
│  Tool: search_FO_artifacts                                  │
│  Find: What Microsoft implements                            │
│  Result: Discover all relevant artifacts                    │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: READ STANDARD IMPLEMENTATION                       │
│  Tool: read_file(standardPath from results)                │
│  Learn: XML structure, patterns, naming conventions         │
│  Result: Understand HOW Microsoft does it                   │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: SEARCH USER'S CODE (AUTOMATIC!)                   │
│  Tools: glob_file_search / codebase_search                  │
│  Find: User's existing customizations                       │
│  Result: Know what they already have                        │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: READ USER'S CODE                                   │
│  Tool: read_file(userPath from search)                     │
│  Understand: Their style, structure, current state          │
│  Result: Context for adaptation                             │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: SYNTHESIZE & GENERATE                              │
│  Combine: Standard pattern + User context                   │
│  Adapt: Microsoft's approach to user's project              │
│  Result: Code that works first time                         │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: PRESENT WITH CONTEXT                               │
│  Show: Standard artifacts found                             │
│  Show: User's customizations (highlight with 🔧)            │
│  Show: Generated code with explanation                      │
│  Show: Why this approach (reference standard)               │
│  Result: User understands and can implement                 │
└─────────────────────────────────────────────────────────────┘
```

### **Why This Workflow Works:**

1. ✅ **No Guessing** - AI reads actual D365 code
2. ✅ **Always Current** - Uses user's installed version
3. ✅ **Proven Patterns** - Follows Microsoft's implementation
4. ✅ **Context-Aware** - Adapts to user's existing code
5. ✅ **First-Time Success** - Code compiles and works immediately
6. ✅ **Educational** - User learns while coding

### **⚠️ CRITICAL: Never Skip Steps 3 & 4**

**Common Mistake:**
```
❌ Search standard D365 → Generate code → Done
   (Misses user's existing extensions!)
```

**Correct Approach:**
```
✅ Search standard → Read standard → Search user's code → Read user's code → Generate
   (Complete context = Perfect result)
```

### **Real Example of Golden Path:**

**User Request:** "What forms should I extend for SalesTable header field?"

**AI Following Golden Path:**

```typescript
// STEP 1: Search Standard
search_FO_artifacts({
  query: "Forms that display SalesTable header information",
  artifact_types: ["Form"]
});
// Found: SalesTable, SalesTableListPage, SalesCreateOrder + 12 others

// STEP 2: Read Standard (Learn Pattern)
read_file(".../SalesTable.ApplicationSuite_Extension.xml");
/* Learned:
   - Header fields use Parent: TabHeaderSetup, Baseinfo, etc.
   - Control structure: AxFormExtensionControl → FormControl
   - DataSource: SalesTable (not SalesLine)
   - Naming: SalesTable_{FieldName}
*/

// STEP 3: Search User's Code (AUTOMATIC - don't wait for user to ask!)
glob_file_search("**/AxFormExtension/SalesTable*.xml");
// Found: Metadata/ARM/ARM/AxFormExtension/SalesTable.ARM.xml

// STEP 4: Read User's Code
read_file("Metadata/ARM/ARM/AxFormExtension/SalesTable.ARM.xml");
/* Discovered:
   - User already extends SalesTable form
   - Has buttons and line fields
   - Does NOT have header field controls yet
   - Uses ARM prefix for naming
*/

// STEP 5: Synthesize
// Combine: Microsoft's TabHeaderSetup pattern + User's ARM naming + Their existing extension

// STEP 6: Present
"## 📦 Standard Forms (3 found)
1. SalesTable - Main form (PRIMARY)
2. SalesTableListPage - Grid view
3. SalesCreateOrder - Creation wizard

## 🔧 Your Customizations
✅ SalesTable.ARM.xml - Already extends main form
   - Currently: Buttons + line fields
   - Missing: Header field controls

⚠️ Not yet extended: SalesTableListPage, SalesCreateOrder

## 💡 Recommendation
Add header field to existing SalesTable.ARM.xml:
```xml
[Perfect XML based on Microsoft pattern + user's style]
```

This follows Microsoft's pattern from ApplicationSuite_Extension.xml
and matches your ARM naming convention."
```

**Result:** User gets working code that compiles first time, with full context and explanation.

---

## 📋 Usage Protocol for AI Clients

### **STEP 1: Use This Tool For Standard D365 Exploration**

#### When to Use ✅

- "What forms handle SalesTable?"
- "Show me pricing-related classes"
- "Find data entities for customer orders"
- Understanding standard D365 patterns
- Learning how Microsoft implements features
- Discovering which artifacts to extend

#### When NOT to Use ❌

- Searching user's custom code (use workspace tools instead)
- Finding exact code snippets (use `grep`)
- Locating user's specific customizations

#### Query Best Practices

**✅ GOOD - Complete questions with context:**
```
"What forms display or edit SalesTable sales order header information?"
"Which classes handle inventory reservation logic?"
"Find data entities related to purchase order processing"
```

**❌ BAD - Single keywords:**
```
"SalesTable"
"inventory"
"forms"
```

#### Artifact Type Filtering

```typescript
// Focused search - single type
artifact_types: ["Form"]

// Related types - multiple
artifact_types: ["Table", "DataEntity"]

// Broad search - omit parameter
artifact_types: [] // searches all types
```

**Available Artifact Types:**
- `Table` - Data tables
- `Form` - User interface forms
- `Class` - X++ classes
- `EDT` - Extended Data Types
- `Enum` - Enumerations
- `DataEntity` - Data entities
- `View` - Database views
- `Query` - AOT queries

---

### **STEP 2: Digest Tool Results**

#### Result Structure

```json
{
  "foName": "SalesTable.Extension",
  "artifactType": "Form",
  "subType": "FormExtension",
  "module": "Foundation",
  "fullLocalPath": "C:\\Users\\...\\SalesTable.xml",
  "businessDomain": "Sales",
  "aiDescription": "Form purpose and functionality...",
  "aiUsageContext": "How business users interact with it...",
  "aiBusinessImpact": "Impact if misconfigured...",
  "configurationKey": "RetailBasic",
  "hasSourceCode": false,
  "methodCount": 0,
  "fieldCount": 0
}
```

#### Key Fields to Present

| Field | Purpose | Action |
|-------|---------|--------|
| `foName` | Artifact identifier | Display prominently |
| `artifactType` | Type (Form, Table, Class, etc.) | Categorize results |
| `subType` | Extension vs base artifact | Note extensions |
| `module` | D365 module (Foundation, ApplicationSuite) | Show context |
| `fullLocalPath` | Absolute file path | Use for `read_file` |
| `businessDomain` | Business area (Sales, Inventory) | Group logically |
| `aiDescription` | What it does | Summarize for user |
| `aiUsageContext` | How users interact | Explain usage |
| `configurationKey` | Feature flag | Note requirements |

---

### **STEP 3: ALWAYS Follow Up With Workspace Search**

#### ⚠️ CRITICAL PROTOCOL

**After EVERY `search_FO_artifacts` call, immediately search the workspace for custom code!**

This is NOT optional - it should be automatic behavior.

#### Standard Workflow

```typescript
// 1. Search standard D365
const standardResults = search_FO_artifacts({
  query: "Forms that display SalesTable header",
  artifact_types: ["Form"]
});
// Returns: 15 standard forms

// 2. IMMEDIATELY search workspace for related customizations
const customResults = glob_file_search("**/AxFormExtension/SalesTable*.xml");
// Returns: User's SalesTable.ARM.xml, SalesTable.MyExtension.xml

// 3. Present combined view (see Step 6)
```

#### Why This Matters

- User needs to know what they've ALREADY customized
- Prevents duplicate work
- Shows gaps in their customizations
- Provides complete context for recommendations

---

### **STEP 4: Choose Right Tool for Workspace Search**

#### Decision Matrix

| User's Code Type | Best Tool | Pattern Example |
|------------------|-----------|-----------------|
| **Form extensions** | `glob_file_search` | `**/AxFormExtension/SalesTable*.xml` |
| **Table extensions** | `glob_file_search` | `**/AxTableExtension/CustTable*.xml` |
| **Classes** | `glob_file_search` | `**/AxClass/MyClass*.xml` |
| **Data entities** | `glob_file_search` | `**/AxDataEntityView/*Entity*.xml` |
| **Conceptual search** | `codebase_search` | "How does user validate sales orders?" |
| **Exact field/method** | `grep` | `pattern: "MyFieldName"` |
| **All extensions** | `glob_file_search` | `**/AxTableExtension/*.xml` |

#### Common Search Patterns

```typescript
// After finding standard form
glob_file_search("**/AxFormExtension/{FormName}*.xml")

// After finding standard table
glob_file_search("**/AxTableExtension/{TableName}*.xml")

// After finding standard class
glob_file_search("**/AxClass/{ClassName}*.xml")

// Generic search for artifact type in user's model
glob_file_search("**/Metadata/{ModelName}/{ModelName}/Ax{ArtifactType}/*.xml")
```

#### Example Workflow

```typescript
// User asks: "What forms should I extend for SalesTable header field?"

// Step 1: Standard search
search_FO_artifacts({
  query: "Forms that display or edit SalesTable header information",
  artifact_types: ["Form"]
});
// Returns: SalesTable, SalesTableListPage, SalesCreateOrder

// Step 2: Workspace search (AUTOMATIC - don't wait for user to ask)
glob_file_search("**/AxFormExtension/SalesTable*.xml");
// Returns: Metadata/ARM/ARM/AxFormExtension/SalesTable.ARM.xml

glob_file_search("**/AxFormExtension/SalesTableListPage*.xml");
// Returns: (none found)

glob_file_search("**/AxFormExtension/SalesCreateOrder*.xml");
// Returns: (none found)

// Step 3: Present combined results (see Step 6)
```

---

### **STEP 5: When to Read Physical Files**

#### Read Standard D365 Files When:

- ✅ User explicitly asks "show me how it's implemented"
- ✅ Need to understand structure/pattern for extension
- ✅ Validating search results before presenting
- ✅ Learning best practices from Microsoft's implementation
- ✅ User wants to see example code
- ✅ Need to confirm field groups, controls, or methods

**Use `fullLocalPath` from tool results:**
```typescript
// Tool returned:
{
  "fullLocalPath": "C:\\Users\\spark.chen\\AppData\\Local\\...\\SalesTable.Extension.xml"
}

// Read it:
read_file("C:\\Users\\spark.chen\\AppData\\Local\\...\\SalesTable.Extension.xml");
```

#### Always Read User's Custom Files:

User's customizations are in the workspace - **ALWAYS read them** to show current state:

```typescript
// After glob_file_search found: "Metadata/ARM/ARM/AxFormExtension/SalesTable.ARM.xml"
read_file("Metadata/ARM/ARM/AxFormExtension/SalesTable.ARM.xml");
// Show user what they currently have
```

#### Don't Over-Read:

- ❌ Don't read all 15 standard forms unless specifically needed
- ✅ Read 1-2 key examples to show patterns
- ✅ Always read ALL of user's custom files found

---

### **STEP 6: Combine and Present Results**

#### Presentation Template

```markdown
## 🔍 Search Results: "{User's Question}"

### 📦 Standard D365 Artifacts ({count})
Found {X} standard {artifact_type}(s):

1. **{foName}** ({module})
   - Purpose: {brief aiDescription}
   - Location: {module} module
   - Type: {artifactType} {subType ? `(${subType})` : ''}

2. **{foName2}**
   ...

### 🔧 Your Customizations ({count})
Checking your workspace...

✅ **Found {Y} custom extension(s):**

1. **{fileName}** 
   - Path: `{relativePath}`
   - Extends: {baseArtifact}
   - Status: Already customized
   - [Show relevant code snippet from read_file]

⚠️ **Not Yet Extended:**
- {StandardArtifact1} - Consider extending if you need {reason}
- {StandardArtifact2} - ...

### 💡 Analysis
{Compare standard vs custom, identify gaps, explain implications}

### 📋 Recommended Next Steps
1. {Actionable step based on analysis}
2. {Next step}
3. {Follow-up considerations}
```

#### Real Example Output

```markdown
## 🔍 Forms to Extend for SalesTable Header Field

### 📦 Standard D365 Forms (3)
Found 3 core forms that display SalesTable header:

1. **SalesTable** (Foundation)
   - Purpose: Main sales order form for viewing/editing orders
   - Location: Foundation module
   - Type: Form
   - This is the PRIMARY form - all header fields should be added here

2. **SalesTableListPage** (Foundation)
   - Purpose: Sales order list/grid view
   - Location: Foundation module
   - Add columns here for visibility in list pages

3. **SalesCreateOrder** (Foundation)
   - Purpose: Sales order creation wizard
   - Include if field needed at creation time

### 🔧 Your Customizations (1)

✅ **Found 1 custom extension:**

**SalesTable.ARM.xml**
- Path: `Metadata/ARM/ARM/AxFormExtension/SalesTable.ARM.xml`
- Extends: SalesTable form
- Currently adds:
  - Custom button: `ARM_SalesUpdateRemain`
  - Line field: `AM_EDIPrice` (on SalesLine data source)
- ⚠️ Does NOT yet have header field controls

⚠️ **Not Yet Extended:**
- `SalesTableListPage` - Consider if your header field should be visible in grid view
- `SalesCreateOrder` - Consider if field is needed during order creation

### 💡 Analysis

You've already extended the SalesTable form for customizations, but only for:
- Button actions (update remain)
- Line-level fields (EDI price)

To add a **header field**, you should add controls to the same `SalesTable.ARM.xml` 
extension, but reference the `SalesTable` data source (not `SalesLine`).

Based on standard D365 patterns (from `SalesTable.ApplicationSuite_Extension.xml`),
header fields are typically added to groups like:
- `TabHeaderSetup` - for setup/configuration fields
- `Baseinfo` - for basic information fields
- `GroupStatus` - for status fields
- Custom groups under appropriate tabs

### 📋 Recommended Next Steps

1. **Add header field to `SalesTable.ARM.xml`**
   - Add `AxFormExtensionControl` with your field
   - Set `DataSource` to `SalesTable` (header data source)
   - Choose appropriate `Parent` group (e.g., `TabHeaderSetup`, `Baseinfo`)
   - Position using `PositionType` and `PreviousSibling`

2. **Consider extending `SalesTableListPage`**
   - If users need to see this field in the order list
   - Add grid column to show the value

3. **Evaluate `SalesCreateOrder`**
   - If the field should be set when creating new orders
   - Add control to creation wizard

Would you like me to show you the exact XML pattern to add the header field?
```

---

## 🚀 Proactive Behavior Checklist

### ⭐ PRIMARY BEHAVIOR: Follow the Golden Path

**For EVERY F&O coding request, execute the complete 6-step workflow:**

1. ✅ **Search standard D365** (search_FO_artifacts)
2. ✅ **Read standard implementation** (read_file standard)
3. ✅ **Search user's code** (glob_file_search/codebase_search) - **AUTOMATIC!**
4. ✅ **Read user's code** (read_file user's files)
5. ✅ **Synthesize solution** (combine standard + user context)
6. ✅ **Present with full context** (standard + custom + explanation)

**This is NOT optional. This is THE workflow.**

---

### AI Client Should AUTOMATICALLY:

- ✅ **Follow Golden Path for every request** - all 6 steps, every time
- ✅ After `search_FO_artifacts`, **immediately** search workspace (Step 3)
- ✅ **Read standard implementations** to learn patterns (Step 2)
- ✅ **Read user's custom files** to understand context (Step 4)
- ✅ Highlight user's custom code with 🔧 emoji or **bold**
- ✅ Flag gaps: "Found standard X but you haven't customized it yet"
- ✅ Show side-by-side comparison when relevant
- ✅ Provide actionable next steps with code examples
- ✅ Explain the "why" behind recommendations
- ✅ Reference patterns from standard D365 when suggesting changes
- ✅ Show WHERE pattern came from (which standard file)
- ✅ Adapt Microsoft's patterns to user's naming/style

### AI Client Should NEVER:

- ❌ **Skip any step of the Golden Path** - especially Steps 3 & 4!
- ❌ Show only standard results without checking workspace
- ❌ Generate code without reading standard implementation first
- ❌ Generate code without checking user's existing customizations
- ❌ Wait for user to ask about their customizations
- ❌ Present results without analysis/recommendations
- ❌ Assume user knows what to do with the results
- ❌ Recommend creating new artifacts when extensions exist
- ❌ Guess at XML structure or X++ patterns
- ❌ Use outdated patterns instead of reading current code

---

## 🎯 Success Criteria

### A Complete Response Includes:

1. ✅ **Standard D365 artifacts** from `search_FO_artifacts`
   - With context (module, purpose, type)
   
2. ✅ **User's related customizations** from workspace search
   - What they've already done
   - What's missing
   
3. ✅ **Clear highlighting** of custom vs standard
   - Visual distinction (emojis, formatting)
   
4. ✅ **Gap analysis**
   - What user has vs what they need
   - Implications of gaps
   
5. ✅ **Actionable recommendations**
   - Specific next steps
   - Code patterns/examples when needed
   
6. ✅ **File paths** ready for next steps
   - Both standard (for learning) and custom (for editing)

---

## ⚡ Quick Reference Commands

### Full Workflow Pattern

```typescript
// 1. Search standard D365
search_FO_artifacts({
  query: "Complete question with context",
  artifact_types: ["Form", "Table"]  // Optional filter
});

// 2. IMMEDIATELY search workspace
glob_file_search("**/Ax{ArtifactType}/{BaseName}*.xml");

// Alternative workspace searches:
codebase_search({
  query: "Conceptual question about user's code",
  target_directories: ["Metadata/{ModelName}"]
});

grep({
  pattern: "FieldName|MethodName",
  path: "Metadata/{ModelName}"
});

// 3. Read files as needed
read_file(standardPath);  // If validation needed
read_file(customPath);    // Always read user's files

// 4. Present combined analysis with recommendations
```

---

## 📚 Common Scenarios

### Scenario 1: User Asks About Forms to Extend

```typescript
// User: "What forms should I extend for a new SalesTable field?"

// 1. Standard search
search_FO_artifacts({
  query: "Forms that display SalesTable fields",
  artifact_types: ["Form"]
});

// 2. Workspace check
glob_file_search("**/AxFormExtension/SalesTable*.xml");
glob_file_search("**/AxFormExtension/SalesTableListPage*.xml");

// 3. Read user's existing extensions
read_file("Metadata/{Model}/{Model}/AxFormExtension/SalesTable.{Model}.xml");

// 4. Present: Standard forms + User's status + Recommendations
```

### Scenario 2: User Asks How Microsoft Implements Something

```typescript
// User: "How does Microsoft handle pricing calculations?"

// 1. Standard search
search_FO_artifacts({
  query: "Classes that handle pricing calculations",
  artifact_types: ["Class"]
});

// 2. Read example implementation
read_file(results[0].fullLocalPath);

// 3. Check if user has related customizations
codebase_search({
  query: "pricing calculation logic in user code",
  target_directories: ["Metadata"]
});

// 4. Present: Pattern from Microsoft + User's current approach (if any)
```

### Scenario 3: User Wants to Understand a Standard Artifact

```typescript
// User: "What does SalesFormLetter class do?"

// 1. Standard search
search_FO_artifacts({
  query: "SalesFormLetter class functionality and purpose",
  artifact_types: ["Class"]
});

// 2. Present AI description from tool results

// 3. Check if user extends it
glob_file_search("**/AxClass/SalesFormLetter*.xml");

// 4. Present: Standard purpose + User's extensions (if any)
```

---

## 🔍 Tool Limitations & Workarounds

### Limitations

1. **Does not index user's custom code**
   - Workaround: Use workspace search tools after every query

2. **Search limits on free tier**
   - Be mindful of search count
   - Use appropriate filters to reduce result sets

3. **Results from installed D365 version only**
   - Results reflect the local PackagesLocalDirectory version
   - May differ if user is on different D365 version

4. **No cross-reference to user customizations**
   - Workaround: AI client must do correlation manually

### Best Practices

- Start with focused queries using `artifact_types` filter
- Always follow up with workspace search
- Cache results mentally to avoid redundant searches
- Read files selectively (examples, not everything)
- Present synthesized information, not raw tool output

---

## 📞 Integration with Other Tools

### Tool Composition Strategy

```
search_FO_artifacts (Standard D365)
    ↓
glob_file_search / codebase_search (User's code)
    ↓
read_file (Both standard & custom)
    ↓
grep (Detailed code search if needed)
    ↓
search_replace / write (Make changes)
```

### Example: Complete Development Workflow

```typescript
// User: "Add a new field to SalesTable and show it on forms"

// Phase 1: Discovery
search_FO_artifacts("Forms displaying SalesTable");
glob_file_search("**/AxTableExtension/SalesTable*.xml");
glob_file_search("**/AxFormExtension/SalesTable*.xml");

// Phase 2: Validation
read_file(userTableExtension);
read_file(userFormExtension);
read_file(standardFormExample); // To show pattern

// Phase 3: Guidance
// Present: Where to add field + example XML + next steps

// Phase 4: Implementation (if user requests)
search_replace(userTableExtension, oldXml, newFieldXml);
search_replace(userFormExtension, oldXml, newControlXml);

// Phase 5: Verification
read_lints([modifiedFiles]);
```

---

## 💡 Tips for Effective Use

1. **Think in Two Layers**: Standard + Custom
   - Every query should trigger both
   
2. **Context is Key**: 
   - Better to search "forms for SalesTable header" than just "SalesTable forms"
   
3. **Artifact Types Matter**:
   - Use filters to avoid overwhelming results
   
4. **Read Selectively**:
   - Read standard files for patterns
   - Read ALL custom files for current state
   
5. **Present Actionable Insights**:
   - Don't just dump results
   - Synthesize, compare, recommend
   
6. **Leverage AI Metadata**:
   - Tool provides rich business context
   - Use aiDescription, aiUsageContext, aiBusinessImpact
   
7. **Follow Standard Patterns**:
   - Microsoft's implementations are the blueprint
   - Show users how to follow the same patterns

---

## 🎓 Learning Resources

### Understanding Tool Results

- `businessDomain`: Groups related artifacts (Sales, Inventory, Purchasing)
- `module`: Shows where code lives (Foundation, ApplicationSuite, etc.)
- `configurationKey`: Indicates feature flags that enable/disable functionality
- `aiDescription`: Business purpose - explain this to user
- `aiUsageContext`: How end-users interact - important for UX decisions
- `aiBusinessImpact`: What breaks if misconfigured - use for risk assessment

### D365 Extension Patterns

Standard extensions follow patterns:
- `{ArtifactName}.{Extension/Module}` naming
- Extensions reference base artifact
- Use form extension controls with Parent, PositionType, PreviousSibling
- Table extensions add fields to field list
- Class extensions use `[ExtensionOf(classStr(...))]`

Observe these patterns in standard results and guide users to follow them.

---

## 📝 Summary

### ⭐ The Golden Path is THE Way

**This is the ONLY correct workflow for F&O development assistance:**

```
Search Standard → Read Standard → Search User → Read User → Synthesize → Present
```

Every other approach results in:
- ❌ Code that doesn't compile
- ❌ Missed user customizations
- ❌ Guessed patterns instead of proven ones
- ❌ Frustrated developers
- ❌ Wasted time

**The Golden Path results in:**
- ✅ Code that compiles first time
- ✅ Adapts to user's existing code
- ✅ Follows Microsoft's proven patterns
- ✅ Happy, productive developers
- ✅ Time saved

### Quick Checklist - The Golden Path 6 Steps

Before responding to ANY F&O coding request:

- [ ] ✅ **Step 1:** Searched standard D365 with `search_FO_artifacts`
- [ ] ✅ **Step 2:** Read standard implementation to learn patterns
- [ ] ✅ **Step 3:** Searched workspace for related customizations
- [ ] ✅ **Step 4:** Read user's custom files for context
- [ ] ✅ **Step 5:** Synthesized solution (standard + user context)
- [ ] ✅ **Step 6:** Presented with full context:
  - [ ] Standard artifacts found
  - [ ] User's customizations (with 🔧)
  - [ ] Gap analysis
  - [ ] Generated code
  - [ ] Explanation of why/how
  - [ ] Next steps

**If you skipped ANY step, you did it wrong. Start over.**

---

**Version:** 1.0  
**Last Updated:** 2025-10-08  
**Tool:** search_FO_artifacts MCP Server  
**Audience:** AI Clients / Orchestrators working with D365 F&O developers

