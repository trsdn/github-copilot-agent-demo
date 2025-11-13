/**
 * LocalStorage abstraction with error handling
 * Implements the storage API defined in contracts/storage-api.md
 * @module utils/LocalStorage
 */

import { STORAGE_KEYS, HISTORY } from '../config/constants.js';

/**
 * Wrapper for browser LocalStorage with graceful degradation
 */
export class LocalStorageManager {
  constructor() {
    this._isAvailable = this._checkAvailability();
    this._fallbackStorage = new Map();
  }

  /**
   * Check if LocalStorage is available
   * @private
   * @returns {boolean}
   */
  _checkAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      // LocalStorage not available (private browsing, quota exceeded, etc.)
      console.warn('LocalStorage not available, using fallback storage', e);
      return false;
    }
  }

  /**
   * Save an item to storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   * @returns {boolean} Success status
   */
  setItem(key, value) {
    try {
      const serialized = JSON.stringify(value);

      if (this._isAvailable) {
        try {
          localStorage.setItem(key, serialized);
          return true;
        } catch (e) {
          // Handle QuotaExceededError
          if (e.name === 'QuotaExceededError') {
            console.warn('Storage quota exceeded, attempting to prune old entries');
            this._pruneOldEntries(key);
            // Retry after pruning
            try {
              localStorage.setItem(key, serialized);
              return true;
            } catch (retryError) {
              console.error('Failed to save after pruning', retryError);
              this._fallbackStorage.set(key, value);
              return false;
            }
          }
          throw e;
        }
      } else {
        // Use fallback storage
        this._fallbackStorage.set(key, value);
        return true;
      }
    } catch (error) {
      console.error('Error saving to storage:', error);
      this._fallbackStorage.set(key, value);
      return false;
    }
  }

  /**
   * Retrieve an item from storage
   * @param {string} key - Storage key
   * @returns {*} Parsed value or null if not found
   */
  getItem(key) {
    try {
      if (this._isAvailable) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } else {
        return this._fallbackStorage.get(key) || null;
      }
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }

  /**
   * Remove an item from storage
   * @param {string} key - Storage key
   */
  removeItem(key) {
    try {
      if (this._isAvailable) {
        localStorage.removeItem(key);
      } else {
        this._fallbackStorage.delete(key);
      }
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }

  /**
   * Clear all storage
   */
  clear() {
    try {
      if (this._isAvailable) {
        localStorage.clear();
      } else {
        this._fallbackStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  /**
   * Prune old entries to free up space
   * Removes oldest history entries
   * @private
   * @param {string} keyToSave - Key that triggered the quota error
   */
  _pruneOldEntries(keyToSave) {
    // If the quota was exceeded while saving history, prune history entries
    if (keyToSave === STORAGE_KEYS.HISTORY) {
      try {
        const history = this.getItem(STORAGE_KEYS.HISTORY);
        if (history && Array.isArray(history) && history.length > 0) {
          // Keep only the most recent 50 entries (half of max)
          const pruned = history.slice(-50);
          localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(pruned));
          console.log(`Pruned history from ${history.length} to ${pruned.length} entries`);
        }
      } catch (error) {
        console.error('Error pruning history:', error);
      }
    }
  }

  /**
   * Save history to storage
   * @param {Array} history - Array of history entries
   * @returns {boolean} Success status
   */
  saveHistory(history) {
    // Limit history to max entries
    const limited = history.slice(-HISTORY.MAX_ENTRIES);
    return this.setItem(STORAGE_KEYS.HISTORY, limited);
  }

  /**
   * Load history from storage
   * @returns {Array} History entries or empty array
   */
  loadHistory() {
    const history = this.getItem(STORAGE_KEYS.HISTORY);
    return Array.isArray(history) ? history : [];
  }

  /**
   * Save memory value to storage
   * @param {number} value - Memory value
   * @returns {boolean} Success status
   */
  saveMemory(value) {
    return this.setItem(STORAGE_KEYS.MEMORY, value);
  }

  /**
   * Load memory value from storage
   * @returns {number} Memory value or 0
   */
  loadMemory() {
    const value = this.getItem(STORAGE_KEYS.MEMORY);
    return typeof value === 'number' ? value : 0;
  }

  /**
   * Save theme preference to storage
   * @param {string} theme - Theme name
   * @returns {boolean} Success status
   */
  saveTheme(theme) {
    return this.setItem(STORAGE_KEYS.THEME, theme);
  }

  /**
   * Load theme preference from storage
   * @returns {string|null} Theme name or null
   */
  loadTheme() {
    return this.getItem(STORAGE_KEYS.THEME);
  }

  /**
   * Check if storage is available
   * @returns {boolean}
   */
  isAvailable() {
    return this._isAvailable;
  }
}

// Export singleton instance
export const storage = new LocalStorageManager();
