/**
 * Main Calculator class
 * Implements the calculator API defined in contracts/calculator-api.md
 * @module calculator/Calculator
 */

import { CalculatorState } from '../state/CalculatorState.js';
import { OperationEngine } from './OperationEngine.js';
import { MemoryManager } from './MemoryManager.js';
import { DisplayFormatter } from './DisplayFormatter.js';
import { OPERATORS, CALCULATOR_STATES } from '../config/constants.js';

/**
 * Main Calculator class - implements the public API
 */
export class Calculator {
  constructor() {
    this.state = new CalculatorState();
    this.memory = new MemoryManager();
    this._eventListeners = {
      stateChange: [],
      calculation: [],
      error: [],
    };
  }

  /**
   * Input a digit (0-9)
   * @param {string} digit - Single digit 0-9
   * @fires stateChange
   */
  inputDigit(digit) {
    if (!/^[0-9]$/.test(digit)) {
      this._emitError('Invalid digit');
      return;
    }

    this.state.appendDigit(digit);
    this._emitStateChange();
  }

  /**
   * Input decimal point
   * @fires stateChange
   */
  inputDecimal() {
    this.state.appendDecimal();
    this._emitStateChange();
  }

  /**
   * Input an operator (+, -, ×, ÷)
   * @param {string} operator - One of the OPERATORS values
   * @fires stateChange
   */
  inputOperator(operator) {
    if (!Object.values(OPERATORS).includes(operator)) {
      this._emitError('Invalid operator');
      return;
    }

    this.state.setOperator(operator);
    this._emitStateChange();
  }

  /**
   * Calculate the result
   * @fires calculation
   * @fires error (if calculation fails)
   * @returns {number|null} Result or null if error
   */
  calculate() {
    try {
      // Prepare state for calculation
      this.state.prepareForCalculation();

      // Get expression to evaluate
      const expression = this.state.getExpression();

      if (expression.length === 0) {
        return null;
      }

      // Evaluate expression
      const result = OperationEngine.evaluate(expression);

      // Update state with result
      this.state.setResult(result);
      
      // Clear expression for next calculation
      this.state.clearExpression();

      // Emit events
      this._emitCalculation(result, expression);
      this._emitStateChange();

      return result;
    } catch (error) {
      this.state.setError(error.message);
      this._emitError(error.message);
      this._emitStateChange();
      return null;
    }
  }

  /**
   * Clear current entry (C button)
   * @fires stateChange
   */
  clear() {
    this.state.clear();
    this._emitStateChange();
  }

  /**
   * Clear all (AC button)
   * @fires stateChange
   */
  allClear() {
    this.state.clearAll();
    this._emitStateChange();
  }

  /**
   * Backspace - remove last digit
   * @fires stateChange
   */
  backspace() {
    this.state.backspace();
    this._emitStateChange();
  }

  /**
   * Memory Add (M+) - add current value to memory
   * @fires stateChange
   */
  memoryAdd() {
    const value = parseFloat(this.state.getCurrentOperand());
    if (!isNaN(value)) {
      this.memory.add(value);
      this._emitStateChange();
    }
  }

  /**
   * Memory Subtract (M-) - subtract current value from memory
   * @fires stateChange
   */
  memorySubtract() {
    const value = parseFloat(this.state.getCurrentOperand());
    if (!isNaN(value)) {
      this.memory.subtract(value);
      this._emitStateChange();
    }
  }

  /**
   * Memory Recall (MR) - recall memory value to display
   * @fires stateChange
   */
  memoryRecall() {
    const value = this.memory.recall();
    this.state.setCurrentOperand(value.toString());
    this.state.shouldResetDisplay = true;
    this._emitStateChange();
  }

  /**
   * Memory Clear (MC) - clear memory
   * @fires stateChange
   */
  memoryClear() {
    this.memory.clear();
    this._emitStateChange();
  }

  /**
   * Get current display value
   * @returns {string}
   */
  getDisplayValue() {
    if (this.state.getError()) {
      return this.state.getError();
    }

    return DisplayFormatter.format(this.state.getCurrentOperand());
  }

  /**
   * Get expression display value
   * @returns {string}
   */
  getExpressionDisplay() {
    return this.state.getExpressionString();
  }

  /**
   * Get memory indicator state
   * @returns {boolean}
   */
  hasMemory() {
    return this.memory.hasValue();
  }

  /**
   * Subscribe to state change events
   * @param {Function} callback
   * @returns {Function} Unsubscribe function
   */
  onStateChange(callback) {
    this._eventListeners.stateChange.push(callback);
    return () => {
      this._eventListeners.stateChange = this._eventListeners.stateChange.filter(
        (cb) => cb !== callback
      );
    };
  }

  /**
   * Subscribe to calculation events
   * @param {Function} callback
   * @returns {Function} Unsubscribe function
   */
  onCalculation(callback) {
    this._eventListeners.calculation.push(callback);
    return () => {
      this._eventListeners.calculation = this._eventListeners.calculation.filter(
        (cb) => cb !== callback
      );
    };
  }

  /**
   * Subscribe to error events
   * @param {Function} callback
   * @returns {Function} Unsubscribe function
   */
  onError(callback) {
    this._eventListeners.error.push(callback);
    return () => {
      this._eventListeners.error = this._eventListeners.error.filter(
        (cb) => cb !== callback
      );
    };
  }

  /**
   * Emit state change event
   * @private
   */
  _emitStateChange() {
    const stateData = {
      displayValue: this.getDisplayValue(),
      expressionDisplay: this.getExpressionDisplay(),
      hasMemory: this.hasMemory(),
      state: this.state.getState(),
    };

    this._eventListeners.stateChange.forEach((callback) => {
      callback(stateData);
    });
  }

  /**
   * Emit calculation event
   * @private
   */
  _emitCalculation(result, expression) {
    this._eventListeners.calculation.forEach((callback) => {
      callback({ result, expression });
    });
  }

  /**
   * Emit error event
   * @private
   */
  _emitError(message) {
    this._eventListeners.error.forEach((callback) => {
      callback({ message });
    });
  }

  /**
   * Get current state for debugging
   * @returns {Object}
   */
  getState() {
    return {
      ...this.state.toJSON(),
      memory: this.memory.getValue(),
    };
  }
}
