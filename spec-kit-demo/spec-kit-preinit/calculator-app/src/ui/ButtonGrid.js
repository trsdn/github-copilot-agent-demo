/**
 * Button Grid Component
 * Renders the calculator button layout
 * @module ui/ButtonGrid
 */

import { OPERATORS } from '../config/constants.js';

/**
 * Calculator button grid component
 */
export class ButtonGrid {
  /**
   * @param {HTMLElement} container - Container element for the buttons
   * @param {Object} handlers - Event handlers for button clicks
   */
  constructor(container, handlers = {}) {
    this.container = container;
    this.handlers = handlers;
    this._render();
    this._attachEventListeners();
  }

  /**
   * Render the button grid HTML structure
   * @private
   */
  _render() {
    this.container.innerHTML = `
      <div class="calculator-buttons" role="group" aria-label="Calculator buttons">
        <!-- Memory buttons row -->
        <div class="button-row memory-row">
          <button class="btn btn-memory" data-action="memory-clear" aria-label="Memory clear">MC</button>
          <button class="btn btn-memory" data-action="memory-recall" aria-label="Memory recall">MR</button>
          <button class="btn btn-memory" data-action="memory-add" aria-label="Memory add">M+</button>
          <button class="btn btn-memory" data-action="memory-subtract" aria-label="Memory subtract">M-</button>
        </div>

        <!-- First row: Clear and backspace -->
        <div class="button-row">
          <button class="btn btn-function" data-action="all-clear" aria-label="All clear">AC</button>
          <button class="btn btn-function" data-action="clear" aria-label="Clear">C</button>
          <button class="btn btn-function" data-action="backspace" aria-label="Backspace">⌫</button>
          <button class="btn btn-operator" data-action="divide" aria-label="Divide">${OPERATORS.DIVIDE}</button>
        </div>

        <!-- Second row: 7-9, multiply -->
        <div class="button-row">
          <button class="btn btn-digit" data-digit="7" aria-label="7">7</button>
          <button class="btn btn-digit" data-digit="8" aria-label="8">8</button>
          <button class="btn btn-digit" data-digit="9" aria-label="9">9</button>
          <button class="btn btn-operator" data-action="multiply" aria-label="Multiply">${OPERATORS.MULTIPLY}</button>
        </div>

        <!-- Third row: 4-6, subtract -->
        <div class="button-row">
          <button class="btn btn-digit" data-digit="4" aria-label="4">4</button>
          <button class="btn btn-digit" data-digit="5" aria-label="5">5</button>
          <button class="btn btn-digit" data-digit="6" aria-label="6">6</button>
          <button class="btn btn-operator" data-action="subtract" aria-label="Subtract">${OPERATORS.SUBTRACT}</button>
        </div>

        <!-- Fourth row: 1-3, add -->
        <div class="button-row">
          <button class="btn btn-digit" data-digit="1" aria-label="1">1</button>
          <button class="btn btn-digit" data-digit="2" aria-label="2">2</button>
          <button class="btn btn-digit" data-digit="3" aria-label="3">3</button>
          <button class="btn btn-operator" data-action="add" aria-label="Add">${OPERATORS.ADD}</button>
        </div>

        <!-- Fifth row: 0, decimal, equals -->
        <div class="button-row">
          <button class="btn btn-digit btn-wide" data-digit="0" aria-label="0">0</button>
          <button class="btn btn-function" data-action="decimal" aria-label="Decimal point">.</button>
          <button class="btn btn-equals" data-action="equals" aria-label="Equals">=</button>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners to buttons
   * @private
   */
  _attachEventListeners() {
    // Use event delegation for better performance
    this.container.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) {
        return;
      }

      // Prevent default and stop propagation
      event.preventDefault();

      // Get action type
      if (button.dataset.digit !== undefined) {
        this._handleDigit(button.dataset.digit);
      } else if (button.dataset.action) {
        this._handleAction(button.dataset.action);
      }

      // Add visual feedback
      this._addButtonFeedback(button);
    });
  }

  /**
   * Handle digit button click
   * @private
   * @param {string} digit
   */
  _handleDigit(digit) {
    if (this.handlers.onDigit) {
      this.handlers.onDigit(digit);
    }
  }

  /**
   * Handle action button click
   * @private
   * @param {string} action
   */
  _handleAction(action) {
    const actionMap = {
      'add': () => this.handlers.onOperator?.(OPERATORS.ADD),
      'subtract': () => this.handlers.onOperator?.(OPERATORS.SUBTRACT),
      'multiply': () => this.handlers.onOperator?.(OPERATORS.MULTIPLY),
      'divide': () => this.handlers.onOperator?.(OPERATORS.DIVIDE),
      'equals': () => this.handlers.onEquals?.(),
      'clear': () => this.handlers.onClear?.(),
      'all-clear': () => this.handlers.onAllClear?.(),
      'backspace': () => this.handlers.onBackspace?.(),
      'decimal': () => this.handlers.onDecimal?.(),
      'memory-add': () => this.handlers.onMemoryAdd?.(),
      'memory-subtract': () => this.handlers.onMemorySubtract?.(),
      'memory-recall': () => this.handlers.onMemoryRecall?.(),
      'memory-clear': () => this.handlers.onMemoryClear?.(),
    };

    const handler = actionMap[action];
    if (handler) {
      handler();
    }
  }

  /**
   * Add visual feedback to button press
   * @private
   * @param {HTMLElement} button
   */
  _addButtonFeedback(button) {
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 150);
  }

  /**
   * Update memory indicator
   * @param {boolean} hasMemory - Whether memory has a value
   */
  updateMemoryIndicator(hasMemory) {
    const memoryButtons = this.container.querySelectorAll('.btn-memory');
    memoryButtons.forEach((button) => {
      if (hasMemory) {
        button.classList.add('has-memory');
      } else {
        button.classList.remove('has-memory');
      }
    });
  }

  /**
   * Enable/disable buttons
   * @param {boolean} enabled
   */
  setEnabled(enabled) {
    const buttons = this.container.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = !enabled;
    });
  }

  /**
   * Get the button grid element
   * @returns {HTMLElement}
   */
  getElement() {
    return this.container.querySelector('.calculator-buttons');
  }
}
