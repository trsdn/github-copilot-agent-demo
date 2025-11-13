# Storage Contract

**Interface**: StorageService  
**Purpose**: Persistent storage abstraction for calculation history and memory  
**Phase**: Phase 1 - Design

## Public Interface

### Methods

#### `isAvailable(): boolean`

**Purpose**: Check if LocalStorage is available

**Returns**: `true` if LocalStorage supported and enabled, `false` otherwise

**Behavior**:

- Test by writing/reading a test key
- Handle SecurityError (private browsing)
- Handle QuotaExceededError

---

#### `saveHistory(history: CalculationHistory): void`

**Purpose**: Persist calculation history to LocalStorage

**Parameters**:

- `history`: CalculationHistory instance

**Behavior**:

- Serialize history to JSON
- Store under key `calculator_history`
- If storage unavailable, fail silently
- If quota exceeded, prune oldest entries first

**Storage Format**:

```json
{
  "version": "1.0",
  "entries": [
    {
      "id": "uuid-v4",
      "expression": "5 + 3",
      "result": 8,
      "timestamp": 1699876543210,
      "isError": false
    }
  ]
}
```

---

#### `loadHistory(): CalculationHistory | null`

**Purpose**: Load calculation history from LocalStorage

**Returns**: CalculationHistory instance or null if unavailable

**Behavior**:

- Read from key `calculator_history`
- Parse JSON and validate schema
- Handle parse errors gracefully
- Return null if no data exists

---

#### `saveMemory(value: number): void`

**Purpose**: Persist memory register value

**Parameters**:

- `value`: Current memory value

**Behavior**:

- Store under key `calculator_memory`
- Serialize as JSON: `{ "value": 42 }`

---

#### `loadMemory(): number`

**Purpose**: Load memory register value

**Returns**: Memory value (default 0 if unavailable)

---

#### `clear(): void`

**Purpose**: Clear all calculator data from storage

**Behavior**:

- Remove `calculator_history` key
- Remove `calculator_memory` key
- Do NOT clear other app data

---

## Error Handling

### QuotaExceededError

When storage quota exceeded:

1. Remove oldest history entry
2. Retry save operation
3. Repeat until successful or max 10 attempts
4. Emit warning event if pruning occurs

### SecurityError

When LocalStorage blocked (private browsing):

1. Set internal flag `storageAvailable = false`
2. All save operations become no-ops
3. All load operations return defaults

---

## Constants

```javascript
const STORAGE_KEYS = {
  HISTORY: 'calculator_history',
  MEMORY: 'calculator_memory'
};

const MAX_HISTORY_SIZE = 100; // entries
const STORAGE_VERSION = '1.0';
```

---

## Usage Example

```javascript
const storage = new StorageService();

if (storage.isAvailable()) {
  // Save history
  const history = new CalculationHistory();
  storage.saveHistory(history);

  // Load on startup
  const loadedHistory = storage.loadHistory();
}
```

---

## Constitution Alignment

- **Performance**: Minimize JSON parse/stringify overhead (< 5ms)
- **Progressive Enhancement**: Graceful degradation when unavailable
- **Clean Code**: Single responsibility (storage only)
