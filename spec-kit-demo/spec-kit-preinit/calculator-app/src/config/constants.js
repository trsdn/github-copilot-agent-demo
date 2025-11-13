/**
 * Application constants and configuration
 * @module config/constants
 */

/**
 * Calculator operation symbols
 */
export const OPERATORS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '×',
  DIVIDE: '÷',
};

/**
 * Operator precedence levels (higher = evaluated first)
 */
export const PRECEDENCE = {
  [OPERATORS.ADD]: 1,
  [OPERATORS.SUBTRACT]: 1,
  [OPERATORS.MULTIPLY]: 2,
  [OPERATORS.DIVIDE]: 2,
};

/**
 * Display limits and formatting
 */
export const DISPLAY = {
  MAX_DIGITS: 15,
  MIN_SCIENTIFIC: 1e-15,
  MAX_SCIENTIFIC: 1e15,
  DECIMAL_PLACES: 10,
};

/**
 * Memory operation types
 */
export const MEMORY_OPS = {
  ADD: 'M+',
  SUBTRACT: 'M-',
  RECALL: 'MR',
  CLEAR: 'MC',
};

/**
 * Keyboard mappings for calculator operations
 */
export const KEY_MAPPINGS = {
  // Digits
  '0': 'digit-0',
  '1': 'digit-1',
  '2': 'digit-2',
  '3': 'digit-3',
  '4': 'digit-4',
  '5': 'digit-5',
  '6': 'digit-6',
  '7': 'digit-7',
  '8': 'digit-8',
  '9': 'digit-9',

  // Decimal point
  '.': 'decimal',
  ',': 'decimal', // Alternative decimal separator

  // Operators
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  '×': 'multiply',
  '÷': 'divide',

  // Actions
  'Enter': 'equals',
  '=': 'equals',
  'Escape': 'clear',
  'c': 'clear',
  'C': 'all-clear',
  'Backspace': 'backspace',
  'Delete': 'backspace',

  // Memory operations (with modifiers)
  'm': 'memory', // Base key, modified by Shift/Ctrl/Alt
};

/**
 * Memory operation modifiers
 */
export const MEMORY_MODIFIERS = {
  NONE: 'MR', // Just 'm' = Memory Recall
  SHIFT: 'M+', // Shift+m = Memory Add
  CTRL: 'M-', // Ctrl+m = Memory Subtract
  ALT: 'MC', // Alt+m = Memory Clear
};

/**
 * Calculator state machine states
 */
export const CALCULATOR_STATES = {
  INITIAL: 'initial',
  OPERAND_ENTRY: 'operand_entry',
  OPERATOR_SELECTED: 'operator_selected',
  RESULT_DISPLAYED: 'result_displayed',
  ERROR: 'error',
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  DIVISION_BY_ZERO: 'Cannot divide by zero',
  OVERFLOW: 'Overflow',
  UNDERFLOW: 'Underflow',
  INVALID_OPERATION: 'Invalid operation',
  INVALID_INPUT: 'Invalid input',
};

/**
 * Storage keys for LocalStorage
 */
export const STORAGE_KEYS = {
  HISTORY: 'calculator_history',
  MEMORY: 'calculator_memory',
  THEME: 'calculator_theme',
};

/**
 * History configuration
 */
export const HISTORY = {
  MAX_ENTRIES: 100,
  STORAGE_QUOTA_MB: 5,
};

/**
 * Accessibility configuration
 */
export const ACCESSIBILITY = {
  MIN_TOUCH_TARGET: 44, // Minimum touch target size in pixels (WCAG 2.1 AA)
  DEBOUNCE_DELAY: 300, // Debounce delay for rapid input in ms
  ANNOUNCEMENT_DELAY: 100, // Delay before screen reader announcement in ms
};

/**
 * Performance thresholds (from spec.md success criteria)
 */
export const PERFORMANCE = {
  MAX_LOAD_TIME_MS: 1000, // SC-002: <1s on 3G
  MAX_CALCULATION_TIME_MS: 16, // SC-005: <16ms execution
  MAX_BUNDLE_SIZE_KB: 50, // SC-006: <50KB gzipped
};

/**
 * Theme configuration
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

/**
 * Responsive breakpoints
 */
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
};

/**
 * Animation durations (ms)
 */
export const ANIMATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 400,
};
