# Implementation Plan: Web-Based Calculator

**Branch**: `001-calculator-app` | **Date**: 2025-11-13 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-calculator-app/spec.md`

## Summary

Build a modern web-based calculator supporting basic arithmetic operations (+, -, ×, ÷) with memory functions (M+, M-, MR, MC), calculation history, full keyboard support, and WCAG 2.1 AA accessibility compliance. The application must be responsive across all devices (320px-2560px), use vanilla JavaScript without framework dependencies, and meet strict performance budgets (<1s load on 3G, <50KB bundle, <16ms calculation execution).

**Technical Approach**: Client-side only web application with dual-line display (expression + result), collapsible history panel (side on desktop, drawer on mobile), local storage persistence, and progressive enhancement from basic HTML form. Architecture separates UI components, calculation logic, and state management for maintainability and testability.

## Technical Context

**Language/Version**: JavaScript ES6+ (targeting evergreen browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Primary Dependencies**: None (vanilla JavaScript requirement per FR-021)  
**Storage**: Browser Local Storage API for history persistence (with graceful degradation per A-003)  
**Testing**: Vitest or Jest for unit tests, Playwright for E2E testing, axe-core for accessibility audits  
**Target Platform**: Modern web browsers (desktop and mobile), responsive web design  
**Project Type**: Web (frontend-only, static site)  
**Performance Goals**: <1s load time on 3G, <16ms calculation execution (60 fps), <50KB gzipped bundle  
**Constraints**: No external frameworks, WCAG 2.1 AA compliance mandatory, 10 decimal places max display precision, progressive enhancement required  
**Scale/Scope**: Single-user client-side application, 100 history entries max, 6 prioritized user stories (P1-P4)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **User Experience First**: ✅ PASS
   - Spec includes 6 user stories with clear acceptance scenarios
   - Measurable usability: <5s calculation completion (SC-001), 95% first-use success (SC-008)
   - <100ms feedback implicit in UI responsiveness requirements
   - Mobile-responsive explicitly required (FR-014, US-6)

2. **Accessibility (WCAG 2.1 AA)**: ✅ PASS
   - Keyboard navigation: FR-007, FR-008, US-5 with Tab/Arrow/Enter/Escape support
   - Screen reader support: FR-019 requires ARIA labels for all operations
   - Color contrast: FR-017 mandates 4.5:1 text, 3:1 UI components
   - Touch targets: FR-015 requires 44×44px minimum (SC-003)
   - Text resizing: FR-020 supports up to 200%
   - Automated validation: SC-004 requires 100% WCAG compliance via axe-core/WAVE

3. **Clean Code Architecture**: ✅ PASS
   - Module structure proposed: UI components, calculation logic, state management separation
   - No external dependencies (vanilla JS per FR-021) = minimal dependencies
   - Clear entity definitions: Calculation, Calculator State, History Entry, Memory Register
   - Justification: Calculator complexity (precision, precedence, edge cases) requires clean separation

4. **Performance & Responsiveness**: ✅ PASS
   - <2s load on 3G: SC-002 specifies <1s (exceeds requirement)
   - <16ms calculation: SC-005 explicitly requires this
   - <50KB bundle: SC-006 explicitly requires this (gzipped)
   - Performance budgets will be monitored in CI per constitution

5. **Progressive Enhancement**: ✅ PASS
   - FR-022 requires baseline HTML form functionality
   - Core arithmetic must work without JS (per constitution principle V)
   - Graceful degradation for Local Storage (A-003, D-002)
   - No-JS fallback path documented

**Violations**: None. All constitution principles satisfied.

**Post-Phase-1 Re-check**: [To be completed after design phase]

## Project Structure

### Documentation (this feature)

```text
specs/001-calculator-app/
├── plan.md              # This file
├── spec.md              # Feature specification (complete)
├── checklists/
│   └── requirements.md  # Spec validation checklist (complete)
├── research.md          # Phase 0: Technical research & decisions
├── data-model.md        # Phase 1: State and entity definitions
├── quickstart.md        # Phase 1: Developer setup guide
├── contracts/           # Phase 1: Interface contracts
│   ├── calculator-api.md        # Calculator state machine contract
│   ├── storage-api.md           # Local storage interface
│   └── display-component.md    # Display component contract
└── tasks.md             # Phase 2: Task breakdown (created by /speckit.tasks)
```

### Source Code (repository root)

```text
# Web application structure (frontend-only)
src/
├── index.html           # Main HTML structure with semantic markup
├── styles/
│   ├── main.css         # Core calculator styles
│   ├── layout.css       # Responsive layout (grid/flexbox)
│   ├── theme.css        # Colors, typography (WCAG AA compliant)
│   └── accessibility.css # Focus indicators, high contrast support
├── scripts/
│   ├── main.js          # Application entry point
│   ├── calculator/
│   │   ├── Calculator.js        # Main calculator logic
│   │   ├── OperationEngine.js   # Arithmetic operations with precedence
│   │   ├── MemoryManager.js     # M+/M-/MR/MC functions
│   │   └── DisplayFormatter.js  # Number formatting, precision handling
│   ├── state/
│   │   ├── CalculatorState.js   # State management
│   │   └── HistoryManager.js    # History tracking & persistence
│   ├── ui/
│   │   ├── DisplayComponent.js  # Dual-line display (expression + result)
│   │   ├── ButtonGrid.js        # Calculator button layout
│   │   ├── HistoryPanel.js      # Side panel/drawer component
│   │   └── ErrorDisplay.js      # Error message presentation
│   ├── input/
│   │   ├── KeyboardHandler.js   # Keyboard event mapping
│   │   └── TouchHandler.js      # Touch event handling
│   └── utils/
│       ├── LocalStorage.js      # Storage abstraction with fallback
│       └── Accessibility.js     # ARIA announcements, focus management
├── assets/
│   └── icons/           # SVG icons (if needed for buttons)
└── config/
    └── constants.js     # App constants, keyboard mappings

