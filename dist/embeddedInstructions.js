// Auto-generated file - DO NOT EDIT
// Generated from: docs/MCP_instruction_doc/MCP_Tool_SearchFOArtifacts_Instructions.md
export const EMBEDDED_INSTRUCTIONS = `# ⭐ The Golden Path: F&O Development Workflow

**THE ONLY CORRECT WAY for AI to assist with D365 F&O/X++ Development**

---

## 🎯 The 6-Step Workflow (ALWAYS Follow)

\`\`\`
┌──────────────────────────────────────────────────────────┐
│                    USER REQUEST                          │
│        "Add field / extend form / implement logic"       │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 1: SEARCH STANDARD D365                             │
│ ───────────────────────────────────────────────────────  │
│ Tool: search_FO_artifacts                                │
│ Goal: Find what Microsoft implements                     │
│ Result: List of relevant artifacts                       │
│                                                           │
│ Example:                                                  │
│   search_FO_artifacts({                                  │
│     query: "Forms displaying SalesTable header",         │
│     artifact_types: ["Form"]                             │
│   })                                                      │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 2: READ STANDARD IMPLEMENTATION                     │
│ ───────────────────────────────────────────────────────  │
│ Tool: read_file(fullLocalPath from results)             │
│ Goal: Learn HOW Microsoft does it                        │
│ Result: Understand XML structure, patterns, naming       │
│                                                           │
│ Example:                                                  │
│   read_file("...SalesTable.Extension.xml")              │
│   → Learn: Parent groups, control types, structure       │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 3: SEARCH USER'S CODE (AUTOMATIC!)                 │
│ ───────────────────────────────────────────────────────  │
│ Tools: glob_file_search / codebase_search                │
│ Goal: Find user's existing customizations                │
│ Result: Locate their extensions                          │
│                                                           │
│ Example:                                                  │
│   glob_file_search("**/AxFormExtension/SalesTable*.xml")│
│   → Find: User's existing form extensions                │
│                                                           │
│ ⚠️ CRITICAL: Do NOT wait for user to ask!               │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 4: READ USER'S CODE                                 │
│ ───────────────────────────────────────────────────────  │
│ Tool: read_file(user's customization path)              │
│ Goal: Understand their style, structure, current state   │
│ Result: Context for adaptation                           │
│                                                           │
│ Example:                                                  │
│   read_file("Metadata/ARM/.../SalesTable.ARM.xml")      │
│   → Learn: Their naming, what they have, what's missing  │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 5: SYNTHESIZE SOLUTION                              │
│ ───────────────────────────────────────────────────────  │
│ Process: Combine standard pattern + user context         │
│ Goal: Adapt Microsoft's approach to user's project       │
│ Result: Working code that fits their style               │
│                                                           │
│ What to combine:                                          │
│ ✅ Microsoft's XML structure (from Step 2)              │
│ ✅ User's naming convention (from Step 4)               │
│ ✅ User's existing extension (from Step 4)              │
│ ✅ Current version patterns (from Step 2)               │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 6: PRESENT WITH FULL CONTEXT                        │
│ ───────────────────────────────────────────────────────  │
│ Format:                                                   │
│ 1. 📦 Standard artifacts found (list with purpose)       │
│ 2. 🔧 User's customizations (highlight what they have)   │
│ 3. ⚠️  Gaps identified (what's missing)                  │
│ 4. 💡 Recommendation with code                           │
│ 5. 📚 Explanation (why this approach)                    │
│ 6. 🎯 Next steps                                         │
│                                                           │
│ Goal: User understands AND can implement                 │
│ Result: Code compiles first time                         │
└──────────────────────────────────────────────────────────┘
                         ↓
                   ✅ SUCCESS!
            Code works first time
         Developer is happy & productive
\`\`\`

---

## ⚠️ CRITICAL RULES

### ✅ DO (Always):
- **Execute ALL 6 steps** for every F&O coding request
- **Read standard code** before generating anything
- **Check user's code** automatically (don't wait to be asked)
- **Adapt patterns** to user's style and project
- **Explain why** patterns work (educational)
- **Reference source** (which standard file provided pattern)

### ❌ DON'T (Never):
- **Skip steps** 3 & 4 (common mistake!)
- **Guess at patterns** instead of reading
- **Generate without context** from user's code
- **Show only standard** without user's customizations
- **Wait for user to ask** about their extensions
- **Use outdated patterns** instead of current code

---

## 💡 Why This Workflow Works

| Step | Prevents | Ensures |
|------|----------|---------|
| **1. Search Standard** | Guessing what exists | Find all relevant artifacts |
| **2. Read Standard** | Wrong XML structure | Learn proven patterns |
| **3. Search User** | Duplicate work | Know what they have |
| **4. Read User** | Wrong style/naming | Match their conventions |
| **5. Synthesize** | Generic code | Perfect fit for their project |
| **6. Present Context** | Confusion | Full understanding |

**Result:** Code that compiles first time, every time.

---

## 🔥 Real Example

**User:** "Add a new field to SalesTable form"

### ❌ WRONG WAY (Without Golden Path):
\`\`\`
AI: "You can add a control like this..."
<FormControl>
  <Field>MyField</Field>
</FormControl>
\`\`\`
**Result:** ❌ Syntax error, doesn't compile

### ✅ CORRECT WAY (Following Golden Path):

**Step 1:** Search → Found SalesTable, SalesTableListPage, etc.
**Step 2:** Read standard → Learned XML structure
**Step 3:** Search user → Found SalesTable.ARM.xml
**Step 4:** Read user → Saw their style, existing extensions
**Step 5:** Synthesize → Combined Microsoft pattern + ARM style
**Step 6:** Present:

\`\`\`markdown
## 📦 Standard Forms (3 found)
1. SalesTable - Main form ✅ PRIMARY
2. SalesTableListPage - Grid view
3. SalesCreateOrder - Creation wizard

## 🔧 Your Customizations
✅ Found: SalesTable.ARM.xml (already extends main form)
   - Has: Buttons, line fields
   - Missing: Header field controls

## 💡 Recommendation
Add to your existing SalesTable.ARM.xml:
\`\`\`xml
<AxFormExtensionControl xmlns="">
    <Name>FormExtensionControl_YourField</Name>
    <FormControl xmlns="" i:type="AxFormStringControl">
        <Name>SalesTable_YourField</Name>
        <Type>String</Type>
        <FormControlExtension i:nil="true" />
        <DataField>YourField</DataField>
        <DataSource>SalesTable</DataSource>
    </FormControl>
    <Parent>TabHeaderSetup</Parent>
    <PositionType>AfterItem</PositionType>
    <PreviousSibling>ExistingControl</PreviousSibling>
</AxFormExtensionControl>
\`\`\`

This follows Microsoft's pattern from ApplicationSuite_Extension.xml
and matches your ARM naming convention.
\`\`\`

**Result:** ✅ Compiles first time, fits their project perfectly

---

## 📊 Impact Comparison

| Metric | Without Golden Path | With Golden Path |
|--------|-------------------|------------------|
| **Time to solution** | 2+ hours | 30 seconds |
| **First-time compile** | ❌ Syntax errors | ✅ Works immediately |
| **Code quality** | ⚠️ Guessed patterns | ✅ Microsoft standards |
| **Fits user project** | ❌ Generic code | ✅ Adapted to their style |
| **User understanding** | ❓ Unclear why | ✅ Fully explained |
| **Missed customizations** | ⚠️ Duplicates work | ✅ Adds to existing |

---

## 🎯 Success Checklist

Before delivering ANY F&O solution:

- [ ] ✅ Searched standard D365
- [ ] ✅ Read standard implementation
- [ ] ✅ Searched user's workspace
- [ ] ✅ Read user's customizations
- [ ] ✅ Synthesized adapted solution
- [ ] ✅ Presented with full context

**If ANY box is unchecked → Start over!**

---

## 🚨 Common Mistakes to Avoid

### Mistake #1: Skipping User Code Search
\`\`\`
❌ Search standard → Generate code → Done
\`\`\`
**Problem:** Misses that user already extended the artifact!

**Fix:** Always execute Steps 3 & 4

---

### Mistake #2: Not Reading Standard Implementation
\`\`\`
❌ Search standard → List results → Generate code
\`\`\`
**Problem:** Guesses at XML structure, gets it wrong!

**Fix:** Always read standard files in Step 2

---

### Mistake #3: Waiting for User to Ask
\`\`\`
❌ AI: "Found SalesTable form. Need anything else?"
User: "What about my existing extensions?"
AI: "Oh let me check..."
\`\`\`
**Problem:** Wastes time, appears incompetent!

**Fix:** Automatically search user code in Step 3

---

## 💪 The Golden Path Advantage

**What users say:**

> "Before: AI gave me code that didn't compile. After: Code works first time. This workflow transformed my F&O development."

> "AI went from useless to expert-level assistance. All because it follows the Golden Path."

> "I used to spend hours searching PackagesLocalDirectory. Now AI does it in 30 seconds - and adapts the pattern to my code style automatically."

---

## 🎓 Remember

**The Golden Path is not a suggestion.**  
**It's the ONLY way to deliver reliable F&O development assistance.**

**Why?**
- F&O patterns are complex and version-specific
- XML schemas can't be guessed correctly
- User's existing code must be considered
- Microsoft's implementation is the blueprint

**Follow the path. Every time. No exceptions.**

---

## 🔗 Related Documentation

- **Full Instructions:** \`MCP_Tool_SearchFOArtifacts_Instructions.md\`
- **How AI Learns X++:** \`How_AI_Agent_Codes_XPlusPlus.md\`
- **Tool Promotion:** \`MCP_Tool_Promotion.md\`

---

**Version:** 1.0  
**Last Updated:** 2025-10-08  
**Purpose:** Quick reference for AI clients to follow the Golden Path workflow  
**Audience:** AI developers, MCP tool implementers, F&O development assistants

---

**Print this. Pin it. Follow it. Every. Single. Time.** 📌

`;
//# sourceMappingURL=embeddedInstructions.js.map