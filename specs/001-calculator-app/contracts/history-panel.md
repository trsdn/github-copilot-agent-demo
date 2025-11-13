# History Panel Contract

**Component**: HistoryPanel  
**Purpose**: Side panel/drawer displaying calculation history  
**Phase**: Phase 1 - Design

## Component Structure

```
Desktop (>900px):                 Mobile (<900px):
┌──────────┬───────────┐         ┌────────────────┐
│ History  │ Calculator│         │ Calculator     │
│ Panel    │           │         │                │
│          │           │         │ [History btn]  │
│ 5+3 = 8  │           │         └────────────────┘
│ 12*2 = 24│           │         
│ ...      │           │         ┌────────────────┐ (drawer)
└──────────┴───────────┘         │ History        │
                                 │ 5+3 = 8        │
                                 │ 12*2 = 24      │
                                 └────────────────┘
```

---

## Props

### `entries: HistoryEntry[]`

**Type**: Array of HistoryEntry  
**Required**: Yes  
**Description**: Calculation history entries to display

**Structure**:

```typescript
interface HistoryEntry {
  id: string;
  expression: string;
  result: number;
  timestamp: number;
  isError: boolean;
}
```

---

### `isCollapsed: boolean`

**Type**: Boolean  
**Required**: No (default: false on desktop, true on mobile)  
**Description**: Whether panel is collapsed/hidden

**Behavior**:

- Desktop: Side panel visible by default
- Mobile: Drawer hidden by default (toggle button)

---

### `maxEntries: number`

**Type**: Number  
**Required**: No (default: 100)  
**Description**: Maximum history entries to display

---

## Methods

### `toggle(): void`

**Purpose**: Toggle panel visibility

**Behavior**:

- If `isCollapsed`, expand panel
- If expanded, collapse panel
- Animate transition (300ms slide)
- Update ARIA expanded state

---

### `clear(): void`

**Purpose**: Clear all history entries

**Behavior**:

- Remove all entries from `entries` array
- Clear from storage
- Show empty state message
- Emit `onClear` event

---

### `selectEntry(id: string): void`

**Purpose**: Handle entry selection/click

**Parameters**:

- `id`: HistoryEntry UUID

**Behavior**:

- Find entry by id
- Load `result` into calculator display
- Emit `onSelect` event
- Collapse panel on mobile

---

## Events

### `onSelect(entry: HistoryEntry)`

**Emitted**: When user clicks/taps a history entry

**Payload**: Selected HistoryEntry object

**Use Case**: Load result into calculator display

---

### `onClear()`

**Emitted**: When user clears all history

**Use Case**: Persist empty history to storage

---

## Layout

### Desktop (>900px)

- Position: Fixed left sidebar
- Width: 250-300px
- Height: 100vh
- Scroll: Vertical auto (if > viewport)
- Background: `--color-bg-secondary` (light gray)

### Mobile (<900px)

- Position: Fixed drawer (bottom or right)
- Width: 100% (bottom) or 80vw (right)
- Height: 60vh (bottom) or 100vh (right)
- Transition: Slide in/out 300ms ease
- Backdrop: Semi-transparent overlay

---

## Entry Rendering

### Single Entry Structure

```html
<article class="history-entry" role="button" tabindex="0">
  <div class="history-entry__expression">
    5 + 3
  </div>
  <div class="history-entry__result">
    = 8
  </div>
  <time class="history-entry__time">
    2:34 PM
  </time>
</article>
```

### Styling

- Font: 14px monospace
- Padding: 12px
- Border: Bottom 1px solid divider
- Hover: Background highlight
- Focus: Outline for keyboard nav

---

## Empty State

When `entries.length === 0`:

```html
<div class="history-panel__empty">
  <p>No calculations yet</p>
  <p class="muted">Your history will appear here</p>
</div>
```

---

## Accessibility

### ARIA Attributes

```html
<aside 
  class="history-panel" 
  role="complementary"
  aria-label="Calculation history"
  aria-expanded="true"
>
  <h2 id="history-heading">History</h2>
  
  <button 
    class="history-panel__clear"
    aria-label="Clear all history"
  >
    Clear All
  </button>
  
  <div 
    class="history-panel__entries" 
    role="list"
    aria-labelledby="history-heading"
  >
    <!-- Entries here -->
  </div>
</aside>
```

### Keyboard Navigation

- **Tab**: Navigate between entries
- **Enter/Space**: Select focused entry
- **Escape**: Close panel (mobile)
- **Delete**: Clear focused entry (optional)

---

## Persistence

- Save to LocalStorage on every change
- Load on component mount
- Max 100 entries (prune oldest)
- Storage key: `calculator_history`

---

## Usage Example

```javascript
const historyPanel = new HistoryPanel({
  entries: [],
  isCollapsed: window.innerWidth < 900,
  maxEntries: 100
});

// Listen for selection
historyPanel.on('select', (entry) => {
  calculator.loadResult(entry.result);
});

// Add new calculation
historyPanel.addEntry({
  id: crypto.randomUUID(),
  expression: '5 + 3',
  result: 8,
  timestamp: Date.now(),
  isError: false
});

// Toggle visibility (mobile)
historyPanel.toggle();
```

---

## Constitution Alignment

- **UX First**: Quick access to previous calculations, smooth animations
- **Accessibility**: ARIA regions, keyboard navigation, semantic HTML
- **Responsive**: Adaptive layout (side panel → drawer)
- **Performance**: Virtual scrolling for large lists (100+ entries)
