# Stage 0 - The Old Ways

## Demo Environment

This is a basic calculator project to demonstrate traditional Copilot Agent Mode usage.

## Demo Script

### Part 1: Stage 0 - The Old Ways (5 min)

#### Setup (30 seconds)
1. Open VS Code with this calculator project
2. Open Copilot Chat (Cmd+Shift+I / Ctrl+Shift+I)
3. Switch to Agent Mode

#### Show Current Agent Mode (2 min)

**First Task:**
```
Create a simple add function for the calculator
```

**Second Task:**
```
@workspace now add subtraction, multiplication, and division
```

**Observation Points:**
- Works, but inconsistent patterns
- No structure
- Hard to reproduce exact success

#### Show MCP Integration (2 min)

**Third Task:**
```
Use Playwright to test the calculator buttons
```

**Observation Points:**
- MCP gives Copilot superpowers (browser automation)
- But it's ad-hoc with no reusability

#### The Problem Reveal (30 seconds)

**Key Questions:**
- What happens when the team grows?
- How do we share these successful prompts?
- This got us here, but we need more structure for the voyage ahead...

## Project Structure

```
agent-stage0/
├── README.md           # This file
├── index.html          # Calculator UI
├── calculator.js       # Basic calculator logic (minimal starting point)
└── package.json        # Project configuration
```
