# Phase 0: Research & Technical Decisions

**Date**: 2025-11-13  
**Feature**: Web-Based Calculator (001-calculator-app)  
**Status**: Complete

## Overview

This document consolidates research findings and technical decisions for the calculator implementation. All decisions support the constitution principles and meet specified performance/accessibility requirements.

---

## 1. Decimal Arithmetic Precision in JavaScript

### Problem Statement

JavaScript uses IEEE 754 floating-point arithmetic, which causes precision issues:
- `0.1 + 0.2 = 0.30000000000000004`
- Rounding errors accumulate in chained calculations
- Need accuracy for financial/scientific calculations without external libraries (FR-021)

### Research Findings

**Approaches Evaluated**:

1. **BigInt (rejected)**: Only handles integers, not decimals
2. **String-based arithmetic (rejected)**: Complex, error-prone, slow
3. **Scaled integer math (selected)**: Convert to integers, calculate, scale back
4. **Round on display only (rejected)**: Errors accumulate internally

### Decision: Scaled Integer Arithmetic with Epsilon Comparison

**Implementation Strategy**:

```javascript
// Store internally as integers scaled by 10^10 (10 decimal places)
const SCALE = 10000000000; // 10^10

function add(a, b) {
  return (a * SCALE + b * SCALE) / SCALE;
}

// For display: Round to 10 decimal places, strip trailing zeros
function formatNumber(num) {
  return parseFloat(num.toFixed(10));
}

// For comparisons: Use epsilon threshold
const EPSILON = 1e-10;
function areEqual(a, b) {
  return Math.abs(a - b) < EPSILON;
}
```

**Rationale**:
- Meets 10 decimal place display requirement (from clarification Q5)
- No external dependencies
- Handles common calculator operations accurately
- Acceptable performance (<16ms per FR SC-005)
- Edge cases handled: overflow → scientific notation, division by zero → error

**Alternatives Considered**:
- `decimal.js` library: Rejected due to FR-021 (no dependencies)
- `BigDecimal` implementations: Too heavy for <50KB bundle target

---

## 2. Operator Precedence Implementation

### Problem Statement

Need to evaluate expressions like "2 + 3 × 4" correctly (result = 14, not 20) while maintaining simple architecture per Clean Code Architecture principle.

### Research Findings

**Algorithms Evaluated**:

1. **Shunting Yard Algorithm**: Converts infix to postfix, then evaluates
2. **Recursive Descent Parser**: Full expression parser
3. **Two-Stack Approach**: Operator stack + operand stack
4. **Simple State Machine**: Track pending operations, apply precedence rules

### Decision: Two-Stack Expression Evaluator

**Implementation Strategy**:

```javascript
class OperationEngine {
  constructor() {
    this.operatorStack = [];
    this.operandStack = [];
    this.precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  }
  
  evaluateExpression(tokens) {
    // Process tokens left-to-right
    // Apply operators based on precedence
    // Return final result
  }
  
  applyOperator(operator) {
    const b = this.operandStack.pop();
    const a = this.operandStack.pop();
    switch(operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': 
        if (b === 0) throw new Error('Cannot divide by zero');
        return a / b;
    }
  }
}
```

**Rationale**:
- Clear separation of concerns (stack management vs operations)
- Easily testable (unit tests for each operator)
- Supports precedence naturally
- Extensible for future operators
- Meets <16ms performance requirement

**Alternatives Considered**:
- Shunting Yard: More complex than needed for 4 operators
- Recursive Descent: Overkill for simple arithmetic

---

## 3. Keyboard Event Handling Best Practices

### Problem Statement

Need comprehensive keyboard support (FR-007, FR-008, US-5) including:
- Number and operator keys
- Navigation (Tab, Arrow keys)
- Special functions (Enter, Escape, Backspace)
- Memory shortcuts (Ctrl+M, Ctrl+R, etc.)
- Avoid conflicts with browser shortcuts

### Research Findings

**Patterns Evaluated**:

1. **Individual event listeners**: Scattered, hard to maintain
2. **Event delegation on container**: Single listener, centralized logic
3. **Command pattern with key maps**: Decoupled, testable

### Decision: Event Delegation with Command Pattern

**Implementation Strategy**:

