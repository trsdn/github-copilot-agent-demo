# Data Model: Calculator State & Entities

**Date**: 2025-11-13  
**Feature**: Web-Based Calculator (001-calculator-app)  
**Phase**: Phase 1 - Design & Contracts

## Overview

This document defines the data structures, state machine, and entity relationships for the calculator application. All entities support the functional requirements and user stories defined in spec.md.

---

## Core Entities

### 1. CalculatorState

**Purpose**: Represents the current state of the calculator including display, pending operations, and memory.

**Properties**:

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `currentValue` | Number | Currently displayed number | 0 |
| `previousValue` | Number\|null | Previous operand in calculation | null |
| `pendingOperator` | String\|null | Pending operator (+, -, *, /) | null |
| `displayText` | String | Formatted display text | "0" |
| `expressionText` | String | Full expression for secondary display | "" |
| `memoryValue` | Number | Memory register value | 0 |
| `isError` | Boolean | Whether display shows error | false |
| `errorMessage` | String\|null | Current error message | null |
| `lastResult` | Number\|null | Last calculated result | null |
| `inputMode` | Enum | Current input mode | InputMode.NUMBER |
| `isNewInput` | Boolean | Whether next digit starts new number | true |

**Enum: InputMode**:
- `NUMBER`: Accepting number input
- `OPERATOR`: Operator just pressed, awaiting next number
- `RESULT`: Calculation complete, result displayed
- `ERROR`: Error state, awaiting clear

**State Transitions**:

```
Initial State (NUMBER, 0)
  ↓ [digit input]
NUMBER (accumulating input)
  ↓ [operator pressed]
OPERATOR (pendingOperator set)
  ↓ [digit input]
NUMBER (accumulating second operand)
  ↓ [equals pressed]
RESULT (calculation complete)
  ↓ [operator pressed]
OPERATOR (continue with result)
  ↓ [clear pressed]
NUMBER (reset to initial)

ERROR (division by zero, overflow)
  ↓ [any input or clear]
NUMBER (error cleared, reset)
```

**Methods**:

```javascript
class CalculatorState {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.currentValue = 0;
    this.previousValue = null;
    this.pendingOperator = null;
    this.displayText = "0";
    this.expressionText = "";
    this.memoryValue = 0;
    this.isError = false;
    this.errorMessage = null;
    this.lastResult = null;
    this.inputMode = InputMode.NUMBER;
    this.isNewInput = true;
  }
  
  clear() {
    // Clear current entry (C function)
    this.currentValue = 0;
    this.displayText = "0";
    this.isNewInput = true;
    if (this.isError) {
      this.isError = false;
      this.errorMessage = null;
    }
  }
  
  allClear() {
    // Reset everything (AC function)
    this.reset();
  }
  
  setError(message) {
    this.isError = true;
    this.errorMessage = message;
    this.displayText = message;
    this.inputMode = InputMode.ERROR;
  }
  
  clearError() {
    if (this.isError) {
      this.isError = false;
      this.errorMessage = null;
      this.currentValue = 0;
      this.displayText = "0";
      this.inputMode = InputMode.NUMBER;
    }
  }
  
  toJSON() {
    // For testing/debugging
    return {
      currentValue: this.currentValue,
      previousValue: this.previousValue,
      pendingOperator: this.pendingOperator,
      displayText: this.displayText,
      expressionText: this.expressionText,
      memoryValue: this.memoryValue,
      isError: this.isError,
      inputMode: this.inputMode
    };
  }
}
```

---

### 2. HistoryEntry

**Purpose**: Represents a single calculation in the history panel.

**Properties**:

| Property | Type | Description | Constraints |
|----------|------|-------------|-------------|
| `id` | String | Unique identifier | UUID v4 |
| `expression` | String | Full calculation expression | e.g., "5 + 3" |
| `result` | Number | Calculation result | 10 decimal places max |
| `timestamp` | Number | Unix timestamp (ms) | Date.now() |
| `formattedTime` | String | Human-readable time | "2:45 PM" |

**Methods**:

