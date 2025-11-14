# Demo Notes - Stage 0: The Old Ways

## 🎯 Objective
Show how Copilot Agent Mode works well for small tasks but lacks structure for larger projects.

## 🚢 The Pirate Theme
"Ahoy matey! Today we're sailin' from basic Copilot usage to a full AI-native development framework."

---

## 📝 Demo Flow

### 1. Setup (30 seconds)

**Actions:**
- Open this project in VS Code
- Show the basic files: `index.html`, `calculator.js`
- Open `index.html` in browser (you can use Live Server or just open the file)
- Show that calculator UI works but calculate function doesn't do anything yet

**Speaking Points:**
- "Here's a simple calculator project"
- "The UI is there, but the actual math functions aren't implemented yet"
- "Let's use Copilot Agent Mode to add them"

---

### 2. First Agent Mode Demo (2 min)

**Open Copilot Chat:**
- Mac: `Cmd + Shift + I`
- Windows/Linux: `Ctrl + Shift + I`

**Switch to Agent Mode** (look for the agent mode toggle)

**Prompt 1:**
```
Create a simple add function for the calculator
```

**Expected Result:**
- Agent will create/modify `calculator.js`
- Will add an `add` function
- Might update the `calculate()` function

**Speaking Points:**
- "See how quickly it understood what we needed?"
- "It added the add function and integrated it"
- "This works great for a single task!"

**Prompt 2:**
```
@workspace now add subtraction, multiplication, and division
```

**Expected Result:**
- Agent adds remaining math operations
- Updates calculate() function with all operations

**Speaking Points:**
- "Still working well!"
- "But notice - each time might give slightly different code structure"
- "If I run this tomorrow, I might get different variable names, different patterns"
- "There's no consistency across runs"

---

### 3. MCP Integration Demo (2 min)

**Note:** This requires Playwright MCP to be configured. If not configured, you can simulate or skip.

**Prompt 3:**
```
Use Playwright to test the calculator buttons
```

**Expected Result:**
- Agent might create a test file
- Might use Playwright MCP to actually run browser tests
- Shows browser automation capabilities

**Speaking Points:**
- "Now here's where it gets powerful!"
- "With MCP (Model Context Protocol), Copilot can interact with external tools"
- "It can run browser tests, call APIs, interact with databases"
- "These are superpowers! But..."

---

### 4. The Problem Reveal (30 seconds)

**Key Questions to Pose:**

1. **Scalability:**
   - "What happens when the team grows to 10 developers?"
   - "Everyone asks slightly different prompts, gets different results"

2. **Reusability:**
   - "How do we capture this successful prompt?"
   - "Where do we document that this specific phrasing works well?"

3. **Consistency:**
   - "How do we ensure all team members get the same quality output?"
   - "How do we enforce coding standards through prompts?"

4. **Governance:**
   - "How do we review and approve AI-generated code at scale?"
   - "Where's the audit trail?"

**Speaking Points:**
- "This ad-hoc approach got us here..."
- "But we need more structure for the voyage ahead"
- "We need to move from individual prompts to systematic AI workflows"
- "That's where the journey to Stage 6 begins!"

---

## 🎬 Transition to Next Stage

**Closing Statement:**
"So that's Stage 0 - the old ways. It works, but it's like sailing without a map. In the next stages, we'll build that map, create reusable patterns, and turn Copilot into a true development framework. Ready to set sail?"

---

## 🔧 Troubleshooting

### If Agent Mode isn't working:
- Make sure you have GitHub Copilot enabled
- Check that Agent Mode is available in your VS Code version
- Fall back to showing the concept with regular Copilot Chat

### If MCP/Playwright isn't configured:
- You can describe what it would do
- Or show a pre-recorded demo
- Focus more on the reusability problem

### If calculator breaks:
- Just reload `index.html`
- Or revert to the original `calculator.js` from git

---

## 💡 Pro Tips

1. **Practice the prompts** - exact wording can change results
2. **Have a backup** - save a working version before live demo
3. **Show the problems** - inconsistency is your friend here, it proves the point
4. **Time management** - if a prompt takes too long, move on
5. **Engage audience** - ask them if they've experienced these problems

---

## 📦 What Gets Created During Demo

By the end, you should have:
- ✅ Working calculator with all 4 operations
- ✅ (Maybe) Some test files
- ✅ Proof that Agent Mode works but lacks structure
- ✅ Audience understanding why we need better frameworks

This sets up perfectly for introducing structured prompts, agents, and workflows in later stages!
