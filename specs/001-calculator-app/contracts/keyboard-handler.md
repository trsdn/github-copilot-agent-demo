# Keyboard Handler Contract

**Module**: KeyboardHandler  
**Purpose**: Keyboard event mapping and command dispatch  
**Phase**: Phase 1 - Design

## Overview

Handles keyboard shortcuts for all calculator operations using event delegation and command pattern.

---

## Key Mappings

### Digits

| Key | Command | Description |
|-----|---------|-------------|
| `0-9` | `inputDigit(n)` | Input numeric digit |
| `.` | `inputDecimal()` | Input decimal point |

### Operators

| Key | Command | Description |
|-----|---------|-------------|
| `+` | `inputOperator('+')` | Addition |
| `-` | `inputOperator('-')` | Subtraction |
| `*` | `inputOperator('*')` | Multiplication |
| `/` | `inputOperator('/')` | Division |
| `Enter` | `calculate()` | Execute calculation (equals) |
| `=` | `calculate()` | Execute calculation (equals) |

### Functions

| Key | Command | Description |
|-----|---------|-------------|
| `Escape` | `allClear()` | Reset calculator |
| `c` | `clear()` | Clear current entry |
| `Backspace` | `backspace()` | Delete last digit |

### Memory Functions

| Key | Command | Description |
|-----|---------|-------------|
| `m` | `memoryRecall()` | Recall memory |
| `Shift + m` | `memoryAdd()` | Add to memory (M+) |
| `Alt + m` | `memorySubtract()` | Subtract from memory (M-) |
| `Ctrl + m` | `memoryClear()` | Clear memory (MC) |

---

## Public Interface

### `constructor(calculator: Calculator)`

**Parameters**:

- `calculator`: Calculator instance to control

**Behavior**:

- Attach event listener to document
- Use event delegation (single listener)
- Prevent default for mapped keys

---

### `handleKeyPress(event: KeyboardEvent): void`

**Purpose**: Main keyboard event handler

**Parameters**:

- `event`: KeyboardEvent from browser

**Behavior**:

1. Check if key is mapped in `KEY_COMMANDS`
2. Prevent default if mapped
3. Extract command and parameters
4. Execute command on calculator
5. Ignore if input field has focus (except Enter/Escape)

---

### `enable(): void`

**Purpose**: Enable keyboard handling

**Behavior**:

- Attach keydown listener to document
- Set `isEnabled = true`

---

### `disable(): void`

**Purpose**: Disable keyboard handling

**Behavior**:

- Remove keydown listener
- Set `isEnabled = false`

**Use Case**: Disable when modal/dialog open

---

### `getKeySignature(event: KeyboardEvent): string`

**Purpose**: Generate unique key signature for mapping

**Returns**: String like "Shift+M", "Enter", "Escape"

**Parameters**:

- `event`: KeyboardEvent

**Behavior**:

- Combine modifiers (Ctrl, Shift, Alt) + key
- Normalize case (lowercase)
- Example: `Shift+M`, `Ctrl+C`, `Escape`

---

## Constants

```javascript
const KEY_COMMANDS = {
  // Digits
  '0': { command: 'inputDigit', params: ['0'] },
  '1': { command: 'inputDigit', params: ['1'] },
  '2': { command: 'inputDigit', params: ['2'] },
  '3': { command: 'inputDigit', params: ['3'] },
  '4': { command: 'inputDigit', params: ['4'] },
  '5': { command: 'inputDigit', params: ['5'] },
  '6': { command: 'inputDigit', params: ['6'] },
  '7': { command: 'inputDigit', params: ['7'] },
  '8': { command: 'inputDigit', params: ['8'] },
  '9': { command: 'inputDigit', params: ['9'] },
  '.': { command: 'inputDecimal', params: [] },
  
  // Operators
  '+': { command: 'inputOperator', params: ['+'] },
  '-': { command: 'inputOperator', params: ['-'] },
  '*': { command: 'inputOperator', params: ['*'] },
  '/': { command: 'inputOperator', params: ['/'] },
  
  // Actions
  'Enter': { command: 'calculate', params: [] },
  '=': { command: 'calculate', params: [] },
  'Escape': { command: 'allClear', params: [] },
  'c': { command: 'clear', params: [] },
  'Backspace': { command: 'backspace', params: [] },
  
  // Memory
  'm': { command: 'memoryRecall', params: [] },
  'Shift+M': { command: 'memoryAdd', params: [] },
  'Alt+M': { command: 'memorySubtract', params: [] },
  'Ctrl+M': { command: 'memoryClear', params: [] }
};
```

---

## Event Delegation

### Why Event Delegation?

- Single event listener for entire document
- Better performance (no button-specific listeners)
- Handles dynamically added buttons
- Simpler cleanup

### Implementation Pattern

```javascript
document.addEventListener('keydown', (event) => {
  const signature = getKeySignature(event);
  const command = KEY_COMMANDS[signature];
  
  if (command && !isInputFieldFocused()) {
    event.preventDefault();
    calculator[command.command](...command.params);
  }
});
```

---

## Input Field Handling

### Problem

Keyboard shortcuts shouldn't fire when typing in text input.

### Solution

```javascript
function isInputFieldFocused() {
  const active = document.activeElement;
  return (
    active.tagName === 'INPUT' ||
    active.tagName === 'TEXTAREA' ||
    active.isContentEditable
  );
}
```

### Exceptions

- **Enter**: Submit form / calculate (allow)
- **Escape**: Close modal / clear (allow)

---

## Accessibility

### Screen Reader Announcements

When keyboard shortcut executed:

1. Action executed silently
2. Display update triggers ARIA live region
3. Screen reader announces result

### Visual Feedback

- Highlight button when keyboard shortcut pressed
- Brief animation (150ms)
- Helps users understand mapping

---

## Usage Example

```javascript
const calculator = new Calculator();
const keyboardHandler = new KeyboardHandler(calculator);

// Enable handling
keyboardHandler.enable();

// Temporarily disable (e.g., modal open)
modal.on('open', () => keyboardHandler.disable());
modal.on('close', () => keyboardHandler.enable());

// Check key signature
const event = new KeyboardEvent('keydown', { key: 'M', shiftKey: true });
const sig = keyboardHandler.getKeySignature(event);
console.log(sig); // "Shift+M"
```

---

## Testing

### Unit Tests

- Verify all keys mapped correctly
- Test modifier combinations (Shift, Ctrl, Alt)
- Test input field focus blocking
- Test enable/disable

### E2E Tests

```javascript
test('keyboard shortcuts execute commands', async () => {
  await page.keyboard.press('5');
  await page.keyboard.press('+');
  await page.keyboard.press('3');
  await page.keyboard.press('Enter');
  
  const result = await page.textContent('.display__result');
  expect(result).toBe('8');
});
```

---

## Constitution Alignment

- **UX First**: Power users can work without mouse
- **Accessibility**: Keyboard-only navigation fully supported
- **Clean Code**: Command pattern, single responsibility
- **Performance**: Event delegation (1 listener vs. 30+)
