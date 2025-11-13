/**
 * Keyboard Handler
 * Implements keyboard support as specified in contracts/keyboard-handler.md
 * @module input/KeyboardHandler
 */

import { KEY_MAPPINGS, MEMORY_MODIFIERS, OPERATORS } from '../config/constants.js';

/**
 * Handles keyboard input for the calculator
 */
export class KeyboardHandler {
  /**
   * @param {Object} handlers - Event handlers for different actions
   */
  constructor(handlers = {}) {
    this.handlers = handlers;
    this.isEnabled = true;
    this._attachEventListener();
  }

  /**
   * Attach keyboard event listener
   * @private
   */
  _attachEventListener() {
    document.addEventListener('keydown', (event) => {
      if (!this.isEnabled) {
        return;
      }

      // Only handle keys when not in an input field
      if (this._isInputFocused()) {
        return;
      }

      const handled = this._handleKeyPress(event);
      
      if (handled) {
        event.preventDefault();
      }
    });
  }

  /**
   * Check if an input field is currently focused
   * @private
   * @returns {boolean}
   */
  _isInputFocused() {
    const activeElement = document.activeElement;
    const tagName = activeElement?.tagName?.toLowerCase();
    return tagName === 'input' || tagName === 'textarea' || activeElement?.isContentEditable;
  }

  /**
   * Handle a key press event
   * @private
   * @param {KeyboardEvent} event
   * @returns {boolean} True if key was handled
   */
  _handleKeyPress(event) {
    const key = event.key;

    // Check for memory operations with modifiers
    if (key.toLowerCase() === 'm') {
      return this._handleMemoryKey(event);
    }

    // Check regular key mappings
    const action = KEY_MAPPINGS[key];
    
    if (!action) {
      return false;
    }

    // Handle digit keys
    if (action.startsWith('digit-')) {
      const digit = action.replace('digit-', '');
      this.handlers.onDigit?.(digit);
      return true;
    }

    // Handle decimal point
    if (action === 'decimal') {
      this.handlers.onDecimal?.();
      return true;
    }

    // Handle operators
    const operatorMap = {
      'add': OPERATORS.ADD,
      'subtract': OPERATORS.SUBTRACT,
      'multiply': OPERATORS.MULTIPLY,
      'divide': OPERATORS.DIVIDE,
    };

    if (operatorMap[action]) {
      this.handlers.onOperator?.(operatorMap[action]);
      return true;
    }

    // Handle other actions
    const actionHandlers = {
      'equals': () => this.handlers.onEquals?.(),
      'clear': () => this.handlers.onClear?.(),
      'all-clear': () => this.handlers.onAllClear?.(),
      'backspace': () => this.handlers.onBackspace?.(),
    };

    const handler = actionHandlers[action];
    if (handler) {
      handler();
      return true;
    }

    return false;
  }

  /**
   * Handle memory key with modifiers
   * @private
   * @param {KeyboardEvent} event
   * @returns {boolean} True if handled
   */
  _handleMemoryKey(event) {
    let operation;

    if (event.shiftKey) {
      operation = MEMORY_MODIFIERS.SHIFT; // M+
    } else if (event.ctrlKey || event.metaKey) {
      operation = MEMORY_MODIFIERS.CTRL; // M-
    } else if (event.altKey) {
      operation = MEMORY_MODIFIERS.ALT; // MC
    } else {
      operation = MEMORY_MODIFIERS.NONE; // MR
    }

    const memoryHandlers = {
      'MR': () => this.handlers.onMemoryRecall?.(),
      'M+': () => this.handlers.onMemoryAdd?.(),
      'M-': () => this.handlers.onMemorySubtract?.(),
      'MC': () => this.handlers.onMemoryClear?.(),
    };

    const handler = memoryHandlers[operation];
    if (handler) {
      handler();
      return true;
    }

    return false;
  }

  /**
   * Enable keyboard handling
   */
  enable() {
    this.isEnabled = true;
  }

  /**
   * Disable keyboard handling
   */
  disable() {
    this.isEnabled = false;
  }

  /**
   * Get help text for keyboard shortcuts
   * @returns {Object} Keyboard shortcut documentation
   */
  getShortcutsHelp() {
    return {
      digits: {
        description: 'Number keys 0-9',
        keys: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
      decimal: {
        description: 'Decimal point',
        keys: ['.', ','],
      },
      operators: {
        description: 'Arithmetic operators',
        shortcuts: [
          { key: '+', action: 'Addition' },
          { key: '-', action: 'Subtraction' },
          { key: '* or ×', action: 'Multiplication' },
          { key: '/ or ÷', action: 'Division' },
        ],
      },
      actions: {
        description: 'Calculator actions',
        shortcuts: [
          { key: 'Enter or =', action: 'Calculate result' },
          { key: 'Escape or c', action: 'Clear current entry' },
          { key: 'Shift+C', action: 'Clear all (AC)' },
          { key: 'Backspace or Delete', action: 'Delete last digit' },
        ],
      },
      memory: {
        description: 'Memory operations',
        shortcuts: [
          { key: 'm', action: 'Memory Recall (MR)' },
          { key: 'Shift+m', action: 'Memory Add (M+)' },
          { key: 'Ctrl+m', action: 'Memory Subtract (M-)' },
          { key: 'Alt+m', action: 'Memory Clear (MC)' },
        ],
      },
    };
  }
}
