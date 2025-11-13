/**
 * Main application entry point
 * Initializes and coordinates all calculator components
 * @module main
 */

import { Calculator } from './calculator/Calculator.js';
import { HistoryManager } from './state/HistoryManager.js';
import { DisplayComponent } from './ui/DisplayComponent.js';
import { ButtonGrid } from './ui/ButtonGrid.js';
import { HistoryPanel } from './ui/HistoryPanel.js';
import { KeyboardHandler } from './input/KeyboardHandler.js';
import './styles/main.css';

/**
 * Main Application class
 */
class CalculatorApp {
  constructor() {
    this.calculator = new Calculator();
    this.historyManager = new HistoryManager();
    this._initializeUI();
    this._setupEventHandlers();
    this._announceReady();
  }

  /**
   * Initialize UI components
   * @private
   */
  _initializeUI() {
    // Get container elements
    const displayContainer = document.getElementById('display-container');
    const buttonsContainer = document.getElementById('buttons-container');
    const historyContainer = document.getElementById('history-container');

    // Create components
    this.display = new DisplayComponent(displayContainer);
    this.buttons = new ButtonGrid(buttonsContainer, this._getButtonHandlers());
    this.historyPanel = new HistoryPanel(historyContainer, this._getHistoryHandlers());
    this.keyboard = new KeyboardHandler(this._getKeyboardHandlers());

    // Initial display update
    this.display.update({
      expression: '',
      result: '0',
    });

    // Initial history update
    this.historyPanel.updateHistory(this.historyManager.getHistory());
  }

  /**
   * Get button event handlers
   * @private
   * @returns {Object}
   */
  _getButtonHandlers() {
    return {
      onDigit: (digit) => this.calculator.inputDigit(digit),
      onDecimal: () => this.calculator.inputDecimal(),
      onOperator: (operator) => this.calculator.inputOperator(operator),
      onEquals: () => this.calculator.calculate(),
      onClear: () => this.calculator.clear(),
      onAllClear: () => this.calculator.allClear(),
      onBackspace: () => this.calculator.backspace(),
      onMemoryAdd: () => this.calculator.memoryAdd(),
      onMemorySubtract: () => this.calculator.memorySubtract(),
      onMemoryRecall: () => this.calculator.memoryRecall(),
      onMemoryClear: () => this.calculator.memoryClear(),
    };
  }

  /**
   * Get keyboard event handlers
   * @private
   * @returns {Object}
   */
  _getKeyboardHandlers() {
    return this._getButtonHandlers();
  }

  /**
   * Get history panel event handlers
   * @private
   * @returns {Object}
   */
  _getHistoryHandlers() {
    return {
      onSelectEntry: (entryId) => {
        const entry = this.historyManager.getEntry(entryId);
        if (entry) {
          this.calculator.state.setCurrentOperand(entry.result.toString());
          this.calculator.state.shouldResetDisplay = true;
          this.calculator._emitStateChange();
          this.historyPanel.close();
        }
      },
      onClearHistory: () => {
        if (confirm('Clear all calculation history?')) {
          this.historyManager.clear();
        }
      },
    };
  }

  /**
   * Setup event handlers
   * @private
   */
  _setupEventHandlers() {
    // Subscribe to calculator state changes
    this.calculator.onStateChange((state) => {
      this.display.update({
        expression: state.expressionDisplay,
        result: state.displayValue,
      });

      // Update memory indicator
      this.buttons.updateMemoryIndicator(state.hasMemory);

      // Clear error state if not in error
      if (state.state !== 'error') {
        this.display.clearError();
      }
    });

    // Subscribe to calculation events
    this.calculator.onCalculation((data) => {
      this.historyManager.addEntry(data);
    });

    // Subscribe to error events
    this.calculator.onError((error) => {
      this.display.showError(error.message);
    });

    // Subscribe to history changes
    this.historyManager.subscribe((history) => {
      this.historyPanel.updateHistory(history);
    });
  }

  /**
   * Announce app is ready to screen readers
   * @private
   */
  _announceReady() {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = 'Calculator ready';
    document.body.appendChild(announcement);

    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CalculatorApp();
  });
} else {
  new CalculatorApp();
}