tests/
├── unit/
│   ├── calculator/
│   │   ├── Calculator.test.js
│   │   ├── OperationEngine.test.js
│   │   ├── MemoryManager.test.js
│   │   └── DisplayFormatter.test.js
│   ├── state/
│   │   ├── CalculatorState.test.js
│   │   └── HistoryManager.test.js
│   └── utils/
│       └── LocalStorage.test.js
├── integration/
│   ├── keyboard-navigation.test.js
│   ├── calculation-flow.test.js
│   ├── history-persistence.test.js
│   └── accessibility.test.js
└── e2e/
    ├── basic-calculations.spec.js
    ├── memory-functions.spec.js
    ├── responsive-layout.spec.js
    └── error-handling.spec.js

# Build and configuration
build/
├── bundle.js            # Bundled and minified output
├── bundle.css           # Combined and minified CSS
└── index.html           # Processed HTML

.vscode/
├── settings.json        # Editor settings
└── extensions.json      # Recommended extensions

# Configuration files (root)
package.json             # Build scripts, dev dependencies
vite.config.js          # Vite bundler configuration
.eslintrc.json          # ESLint with accessibility plugin
.prettierrc             # Code formatting rules
playwright.config.js    # E2E test configuration
vitest.config.js        # Unit test configuration
.gitignore              # Version control exclusions
README.md               # Project documentation
```

**Structure Decision**: Selected web application structure (frontend-only). No backend required as all calculations are client-side (A-007). Static site deployment suitable (hosting on CDN per Technology Stack Standards). Source organized by concern (calculator logic, state, UI, input) to support Clean Code Architecture principle and enable independent testing per user story.

## Complexity Tracking

> **Status**: No constitutional violations requiring justification.

All 5 constitution principles satisfied by specification and proposed architecture. Vanilla JavaScript constraint is user-specified requirement, not added complexity.

---

## Phase 0: Research & Technical Decisions

**Objective**: Resolve all technical unknowns and establish concrete technical decisions before design phase.

### Research Topics

Since Technical Context is complete (no "NEEDS CLARIFICATION" markers), research focuses on best practices and pattern validation:

1. **Decimal Arithmetic Precision in JavaScript**
   - Research: How to handle floating-point precision issues (0.1 + 0.2 !== 0.3)
   - Deliverable: Strategy for accurate decimal calculations without external libraries

2. **Operator Precedence Implementation**
   - Research: Best approach for parsing and evaluating expressions with precedence
   - Deliverable: Algorithm choice (Shunting Yard, Recursive Descent, or simple state machine)

3. **Keyboard Event Handling Best Practices**
   - Research: Modern keyboard event handling, preventing browser shortcuts, accessibility considerations
   - Deliverable: Event delegation strategy and key mapping architecture

4. **Local Storage Persistence Patterns**
   - Research: Safe persistence patterns, quota limits, error handling
   - Deliverable: Storage abstraction design with graceful degradation

5. **WCAG 2.1 AA Compliance for SPAs**
   - Research: ARIA live regions, focus management, screen reader testing tools
   - Deliverable: Accessibility implementation checklist

6. **CSS Grid vs Flexbox for Calculator Layout**
   - Research: Responsive calculator button grid patterns
   - Deliverable: Layout approach for 320px to 2560px range

7. **Bundle Size Optimization Without Frameworks**
   - Research: Code splitting, tree shaking, minification strategies for vanilla JS
   - Deliverable: Build pipeline configuration meeting <50KB target

8. **Progressive Enhancement for Calculations**
   - Research: HTML form-based calculation fallback patterns
   - Deliverable: No-JS baseline implementation approach

**Output**: `research.md` (see below)

---

## Phase 1: Design & Contracts

**Prerequisites**: `research.md` complete

### Phase 1 Deliverables

1. **data-model.md**: State machine definition
   - Calculator State entity with all properties
   - State transitions for operations, errors, history
   - Memory Register behavior
   - History Entry structure

2. **contracts/**: Component and module interfaces
   - `calculator-api.md`: Calculator core interface (operations, state management)
   - `storage-api.md`: LocalStorage abstraction contract
   - `display-component.md`: Display component props and events
   - `history-panel.md`: History panel component interface
   - `keyboard-handler.md`: Keyboard event handler contract

3. **quickstart.md**: Developer onboarding
   - Local setup instructions
   - Build and run commands
   - Testing commands
   - Development workflow

**Post-Phase-1 Constitution Re-check**: [Placeholder for re-validation after design]

---

## Phase 2: Task Breakdown

**Note**: Phase 2 (task breakdown) is handled by `/speckit.tasks` command, not this plan. Tasks will be organized by user story priority to enable incremental delivery per tasks-template.md structure.

**Expected task organization**:

- Phase 1 (Setup): Project initialization, build configuration
- Phase 2 (Foundational): Core calculation engine, state management
- Phase 3 (User Story 1 - P1): Basic arithmetic UI + logic
- Phase 4 (User Story 6 - P1): Responsive layout implementation  
- Phase 5 (User Story 2 - P2): Clear/AC functions
- Phase 6 (User Story 5 - P2): Keyboard shortcuts
- Phase 7 (User Story 3 - P3): Memory functions
- Phase 8 (User Story 4 - P4): Calculation history
- Phase 9 (Testing & Polish): E2E tests, accessibility audit, performance optimization

---

## Next Steps

1. ✅ **Current**: Phase 0 research complete (see research.md below)
2. **Next**: Phase 1 design - Generate data-model.md and contracts/
3. **Then**: Run `/speckit.tasks` to generate detailed task breakdown
4. **Finally**: Begin implementation following task priorities

---

## Appendix: Key Decisions Summary

| Decision Point | Choice | Rationale |
|----------------|--------|-----------|
| **Framework** | Vanilla JS (ES6+) | User requirement (FR-021), minimizes bundle size |
| **Build Tool** | Vite | Fast dev server, excellent tree-shaking, <50KB target achievable |
| **Testing** | Vitest + Playwright | Vitest for unit (fast, Vite-integrated), Playwright for E2E (cross-browser) |
| **Layout** | CSS Grid for button grid, Flexbox for panels | Grid ideal for calculator buttons, Flexbox for responsive panels |
| **Storage** | LocalStorage with abstraction | Simple, synchronous, meets needs; abstracted for testing/fallback |
| **Accessibility** | ARIA live regions + focus management | Required for screen reader support per FR-019 |
| **Precision** | Custom decimal handling (research needed) | JavaScript float limitations require mitigation strategy |
| **History UI** | Side panel (desktop), bottom drawer (mobile) | Clarified in Session 2025-11-13, maintains context |
| **Error Display** | Persistent in output until cleared | Clarified in Session 2025-11-13, follows calculator UX patterns |
| **Display** | Dual-line (expression + result) | Clarified in Session 2025-11-13, supports transparency principle |