```javascript
const KEY_COMMANDS = {
  // Numbers
  '0': () => calculator.inputDigit('0'),
  '1': () => calculator.inputDigit('1'),
  // ... through 9
  '.': () => calculator.inputDecimal(),
  
  // Operators
  '+': () => calculator.inputOperator('+'),
  '-': () => calculator.inputOperator('-'),
  '*': () => calculator.inputOperator('*'),
  '/': () => calculator.inputOperator('/'),
  
  // Actions
  'Enter': () => calculator.calculate(),
  '=': () => calculator.calculate(),
  'Escape': () => calculator.allClear(),
  'c': () => calculator.clear(),
  'Backspace': () => calculator.backspace(),
  
  // Memory (with modifiers)
  'Ctrl+m': () => calculator.memoryAdd(),
  'Ctrl+r': () => calculator.memoryRecall(),
  'Ctrl+l': () => calculator.memoryClear(),
  'Ctrl+-': () => calculator.memorySubtract(),
};

class KeyboardHandler {
  constructor(calculator) {
    this.calculator = calculator;
    this.attachListeners();
  }
  
  attachListeners() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }
  
  handleKeyPress(event) {
    const key = this.getKeySignature(event);
    const command = KEY_COMMANDS[key];
    
    if (command) {
      event.preventDefault(); // Prevent browser defaults
      command();
    }
  }
  
  getKeySignature(event) {
    let sig = event.key;
    if (event.ctrlKey) sig = 'Ctrl+' + sig;
    if (event.shiftKey) sig = 'Shift+' + sig;
    return sig;
  }
}
```

**Rationale**:
- Single event listener (performance)
- Centralized key mapping (maintainability)
- Easy to test (mock events, verify commands)
- Prevents browser shortcut conflicts via preventDefault()
- Supports modifier keys for memory functions
- Meets WCAG keyboard navigation requirements

**Accessibility Considerations**:
- Tab navigation for focus management
- Visible focus indicators (handled by CSS)
- Screen reader announcements (ARIA live regions)

---

## 4. Local Storage Persistence Patterns

### Problem Statement

Need to persist up to 100 calculation history entries (A-006) with:
- Graceful degradation if storage unavailable (A-003, D-002)
- Error handling for quota exceeded
- Safe serialization/deserialization

### Research Findings

**Storage API Features**:
- ~5-10MB quota (varies by browser)
- Synchronous API (simpler than IndexedDB)
- Origin-isolated
- Blocked in private browsing

### Decision: Storage Abstraction Layer

**Implementation Strategy**:

```javascript
class LocalStorageAdapter {
  constructor(storageKey = 'calculator_history') {
    this.storageKey = storageKey;
    this.isAvailable = this.checkAvailability();
    this.fallbackStorage = []; // In-memory fallback
  }
  
  checkAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('LocalStorage unavailable, using memory fallback');
      return false;
    }
  }
  
  save(data) {
    const serialized = JSON.stringify(data);
    
    if (this.isAvailable) {
      try {
        localStorage.setItem(this.storageKey, serialized);
        return true;
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          // Prune oldest entries and retry
          this.pruneOldest(data);
        }
        return false;
      }
    } else {
      this.fallbackStorage = data;
      return true;
    }
  }
  
  load() {
    if (this.isAvailable) {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } else {
      return this.fallbackStorage;
    }
  }
  
  pruneOldest(data) {
    // Keep most recent 100 entries
    const pruned = data.slice(-100);
    this.save(pruned);
  }
}
```

**Rationale**:
- Abstraction enables testing (mock storage)
- Graceful fallback meets A-003 requirement
- Quota handling prevents errors
- Simple synchronous API (no promises needed)
- Supports 100-entry limit (A-006)

---

## 5. WCAG 2.1 AA Compliance for SPAs

### Problem Statement

Must achieve 100% WCAG 2.1 AA compliance (SC-004) for:
- Screen reader announcements (FR-019)
- Keyboard navigation (FR-008)
- Focus indicators (FR-018)
- Color contrast (FR-017)
- Text resizing (FR-020)

### Research Findings

**ARIA Patterns for Calculator**:

1. **Live Regions**: Announce calculation results
2. **Role Buttons**: All calculator buttons
3. **Focus Management**: Logical tab order
4. **Labels**: Descriptive button labels

### Decision: ARIA Live Regions + Focus Management

**Implementation Strategy**:

