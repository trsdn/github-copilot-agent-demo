/**
 * History Manager for tracking calculation history
 * @module state/HistoryManager
 */

import { storage } from '../utils/LocalStorage.js';
import { HISTORY } from '../config/constants.js';
import { DisplayFormatter } from '../calculator/DisplayFormatter.js';

/**
 * Manages calculation history with persistence
 */
export class HistoryManager {
  constructor() {
    this._history = [];
    this._listeners = [];
    this._loadFromStorage();
  }

  /**
   * Add a calculation to history
   * @param {Object} entry - History entry
   * @param {Array} entry.expression - Expression array
   * @param {number} entry.result - Calculation result
   */
  addEntry(entry) {
    const historyEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      expression: entry.expression,
      expressionString: DisplayFormatter.formatExpression(entry.expression),
      result: entry.result,
      resultString: DisplayFormatter.format(entry.result),
    };

    this._history.push(historyEntry);

    // Limit history size
    if (this._history.length > HISTORY.MAX_ENTRIES) {
      this._history.shift(); // Remove oldest entry
    }

    this._saveToStorage();
    this._notifyChange();
  }

  /**
   * Get all history entries
   * @returns {Array} History entries (newest first)
   */
  getHistory() {
    return [...this._history].reverse();
  }

  /**
   * Get a specific history entry by ID
   * @param {number} id - Entry ID
   * @returns {Object|null} History entry or null
   */
  getEntry(id) {
    return this._history.find((entry) => entry.id === id) || null;
  }

  /**
   * Clear all history
   */
  clear() {
    this._history = [];
    this._saveToStorage();
    this._notifyChange();
  }

  /**
   * Remove a specific history entry
   * @param {number} id - Entry ID to remove
   */
  removeEntry(id) {
    this._history = this._history.filter((entry) => entry.id !== id);
    this._saveToStorage();
    this._notifyChange();
  }

  /**
   * Get history count
   * @returns {number}
   */
  getCount() {
    return this._history.length;
  }

  /**
   * Check if history is empty
   * @returns {boolean}
   */
  isEmpty() {
    return this._history.length === 0;
  }

  /**
   * Subscribe to history changes
   * @param {Function} callback - Called when history changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter((cb) => cb !== callback);
    };
  }

  /**
   * Notify all subscribers of history change
   * @private
   */
  _notifyChange() {
    this._listeners.forEach((callback) => {
      callback(this.getHistory());
    });
  }

  /**
   * Save history to storage
   * @private
   */
  _saveToStorage() {
    storage.saveHistory(this._history);
  }

  /**
   * Load history from storage
   * @private
   */
  _loadFromStorage() {
    this._history = storage.loadHistory();
  }

  /**
   * Export history as JSON
   * @returns {string} JSON string
   */
  exportToJSON() {
    return JSON.stringify(this._history, null, 2);
  }

  /**
   * Import history from JSON
   * @param {string} json - JSON string
   * @returns {boolean} Success status
   */
  importFromJSON(json) {
    try {
      const imported = JSON.parse(json);
      if (Array.isArray(imported)) {
        this._history = imported;
        this._saveToStorage();
        this._notifyChange();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing history:', error);
      return false;
    }
  }
}
