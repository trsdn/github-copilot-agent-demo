/**
 * Memory Manager for calculator memory operations (M+, M-, MR, MC)
 * @module calculator/MemoryManager
 */

import { MEMORY_OPS } from '../config/constants.js';

/**
 * Manages calculator memory storage and operations
 */
export class MemoryManager {
  constructor() {
    this._memoryValue = 0;
    this._listeners = [];
  }

  /**
   * Get current memory value
   * @returns {number}
   */
  getValue() {
    return this._memoryValue;
  }

  /**
   * Check if memory has a non-zero value
   * @returns {boolean}
   */
  hasValue() {
    return this._memoryValue !== 0;
  }

  /**
   * Add value to memory (M+)
   * @param {number} value - Value to add
   */
  add(value) {
    this._memoryValue += value;
    this._notifyChange();
  }

  /**
   * Subtract value from memory (M-)
   * @param {number} value - Value to subtract
   */
  subtract(value) {
    this._memoryValue -= value;
    this._notifyChange();
  }

  /**
   * Recall memory value (MR)
   * @returns {number}
   */
  recall() {
    return this._memoryValue;
  }

  /**
   * Clear memory (MC)
   */
  clear() {
    this._memoryValue = 0;
    this._notifyChange();
  }

  /**
   * Set memory to a specific value
   * @param {number} value
   */
  setValue(value) {
    this._memoryValue = value;
    this._notifyChange();
  }

  /**
   * Subscribe to memory changes
   * @param {Function} callback - Called when memory value changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter((cb) => cb !== callback);
    };
  }

  /**
   * Notify all subscribers of memory change
   * @private
   */
  _notifyChange() {
    this._listeners.forEach((callback) => {
      callback(this._memoryValue);
    });
  }

  /**
   * Serialize memory value for storage
   * @returns {Object}
   */
  toJSON() {
    return {
      memoryValue: this._memoryValue,
    };
  }

  /**
   * Restore memory value from storage
   * @param {Object} json
   */
  fromJSON(json) {
    if (json && typeof json.memoryValue === 'number') {
      this._memoryValue = json.memoryValue;
      this._notifyChange();
    }
  }
}
