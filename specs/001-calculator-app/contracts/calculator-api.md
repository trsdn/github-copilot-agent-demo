# Calculator Core Contract

**Interface**: Calculator  
**Purpose**: Main calculator logic and operation execution  
**Phase**: Phase 1 - Design

## Public Interface

### Methods

#### `inputDigit(digit: string): void`

**Purpose**: Handle numeric digit input (0-9)

**Parameters**:
- `digit`: String representation of digit ("0" through "9")

**Behavior**:
- If in ERROR mode, clear error first
- If `isNewInput` is true, replace current value
- Otherwise, append digit to current value
- Update `displayText` and `expressionText`
- Validate max 15 significant digits

**Throws**: None (validates input)

---

#### `inputDecimal(): void`

**Purpose**: Handle decimal point input

**Behavior**:
- Only one decimal point allowed per number
- If current value already contains ".", ignore
- Append "." to current value
- Update display

---

#### `inputOperator(operator: string): void`

**Purpose**: Handle arithmetic operator (+, -, *, /)

**Parameters**:
- `operator`: One of "+", "-", "*", "/"

**Behavior**:
- If `pendingOperator` exists, calculate intermediate result first
- Set `previousValue` to current value
- Set `pendingOperator` to operator
- Set `inputMode` to OPERATOR
- Set `isNewInput` to true
- Update expression display

---

#### `calculate(): void`

**Purpose**: Execute pending calculation (equals button)

**Behavior**:
- If no pending operator, do nothing
- Execute operation using `previousValue`, `pendingOperator`, `currentValue`
- Handle division by zero → set error state
- Handle overflow → set error state
- Round result to 10 decimal places for display
- Create history entry
- Update `lastResult`
- Clear `pendingOperator` and `previousValue`
- Set `inputMode` to RESULT

---

#### `clear(): void`

**Purpose**: Clear current entry (C button)

**Behavior**:
- Reset `currentValue` to 0
- Clear error state if present
- Keep `previousValue` and `pendingOperator` intact
- Update display to "0"

---

#### `allClear(): void`

**Purpose**: Reset calculator to initial state (AC button)

**Behavior**:
- Reset all state properties
- Clear expression display
- Do NOT clear memory or history

---

#### `backspace(): void`

**Purpose**: Delete last digit entered

**Behavior**:
- Remove last character from `displayText`
- If display becomes empty, set to "0"
- Update `currentValue`

---

### Memory Functions

#### `memoryAdd(): void`

Add current value to memory register.

#### `memorySubtract(): void`

Subtract current value from memory register.

#### `memoryRecall(): void`

Load memory value into current display.

#### `memoryClear(): void`

Reset memory register to 0.

---

## Events

### Calculator.on('stateChange', callback)

**Emitted**: Whenever calculator state changes  
**Payload**: `{ state: CalculatorState }`

### Calculator.on('calculation', callback)

**Emitted**: When calculation completes  
**Payload**: `{ expression: string, result: number }`

### Calculator.on('error', callback)

**Emitted**: When error occurs  
**Payload**: `{ message: string }`

---

## Usage Example

```javascript
const calculator = new Calculator();

// Listen for state changes
calculator.on('stateChange', ({ state }) => {
  displayComponent.update(state.displayText, state.expressionText);
});

// Perform calculation
calculator.inputDigit('5');
calculator.inputOperator('+');
calculator.inputDigit('3');
calculator.calculate(); // Result: 8
```
