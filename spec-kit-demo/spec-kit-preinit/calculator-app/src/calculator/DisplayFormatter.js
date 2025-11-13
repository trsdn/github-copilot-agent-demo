/**
 * Display formatting utilities
 * Handles number formatting for display, including scientific notation
 * @module calculator/DisplayFormatter
 */

import { DISPLAY } from '../config/constants.js';

/**
 * Formats numbers for calculator display
 */
export class DisplayFormatter {
  /**
   * Format a number for display
   * - Uses scientific notation for very large or very small numbers
   * - Limits decimal places
   * - Handles special cases (Infinity, NaN)
   * @param {number|string} value - Value to format
   * @returns {string} Formatted value
   */
  static format(value) {
    if (value === null || value === undefined) {
      return '0';
    }

    // Convert to number if string
    const num = typeof value === 'string' ? parseFloat(value) : value;

    // Handle special cases
    if (!isFinite(num)) {
      return 'Error';
    }

    if (num === 0) {
      return '0';
    }

    // Use scientific notation for very large or very small numbers
    if (Math.abs(num) >= DISPLAY.MAX_SCIENTIFIC || Math.abs(num) < DISPLAY.MIN_SCIENTIFIC) {
      return this._formatScientific(num);
    }

    // Format normal numbers
    return this._formatNormal(num);
  }

  /**
   * Format number in scientific notation
   * @private
   * @param {number} num
   * @returns {string}
   */
  static _formatScientific(num) {
    // Use exponential notation with limited precision
    const formatted = num.toExponential(DISPLAY.DECIMAL_PLACES);
    
    // Clean up trailing zeros after decimal point
    return formatted.replace(/\.?0+e/, 'e');
  }

  /**
   * Format number in normal notation
   * @private
   * @param {number} num
   * @returns {string}
   */
  static _formatNormal(num) {
    // Convert to string
    let str = num.toString();

    // If it's already concise, return it
    if (str.length <= DISPLAY.MAX_DIGITS) {
      return str;
    }

    // Try fixed precision
    const fixed = num.toFixed(DISPLAY.DECIMAL_PLACES);
    
    // Remove trailing zeros after decimal point
    const cleaned = fixed.replace(/\.?0+$/, '');

    // If still too long, use scientific notation
    if (cleaned.length > DISPLAY.MAX_DIGITS) {
      return this._formatScientific(num);
    }

    return cleaned;
  }

  /**
   * Format a number for screen reader announcement
   * Expands scientific notation and operators to be more readable
   * @param {number|string} value
   * @returns {string}
   */
  static formatForScreenReader(value) {
    const formatted = this.format(value);

    // Expand scientific notation
    if (formatted.includes('e')) {
      const [coefficient, exponent] = formatted.split('e');
      const exp = parseInt(exponent, 10);
      return `${coefficient} times 10 to the power of ${exp}`;
    }

    return formatted;
  }

  /**
   * Format an expression for display
   * @param {Array} expression - Array of numbers and operators
   * @returns {string}
   */
  static formatExpression(expression) {
    return expression
      .map((token) => {
        if (typeof token === 'number') {
          return this.format(token);
        }
        return token;
      })
      .join(' ');
  }

  /**
   * Check if a string represents a valid number for input
   * @param {string} str
   * @returns {boolean}
   */
  static isValidNumber(str) {
    if (!str || str === '') {
      return false;
    }

    // Allow digits, single decimal point, and leading minus
    const pattern = /^-?\d*\.?\d*$/;
    return pattern.test(str);
  }

  /**
   * Truncate input to maximum digits
   * @param {string} input
   * @returns {string}
   */
  static truncateInput(input) {
    // Don't count decimal point or minus sign toward digit limit
    const digitsOnly = input.replace(/[.-]/g, '');
    
    if (digitsOnly.length > DISPLAY.MAX_DIGITS) {
      return input.slice(0, -(digitsOnly.length - DISPLAY.MAX_DIGITS));
    }

    return input;
  }
}