```html
<!-- Display with ARIA live region -->
<div class="calculator-display">
  <div class="expression-line" aria-label="Expression">2 + 3 × 4</div>
  <div class="result-line" 
       role="status" 
       aria-live="polite" 
       aria-atomic="true">14</div>
</div>

<!-- Buttons with proper roles and labels -->
<button role="button" 
        aria-label="Number 5" 
        data-key="5">5</button>
<button role="button" 
        aria-label="Plus operator" 
        data-operation="+">+</button>
```

```javascript
class Accessibility {
  announceResult(result) {
    const liveRegion = document.querySelector('[role="status"]');
    liveRegion.textContent = result;
    // Screen reader automatically announces due to aria-live="polite"
  }
  
  announceError(message) {
    const liveRegion = document.querySelector('[role="status"]');
    liveRegion.setAttribute('aria-live', 'assertive'); // Interrupt for errors
    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.setAttribute('aria-live', 'polite'); // Reset
    }, 100);
  }
  
  manageFocus(element) {
    element.focus();
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
```

**CSS for Focus Indicators**:

```css
/* Visible focus indicators (FR-018) */
button:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  button:focus-visible {
    outline: 4px solid currentColor;
  }
}

/* Color contrast (FR-017) */
:root {
  --text-primary: #212121;    /* 4.5:1 on white */
  --bg-primary: #FFFFFF;
  --button-bg: #F5F5F5;       /* 3:1 contrast */
  --button-text: #212121;     /* 4.5:1 */
}
```

**Testing Tools**:
- axe-core: Automated accessibility testing
- NVDA/JAWS: Screen reader testing
- Keyboard only testing: All features accessible via Tab/Enter/Arrows

**Rationale**:
- ARIA live regions provide automatic screen reader announcements
- Role="status" with aria-live="polite" announces results without interrupting
- Focus management ensures logical navigation
- Meets all FR-017 through FR-020 requirements

---

## 6. CSS Grid vs Flexbox for Calculator Layout

### Problem Statement

Need responsive layout (320px-2560px per FR-014) that:
- Maintains 44×44px touch targets (FR-015)
- Adapts button grid for all screen sizes
- Supports side panel (desktop) and bottom drawer (mobile) for history

### Research Findings

**Layout Approaches**:

1. **CSS Grid**: Best for 2D layouts (button grid)
2. **Flexbox**: Best for 1D layouts (panels, rows)
3. **Hybrid**: Grid for buttons, Flexbox for container

### Decision: CSS Grid for Button Layout, Flexbox for Panels

**Implementation Strategy**:

```css
/* Main container - Flexbox for panel management */
.calculator-container {
  display: flex;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Calculator body */
.calculator {
  flex: 1;
  min-width: 320px;
  max-width: 400px;
}

/* Button grid - CSS Grid for equal sizing */
.button-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;
  padding: 16px;
}

.button {
  min-height: 60px;      /* > 44px for touch targets */
  min-width: 60px;
  font-size: 1.25rem;
}

/* History panel - Desktop */
@media (min-width: 768px) {
  .history-panel {
    width: 300px;
    height: 100vh;
    position: sticky;
    top: 0;
    transition: transform 0.3s ease;
  }
  
  .history-panel.collapsed {
    transform: translateX(100%);
  }
}

/* History drawer - Mobile */
@media (max-width: 767px) {
  .calculator-container {
    flex-direction: column;
  }
  
  .history-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 60vh;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
  
  .history-panel.open {
    transform: translateY(0);
  }
}

/* Text resizing support (FR-020) */
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

/* Support up to 200% zoom */
@media (min-width: 768px) and (max-width: 1536px) {
  .calculator {
    max-width: min(400px, 90vw);
  }
}
```

**Rationale**:
- Grid provides equal-sized buttons automatically
- Flexbox handles responsive panel layouts
- Media queries switch between side panel and bottom drawer
- Maintains 60×60px buttons (exceeds 44px requirement)
- Supports 200% text resize without horizontal scroll

---

## 7. Bundle Size Optimization Without Frameworks

### Problem Statement

Must meet <50KB gzipped bundle size (SC-006) while including:
- Calculator logic
- UI components
- Event handlers
- Accessibility features
- All CSS

### Research Findings

**Build Tools Evaluated**:

1. **Webpack**: Full-featured, larger output
2. **Rollup**: Good tree-shaking, medium complexity
3. **Vite**: Fast, excellent tree-shaking, modern output
4. **esbuild**: Fastest, minimal configuration