```javascript
class HistoryEntry {
  constructor(expression, result) {
    this.id = this.generateId();
    this.expression = expression;
    this.result = result;
    this.timestamp = Date.now();
    this.formattedTime = this.formatTime();
  }
  
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  formatTime() {
    const date = new Date(this.timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  }
  
  toString() {
    return `${this.expression} = ${this.result}`;
  }
  
  toJSON() {
    return {
      id: this.id,
      expression: this.expression,
      result: this.result,
      timestamp: this.timestamp
    };
  }
  
  static fromJSON(json) {
    const entry = new HistoryEntry(json.expression, json.result);
    entry.id = json.id;
    entry.timestamp = json.timestamp;
    entry.formattedTime = entry.formatTime();
    return entry;
  }
}
```

---

### 3. CalculationHistory

**Purpose**: Manages collection of history entries with persistence.

**Properties**:

| Property | Type | Description | Constraints |
|----------|------|-------------|-------------|
| `entries` | Array<HistoryEntry> | History entries | Max 100 entries |
| `maxEntries` | Number | Maximum entries to keep | 100 (per A-006) |
| `storage` | LocalStorageAdapter | Storage backend | Injected dependency |

**Methods**:

```javascript
class CalculationHistory {
  constructor(storage, maxEntries = 100) {
    this.storage = storage;
    this.maxEntries = maxEntries;
    this.entries = this.load();
  }
  
  add(expression, result) {
    const entry = new HistoryEntry(expression, result);
    this.entries.unshift(entry); // Add to front (most recent first)
    
    // Enforce max entries limit
    if (this.entries.length > this.maxEntries) {
      this.entries = this.entries.slice(0, this.maxEntries);
    }
    
    this.save();
    return entry;
  }
  
  clear() {
    this.entries = [];
    this.save();
  }
  
  getAll() {
    return [...this.entries]; // Return copy
  }
  
  getById(id) {
    return this.entries.find(entry => entry.id === id);
  }
  
  load() {
    const data = this.storage.load();
    return data.map(json => HistoryEntry.fromJSON(json));
  }
  
  save() {
    const data = this.entries.map(entry => entry.toJSON());
    this.storage.save(data);
  }
  
  getRecentEntries(count = 10) {
    return this.entries.slice(0, count);
  }
}
```

---

### 4. MemoryRegister

**Purpose**: Manages memory functions (M+, M-, MR, MC).

**Properties**:

| Property | Type | Description | Constraints |
|----------|------|-------------|-------------|
| `value` | Number | Stored memory value | Default: 0 |
| `hasValue` | Boolean | Whether memory contains non-zero value | Computed |

**Methods**:

```javascript
class MemoryRegister {
  constructor() {
    this.value = 0;
  }
  
  add(number) {
    this.value += number;
  }
  
  subtract(number) {
    this.value -= number;
  }
  
  recall() {
    return this.value;
  }
  
  clear() {
    this.value = 0;
  }
  
  get hasValue() {
    return this.value !== 0;
  }
  
  toJSON() {
    return { value: this.value };
  }
}
```

---

## State Machine Diagram

```
┌─────────────┐
│   INITIAL   │
│  (value: 0) │
└──────┬──────┘
       │ digit input
       ▼
┌─────────────┐
│   NUMBER    │◄─────┐
│ (entering)  │      │ digit input
└──────┬──────┘      │
       │             │
       │ operator    │
       ▼             │
┌─────────────┐      │
│  OPERATOR   │      │
│ (pending)   │      │
└──────┬──────┘      │
       │             │
       │ digit input │
       └─────────────┘
       │
       │ equals
       ▼
┌─────────────┐
│   RESULT    │
│ (complete)  │
└──────┬──────┘
       │
       ├─ operator ──→ OPERATOR (continue)
       ├─ digit ─────→ NUMBER (new calc)
       └─ clear ─────→ INITIAL
       
       
┌─────────────┐
│    ERROR    │
│ (div by 0)  │
└──────┬──────┘
       │
       └─ any input ──→ NUMBER (cleared)
```

---

## Data Validation Rules

### Number Input Validation

