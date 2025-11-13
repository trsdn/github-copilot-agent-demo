/**
 * Calculator operation engine
 * Implements expression evaluation with operator precedence using two-stack algorithm
 * @module calculator/OperationEngine
 */

import { OPERATORS, PRECEDENCE, ERROR_MESSAGES, DISPLAY } from '../config/constants.js';

/**
 * Evaluates mathematical expressions with proper operator precedence
 */
export class OperationEngine {
  /**
   * Evaluate an expression array with proper operator precedence
   * Uses the two-stack algorithm (operand stack and operator stack)
   * @param {Array} expression - Array of numbers and operators
   * @returns {number} Result of the evaluation
   * @throws {Error} If division by zero or invalid expression
   */
  static evaluate(expression) {
    if (!expression || expression.length === 0) {
      return 0;
    }

    // Handle single number
    if (expression.length === 1) {
      return typeof expression[0] === 'number' ? expression[0] : 0;
    }

    const operandStack = [];
    const operatorStack = [];

    for (let i = 0; i < expression.length; i++) {
      const token = expression[i];

      if (typeof token === 'number') {
        operandStack.push(token);
      } else if (Object.values(OPERATORS).includes(token)) {
        // Process operators with higher or equal precedence
        while (
          operatorStack.length > 0 &&
          PRECEDENCE[operatorStack[operatorStack.length - 1]] >= PRECEDENCE[token]
        ) {
          this._processOperator(operandStack, operatorStack);
        }
        operatorStack.push(token);
      }
    }

    // Process remaining operators
    while (operatorStack.length > 0) {
      this._processOperator(operandStack, operatorStack);
    }

    // Final result should be the only item in operand stack
    const result = operandStack[0];

    // Check for overflow/underflow
    this._checkBounds(result);

    return result;
  }

  /**
   * Process a single operator from the stacks
   * @private
   * @param {Array<number>} operandStack
   * @param {Array<string>} operatorStack
   */
  static _processOperator(operandStack, operatorStack) {
    const operator = operatorStack.pop();
    const right = operandStack.pop();
    const left = operandStack.pop();

    const result = this._applyOperator(left, right, operator);
    operandStack.push(result);
  }

  /**
   * Apply a binary operator to two operands
   * @private
   * @param {number} left
   * @param {number} right
   * @param {string} operator
   * @returns {number}
   * @throws {Error} If division by zero
   */
  static _applyOperator(left, right, operator) {
    switch (operator) {
      case OPERATORS.ADD:
        return left + right;
      case OPERATORS.SUBTRACT:
        return left - right;
      case OPERATORS.MULTIPLY:
        return left * right;
      case OPERATORS.DIVIDE:
        if (right === 0) {
          throw new Error(ERROR_MESSAGES.DIVISION_BY_ZERO);
        }
        return left / right;
      default:
        throw new Error(ERROR_MESSAGES.INVALID_OPERATION);
    }
  }

  /**
   * Check if result is within acceptable bounds
   * @private
   * @param {number} result
   * @throws {Error} If overflow or underflow
   */
  static _checkBounds(result) {
    if (!isFinite(result)) {
      throw new Error(ERROR_MESSAGES.OVERFLOW);
    }

    if (result !== 0 && Math.abs(result) < DISPLAY.MIN_SCIENTIFIC) {
      throw new Error(ERROR_MESSAGES.UNDERFLOW);
    }

    if (Math.abs(result) > DISPLAY.MAX_SCIENTIFIC) {
      throw new Error(ERROR_MESSAGES.OVERFLOW);
    }
  }

  /**
   * Perform a simple binary operation (for immediate calculation mode)
   * @param {number} left - Left operand
   * @param {number} right - Right operand
   * @param {string} operator - Operator symbol
   * @returns {number} Result
   * @throws {Error} If invalid operation
   */
  static calculate(left, right, operator) {
    const result = this._applyOperator(left, right, operator);
    this._checkBounds(result);
    return result;
  }

  /**
   * Add two numbers
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  static add(a, b) {
    return this.calculate(a, b, OPERATORS.ADD);
  }

  /**
   * Subtract two numbers
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  static subtract(a, b) {
    return this.calculate(a, b, OPERATORS.SUBTRACT);
  }

  /**
   * Multiply two numbers
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  static multiply(a, b) {
    return this.calculate(a, b, OPERATORS.MULTIPLY);
  }

  /**
   * Divide two numbers
   * @param {number} a
   * @param {number} b
   * @returns {number}
   * @throws {Error} If division by zero
   */
  static divide(a, b) {
    return this.calculate(a, b, OPERATORS.DIVIDE);
  }
}
