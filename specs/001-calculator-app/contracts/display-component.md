# Display Component Contract

**Component**: DisplayComponent  
**Purpose**: Dual-line calculator display (expression + result)  
**Phase**: Phase 1 - Design

## Component Structure

```
┌─────────────────────────────────┐
│ Expression Line                  │  ← Small, muted (12-14px)
│ 5 + 3 ×                         │
├─────────────────────────────────┤
│ Result Line                      │  ← Large, prominent (24-32px)
│ 8                               │
└─────────────────────────────────┘
```

---

## Props

### `currentValue: string`

**Type**: String  
**Required**: Yes  
**Description**: Current display value (result line)

**Valid Values**:

- Numeric string: "42", "3.14159", "0"
- Error message: "Error: Division by zero"
- Empty displays as "0"

---

### `expressionText: string`

**Type**: String  
**Required**: No (default: "")  
**Description**: Expression being built (top line)

**Examples**:

- "5 +"
- "12 - 4 ×"
- "" (empty for basic mode)

---

### `isError: boolean`

**Type**: Boolean  
**Required**: No (default: false)  
**Description**: Whether display shows error state

**Behavior**:

- If `true`, apply error styling (red text)
- Truncate error message if > 30 chars

---

## Methods

### `update(currentValue: string, expressionText?: string): void`

**Purpose**: Update both display lines

**Parameters**:

- `currentValue`: New result value
- `expressionText`: Optional expression text

**Behavior**:

- Render `expressionText` in top line (small, muted)
- Render `currentValue` in bottom line (large, bold)
- Apply ARIA live region updates
- Truncate if exceeds display width

---

### `showError(message: string): void`

**Purpose**: Display error state

**Parameters**:

- `message`: Error message string

**Behavior**:

- Set `isError = true`
- Apply error styling (red text, warning icon)
- Announce error to screen readers
- Clear expression line

---

### `clear(): void`

**Purpose**: Reset display to initial state

**Behavior**:

- Set `currentValue = "0"`
- Set `expressionText = ""`
- Clear error state
- Reset ARIA live region

---

## Accessibility

### ARIA Attributes

```html
<div class="display" role="region" aria-label="Calculator display">
  <!-- Expression line -->
  <div class="display__expression" aria-label="Expression">
    5 + 3 ×
  </div>
  
  <!-- Result line -->
  <div 
    class="display__result" 
    role="status" 
    aria-live="polite" 
    aria-atomic="true"
  >
    8
  </div>
</div>
```

### Screen Reader Behavior

- Result changes announced via `aria-live="polite"`
- Errors announced immediately
- Full expression read when requested

---

## Styling Requirements

### Layout

- **Container**: CSS Grid, full width
- **Expression Line**: 
  - Font: 12-14px, monospace
  - Color: `--color-text-muted` (gray)
  - Alignment: Right
  - Min height: 24px
  
- **Result Line**:
  - Font: 24-32px (responsive), monospace
  - Color: `--color-text-primary` (black)
  - Alignment: Right
  - Min height: 48px
  - Bold weight

### Error State

- Result line color: `--color-error` (red)
- Warning icon (optional)
- Red border (2px)

### Responsive Breakpoints

- **Mobile (<600px)**: Result 24px, Expression 12px
- **Tablet (600-900px)**: Result 28px, Expression 13px
- **Desktop (>900px)**: Result 32px, Expression 14px

---

## Text Truncation

### Behavior

- Max display width: 15 visible characters
- Overflow: Horizontal scroll (touch devices) OR ellipsis
- Scientific notation for very large/small numbers

### Examples

```
Input: 123456789012345
Display: 1.234567890e+14

Input: 0.00000000001
Display: 1.0e-11
```

---

## Usage Example

```javascript
const display = new DisplayComponent();

// Update display
display.update('8', '5 + 3');

// Show error
display.showError('Division by zero');

// Clear
display.clear();
```

---

## Constitution Alignment

- **UX First**: Large text, clear hierarchy, immediate feedback
- **Accessibility**: ARIA live regions, semantic HTML, high contrast
- **Performance**: Minimal DOM updates, CSS-only animations