### Decision: Vite with Aggressive Optimization

**Configuration Strategy**:

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,        // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,   // Single bundle (no code splitting needed)
      }
    },
    cssMinify: true,
    reportCompressedSize: true,    // Report gzipped size
  },
  esbuild: {
    legalComments: 'none',         // Remove license comments
  }
});
```

**Code Organization for Tree-Shaking**:

```javascript
// Export only what's used (enables tree-shaking)
// calculator/index.js
export { Calculator } from './Calculator.js';
export { OperationEngine } from './OperationEngine.js';
// Don't use export * (prevents tree-shaking)

// Use ES modules, avoid CommonJS
// Good:
import { Calculator } from './calculator';
// Bad:
const Calculator = require('./calculator');
```

**Bundle Size Budget**:

- HTML: ~2 KB
- CSS: ~8 KB (minified + gzipped)
- JavaScript: ~35 KB (minified + gzipped)
- Total: ~45 KB ✅ (within 50KB budget)

**Monitoring**:

```javascript
// package.json
{
  "scripts": {
    "build": "vite build",
    "analyze": "vite build && vite-bundle-visualizer"
  }
}
```

**Rationale**:
- Vite provides excellent developer experience + small bundles
- Terser minification reduces size significantly
- No code splitting needed for small app
- Aggressive compression meets <50KB target
- Build-time size reporting prevents regressions

---

## 8. Progressive Enhancement for Calculations

### Problem Statement

FR-022 requires progressive enhancement from basic HTML form baseline. Must support basic arithmetic without JavaScript (constitution principle V).

### Research Findings

**Progressive Enhancement Layers**:

1. **Layer 0 (No JS)**: HTML form with server-side calculation
2. **Layer 1 (JS available)**: Client-side calculation
3. **Layer 2 (Modern browser)**: Full features (history, memory, etc.)

### Decision: Hybrid Approach with <noscript> Fallback

**Implementation Strategy**:

```html
<!-- Base HTML form (works without JS) -->
<form action="/calculate" method="POST" class="calculator">
  <input type="text" name="expression" id="calc-input" 
         placeholder="Enter calculation (e.g., 5 + 3)" 
         aria-label="Calculation input">
  <button type="submit">Calculate</button>
  
  <noscript>
    <p class="warning">
      This calculator requires JavaScript for full functionality. 
      You can still perform basic calculations using the form above.
    </p>
  </noscript>
</form>

<!-- Enhanced UI hidden initially, shown when JS loads -->
<div class="calculator-enhanced" hidden>
  <!-- Full calculator UI with buttons, history, etc. -->
</div>

<script type="module">
  // Progressive enhancement
  document.querySelector('.calculator').hidden = true;
  document.querySelector('.calculator-enhanced').hidden = false;
  
  // Initialize full calculator
  import { Calculator } from './scripts/main.js';
  new Calculator();
</script>
```

**Rationale**:
- **Baseline**: HTML form allows basic calculations (meets constitution requirement)
- **Enhancement**: Full UI activated only when JS available
- **Graceful**: <noscript> explains reduced functionality
- **Practical**: Realistically, target users (A-001) have JS enabled
- **Compliant**: Satisfies FR-022 and principle V

**Note**: For a calculator app, full no-JS implementation is impractical for features like:
- Real-time display updates
- Memory functions
- Calculation history
- Keyboard shortcuts

The baseline provides basic arithmetic; enhanced version provides full UX.

---

## Research Summary

All technical decisions finalized and documented. No blocking unknowns remain.

| Area | Decision | Confidence |
|------|----------|------------|
| Decimal Precision | Scaled integer arithmetic | High ✅ |
| Operator Precedence | Two-stack evaluator | High ✅ |
| Keyboard Handling | Event delegation + command pattern | High ✅ |
| Storage | LocalStorage with abstraction | High ✅ |
| Accessibility | ARIA live regions + focus management | High ✅ |
| Layout | CSS Grid + Flexbox hybrid | High ✅ |
| Bundle Size | Vite with aggressive optimization | High ✅ |
| Progressive Enhancement | HTML form baseline + JS enhancement | High ✅ |

**Next Phase**: Proceed to Phase 1 (Design & Contracts) - Generate data-model.md and contracts/

