# 🧮 Spec-Kit Calculator Demo

A comprehensive demonstration of GitHub's [Spec-Kit](https://github.com/github/spec-kit) workflow for building a modern web-based calculator application.

## 📋 Overview

This demo guides you through the complete Spec-Kit development process, from establishing project principles to full implementation. You'll build a feature-rich calculator application using a structured, AI-assisted workflow.

## 🚀 Getting Started

### Prerequisites

- GitHub Copilot with Agent Mode enabled
- VS Code with GitHub Copilot extension
- Access to Spec-Kit slash commands

### Initialize the Project

```bash
uvx --from git+https://github.com/github/spec-kit.git specify init demo
```

---

## 🎯 Spec-Kit Workflow Phases

### Phase 1: Constitution

**Purpose:** Establish project principles and guidelines

**Command:**

```
/speckit.constitution Create a constitution for a modern web-based calculator application that emphasizes user experience, accessibility, and clean code architecture. The calculator should be simple yet powerful, supporting basic arithmetic operations with a clean, intuitive interface.
```

**What this does:**
- Defines core project values
- Sets architectural principles
- Establishes quality standards
- Creates development guidelines

---

### Phase 2: Specification

**Purpose:** Create detailed baseline specification

**Command:**

```
/speckit.specify Build a web-based calculator with the following requirements: Support basic arithmetic operations (addition, subtraction, multiplication, division), include memory functions (M+, M-, MR, MC), provide keyboard shortcuts for all operations, implement a clear/all-clear function, display calculation history, ensure responsive design for mobile and desktop, follow WCAG 2.1 AA accessibility standards, and use modern vanilla JavaScript without dependencies.
```

**What this does:**
- Documents functional requirements
- Defines technical specifications
- Lists user stories
- Sets acceptance criteria

**Key Features Specified:**
- ➕ Basic arithmetic (±, ×, ÷)
- 💾 Memory functions (M+, M-, MR, MC)
- ⌨️ Keyboard shortcuts
- 🧹 Clear/All-clear functions
- 📜 Calculation history
- 📱 Responsive design
- ♿ WCAG 2.1 AA accessibility
- 🚀 Vanilla JavaScript (no dependencies)

---

### Phase 2.5: Clarify (Optional)

**Purpose:** De-risk ambiguous areas before planning

**Command:**

```
/speckit.clarify
```

**What this does:**
- Asks structured questions about unclear requirements
- Identifies potential risks and edge cases
- Clarifies assumptions
- Reduces implementation surprises

**When to use:** Run this before `/speckit.plan` if you need clarification on requirements

---

### Phase 3: Planning

**Purpose:** Create detailed implementation plan

**Command:**

```
/speckit.plan Create a detailed implementation plan for the calculator application, breaking down the work into logical phases covering HTML structure, CSS styling, JavaScript logic, keyboard event handling, memory functions, history tracking, accessibility features, and testing strategy.
```

**What this does:**
- Breaks work into logical phases
- Identifies dependencies
- Estimates complexity
- Defines milestones

**Plan Coverage:**
- 📄 HTML structure
- 🎨 CSS styling and theming
- ⚙️ JavaScript calculation logic
- ⌨️ Keyboard event handling
- 💾 Memory functions implementation
- 📜 History tracking system
- ♿ Accessibility features
- 🧪 Testing strategy

---

### Phase 3.5: Checklist (Optional)

**Purpose:** Validate requirements quality

**Command:**

```
/speckit.checklist
```

**What this does:**
- Generates quality validation checklists
- Checks requirements completeness
- Verifies clarity and consistency
- Identifies gaps or conflicts

**When to use:** Run this after `/speckit.plan` to validate your plan before generating tasks

---

### Phase 4: Task Generation

**Purpose:** Generate actionable development tasks

**Command:**

```
/speckit.tasks
```

**What this does:**
- Creates granular, actionable tasks
- Organizes tasks by priority
- Assigns task dependencies
- Provides clear acceptance criteria for each task

---

### Phase 4.5: Analyze (Optional)

**Purpose:** Cross-artifact consistency check

**Command:**

```
/speckit.analyze
```

**What this does:**
- Checks alignment across constitution, spec, plan, and tasks
- Identifies inconsistencies
- Validates traceability
- Ensures nothing was missed

**When to use:** Run this after `/speckit.tasks` and before `/speckit.implement` for final validation

---

### Phase 5: Implementation

**Purpose:** Execute the implementation plan

**Command:**

```
/speckit.implement Execute the implementation plan for the calculator application, creating all necessary files (HTML, CSS, JavaScript), implementing core calculation logic, adding keyboard support, implementing memory functions, building the history feature, ensuring accessibility compliance, and adding comprehensive inline documentation.
```

**What this does:**
- Creates all necessary project files
- Implements core functionality
- Adds features per specification
- Includes comprehensive documentation
- Ensures quality and accessibility standards

**Deliverables:**
- ✅ Complete HTML structure
- ✅ Styled CSS with responsive design
- ✅ Full JavaScript implementation
- ✅ Keyboard shortcuts working
- ✅ Memory functions operational
- ✅ History tracking enabled
- ✅ Accessibility compliant
- ✅ Inline code documentation

---

## 📊 Complete Workflow Summary

```
┌─────────────────────────────────────────────────────────────┐
│  1. /speckit.constitution  →  Establish Principles          │
├─────────────────────────────────────────────────────────────┤
│  2. /speckit.specify       →  Create Specification          │
│     ○ /speckit.clarify     →  (Optional) Clarify Ambiguity  │
├─────────────────────────────────────────────────────────────┤
│  3. /speckit.plan          →  Create Implementation Plan    │
│     ○ /speckit.checklist   →  (Optional) Validate Quality   │
├─────────────────────────────────────────────────────────────┤
│  4. /speckit.tasks         →  Generate Actionable Tasks     │
│     ○ /speckit.analyze     →  (Optional) Check Consistency  │
├─────────────────────────────────────────────────────────────┤
│  5. /speckit.implement     →  Execute Implementation        │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Quick Start Guide

1. **Navigate to your project folder**
   ```bash
   cd spec-kit-demo
   ```

2. **Run the initialization command**
   ```bash
   uvx --from git+https://github.com/github/spec-kit.git specify init demo
   ```

3. **Follow the workflow phases in order:**
   - Copy each command from the sections above
   - Paste into your AI agent (GitHub Copilot)
   - Review the output before proceeding to the next phase
   - Use optional commands when you need extra validation

4. **Build iteratively:**
   - Start with constitution and specification
   - Use clarify if requirements are unclear
   - Plan thoroughly before implementation
   - Validate with checklist and analyze
   - Implement with confidence

---

## 🎓 What You'll Learn

- ✅ Structured AI-assisted development workflow
- ✅ Requirements-driven development practices
- ✅ Systematic planning and task breakdown
- ✅ Quality validation techniques
- ✅ Best practices for accessible web applications
- ✅ Modern vanilla JavaScript patterns

## 📚 Additional Resources

- [Spec-Kit Documentation](https://github.com/github/spec-kit)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Built with 🤖 using GitHub Spec-Kit and Copilot Agent Mode**

*Part of the [GitHub Copilot Agent Mode Demo Collection](../README.md)*