| Rule | Description | Example |
|------|-------------|---------|
| **Max Length** | 15 significant digits (JavaScript Number limit) | 123456789012345 |
| **Decimal Points** | Only one decimal point per number | 12.34 ✅, 12.3.4 ❌ |
| **Leading Zeros** | Strip leading zeros except for "0." | 007 → 7, 0.7 → 0.7 |
| **Display Precision** | Round to 10 decimal places for display | 0.1234567890123 → 0.1234567890 |
| **Negative Zero** | Normalize -0 to 0 | -0 → 0 |

### Operation Validation

| Rule | Description | Error Message |
|------|-------------|---------------|
| **Division by Zero** | Denominator cannot be 0 | "Cannot divide by zero" |
| **Overflow** | Result exceeds Number.MAX_SAFE_INTEGER | "Overflow" |
| **Underflow** | Result below Number.MIN_SAFE_INTEGER | "Underflow" |
| **Invalid Expression** | Malformed expression | "Invalid input" |

### History Validation

| Rule | Description | Action |
|------|-------------|--------|
| **Max Entries** | Limit to 100 entries | Auto-prune oldest when exceeded |
| **Storage Quota** | LocalStorage quota exceeded | Prune entries and retry |
| **Invalid JSON** | Corrupted storage data | Clear and start fresh |

---

## Entity Relationships

```
┌──────────────────┐
│   Calculator     │
│   (Main App)     │
└────────┬─────────┘
         │
         ├─── has ──→ CalculatorState (1:1)
         │
         ├─── has ──→ MemoryRegister (1:1)
         │
         ├─── has ──→ CalculationHistory (1:1)
         │                    │
         │                    │ contains (1:N)
         │                    ▼
         │           ┌──────────────┐
         │           │ HistoryEntry │
         │           └──────────────┘
         │
         └─── uses ──→ LocalStorageAdapter (1:1)
```

---

## Storage Schema

### LocalStorage Key: `calculator_history`

**Format**: JSON array of HistoryEntry objects

**Schema**:

```json
[
  {
    "id": "1731513600000-abc123def",
    "expression": "5 + 3",
    "result": 8,
    "timestamp": 1731513600000
  },
  {
    "id": "1731513500000-xyz789ghi",
    "expression": "12 ÷ 4",
    "result": 3,
    "timestamp": 1731513500000
  }
]
```

**Size Estimate**:
- Per entry: ~100 bytes
- 100 entries: ~10 KB
- Well within LocalStorage quota (5-10 MB)

---

## Data Flow Example: Basic Calculation "5 + 3 ="

1. **Initial State**:
   ```javascript
   {
     currentValue: 0,
     previousValue: null,
     pendingOperator: null,
     displayText: "0",
     expressionText: "",
     inputMode: InputMode.NUMBER
   }
   ```

2. **User presses "5"**:
   ```javascript
   {
     currentValue: 5,
     displayText: "5",
     expressionText: "5",
     inputMode: InputMode.NUMBER
   }
   ```

3. **User presses "+"**:
   ```javascript
   {
     currentValue: 5,
     previousValue: 5,
     pendingOperator: "+",
     displayText: "5",
     expressionText: "5 +",
     inputMode: InputMode.OPERATOR
   }
   ```

4. **User presses "3"**:
   ```javascript
   {
     currentValue: 3,
     previousValue: 5,
     pendingOperator: "+",
     displayText: "3",
     expressionText: "5 + 3",
     inputMode: InputMode.NUMBER
   }
   ```

5. **User presses "="**:
   ```javascript
   {
     currentValue: 8,
     previousValue: null,
     pendingOperator: null,
     displayText: "8",
     expressionText: "5 + 3",
     lastResult: 8,
     inputMode: InputMode.RESULT
   }
   ```

6. **HistoryEntry created**:
   ```javascript
   {
     id: "1731513600000-abc123def",
     expression: "5 + 3",
     result: 8,
     timestamp: 1731513600000,
     formattedTime: "2:40 PM"
   }
   ```

---

## Next Steps

- ✅ Data model defined
- **Next**: Create contracts/ for component interfaces
- **Then**: Generate quickstart.md for developer setup

