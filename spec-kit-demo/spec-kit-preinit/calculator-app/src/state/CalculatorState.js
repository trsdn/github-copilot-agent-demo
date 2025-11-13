/**
 * Calculator state machine implementation
 * Manages the internal state of the calculator following the state diagram
 * defined in data-model.md
 * @module state/CalculatorState
 */

import { CALCULATOR_STATES, OPERATORS, ERROR_MESSAGES } from '../config/constants.js';

/**
 * Represents the calculator's internal state
 */
export class CalculatorState {
  constructor() {
    this.reset();
  }

  /**
   * Reset state to initial
   */
  reset() {
    this.state = CALCULATOR_STATES.INITIAL;
    this.currentOperand = '0';
    this.previousOperand = null;
    this.operator = null;
    this.expression = [];
    this.result = null;
    this.error = null;
    this.shouldResetDisplay = false;
  }

  /**
   * Get current state name
   * @returns {string}
   */
  getState() {
    return this.state;
  }

  /**
   * Get current operand being entered
   * @returns {string}
   */
  getCurrentOperand() {
    return this.currentOperand;
  }

  /**
   * Get the previous operand
   * @returns {string|null}
   */
  getPreviousOperand() {
    return this.previousOperand;
  }

  /**
   * Get current operator
   * @returns {string|null}
   */
  getOperator() {
    return this.operator;
  }

  /**
   * Get the full expression as an array
   * @returns {Array<string|number>}
   */
  getExpression() {
    return [...this.expression];
  }

  /**
   * Get the expression as a display string
   * @returns {string}
   */
  getExpressionString() {
    if (this.expression.length === 0) {
      return '';
    }
    return this.expression.join(' ');
  }

  /**
   * Get the result of the last calculation
   * @returns {number|null}
   */
  getResult() {
    return this.result;
  }

  /**
   * Get current error message if in error state
   * @returns {string|null}
   */
  getError() {
    return this.error;
  }

  /**
   * Check if display should be reset on next digit input
   * @returns {boolean}
   */
  shouldResetOnNextInput() {
    return this.shouldResetDisplay;
  }

  /**
   * Set current operand
   * @param {string} operand
   */
  setCurrentOperand(operand) {
    this.currentOperand = operand;
    if (this.state === CALCULATOR_STATES.INITIAL) {
      this.state = CALCULATOR_STATES.OPERAND_ENTRY;
    }
  }

  /**
   * Append digit to current operand
   * @param {string} digit
   */
  appendDigit(digit) {
    // Reset display if needed (after calculation or error)
    if (this.shouldResetDisplay) {
      this.currentOperand = digit;
      this.shouldResetDisplay = false;
      this.state = CALCULATOR_STATES.OPERAND_ENTRY;
      return;
    }

    // Handle initial zero
    if (this.currentOperand === '0' && digit !== '.') {
      this.currentOperand = digit;
    } else {
      this.currentOperand += digit;
    }

    if (this.state === CALCULATOR_STATES.INITIAL) {
      this.state = CALCULATOR_STATES.OPERAND_ENTRY;
    }
  }

  /**
   * Append decimal point to current operand
   */
  appendDecimal() {
    // Reset display if needed
    if (this.shouldResetDisplay) {
      this.currentOperand = '0.';
      this.shouldResetDisplay = false;
      this.state = CALCULATOR_STATES.OPERAND_ENTRY;
      return;
    }

    // Only add decimal if not already present
    if (!this.currentOperand.includes('.')) {
      this.currentOperand += '.';
    }

    if (this.state === CALCULATOR_STATES.INITIAL) {
      this.state = CALCULATOR_STATES.OPERAND_ENTRY;
    }
  }

  /**
   * Set operator and move to operator selected state
   * @param {string} operator - One of OPERATORS values
   */
  setOperator(operator) {
    // Add current operand to expression if we have one
    if (this.currentOperand !== null) {
      this.expression.push(parseFloat(this.currentOperand));
    }

    // Add operator to expression
    this.expression.push(operator);
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.shouldResetDisplay = true;
    this.state = CALCULATOR_STATES.OPERATOR_SELECTED;
    this.error = null;
  }

  /**
   * Set the result after calculation
   * @param {number} result
   */
  setResult(result) {
    this.result = result;
    this.currentOperand = result.toString();
    this.state = CALCULATOR_STATES.RESULT_DISPLAYED;
    this.shouldResetDisplay = true;
  }

  /**
   * Set error state
   * @param {string} errorMessage
   */
  setError(errorMessage) {
    this.error = errorMessage;
    this.state = CALCULATOR_STATES.ERROR;
    this.currentOperand = '0';
  }

  /**
   * Clear current operand (C button)
   */
  clear() {
    this.currentOperand = '0';
    this.error = null;
    if (this.state === CALCULATOR_STATES.ERROR) {
      this.state = CALCULATOR_STATES.INITIAL;
    }
  }

  /**
   * Clear all state (AC button)
   */
  clearAll() {
    this.reset();
  }

  /**
   * Remove last digit from current operand (backspace)
   */
  backspace() {
    if (this.state === CALCULATOR_STATES.RESULT_DISPLAYED || 
        this.state === CALCULATOR_STATES.ERROR) {
      return;
    }

    if (this.currentOperand.length > 1) {
      this.currentOperand = this.currentOperand.slice(0, -1);
    } else {
      this.currentOperand = '0';
    }
  }

  /**
   * Prepare state for calculation
   * Adds the current operand to the expression
   */
  prepareForCalculation() {
    if (this.currentOperand !== null && !this.shouldResetDisplay) {
      this.expression.push(parseFloat(this.currentOperand));
    }
  }

  /**
   * Clear the expression after calculation
   */
  clearExpression() {
    this.expression = [];
    this.operator = null;
    this.previousOperand = null;
  }

  /**
   * Check if we're in a state where we can perform calculation
   * @returns {boolean}
   */
  canCalculate() {
    return this.expression.length > 0 || 
           (this.currentOperand !== null && this.currentOperand !== '0');
  }

  /**
   * Serialize state to plain object for debugging/storage
   * @returns {Object}
   */
  toJSON() {
    return {
      state: this.state,
      currentOperand: this.currentOperand,
      previousOperand: this.previousOperand,
      operator: this.operator,
      expression: this.expression,
      result: this.result,
      error: this.error,
      shouldResetDisplay: this.shouldResetDisplay,
    };
  }

  /**
   * Restore state from plain object
   * @param {Object} json
   */
  fromJSON(json) {
    this.state = json.state || CALCULATOR_STATES.INITIAL;
    this.currentOperand = json.currentOperand || '0';
    this.previousOperand = json.previousOperand || null;
    this.operator = json.operator || null;
    this.expression = json.expression || [];
    this.result = json.result || null;
    this.error = json.error || null;
    this.shouldResetDisplay = json.shouldResetDisplay || false;
  }
}
