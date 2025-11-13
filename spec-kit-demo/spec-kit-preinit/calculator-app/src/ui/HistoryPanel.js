/**
 * History Panel Component
 * Implements the history panel specified in contracts/history-panel.md
 * Side panel on desktop, bottom drawer on mobile
 * @module ui/HistoryPanel
 */

/**
 * History panel component for displaying calculation history
 */
export class HistoryPanel {
  /**
   * @param {HTMLElement} container - Container element for the history panel
   * @param {Object} handlers - Event handlers
   */
  constructor(container, handlers = {}) {
    this.container = container;
    this.handlers = handlers;
    this.isOpen = false;
    this._render();
    this._attachEventListeners();
  }

  /**
   * Render the history panel HTML structure
   * @private
   */
  _render() {
    this.container.innerHTML = `
      <aside class="history-panel" role="complementary" aria-label="Calculation history" aria-hidden="true">
        <div class="history-header">
          <h2>History</h2>
          <button class="btn-icon btn-close" aria-label="Close history panel">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="history-content" role="list">
          <div class="history-empty">
            <p>No calculations yet</p>
          </div>
        </div>
        <div class="history-footer">
          <button class="btn btn-clear-history" aria-label="Clear all history">
            Clear History
          </button>
        </div>
      </aside>
      <button class="btn-toggle-history" aria-label="Open history panel" aria-expanded="false">
        <span aria-hidden="true">📋</span>
        <span class="sr-only">History</span>
      </button>
    `;
  }

  /**
   * Attach event listeners
   * @private
   */
  _attachEventListeners() {
    const toggleButton = this.container.querySelector('.btn-toggle-history');
    const closeButton = this.container.querySelector('.btn-close');
    const clearButton = this.container.querySelector('.btn-clear-history');

    toggleButton.addEventListener('click', () => this.toggle());
    closeButton.addEventListener('click', () => this.close());
    clearButton.addEventListener('click', () => {
      if (this.handlers.onClearHistory) {
        this.handlers.onClearHistory();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Delegate clicks on history entries
    const historyContent = this.container.querySelector('.history-content');
    historyContent.addEventListener('click', (e) => {
      const entry = e.target.closest('.history-entry');
      if (entry && this.handlers.onSelectEntry) {
        const entryId = parseInt(entry.dataset.id, 10);
        this.handlers.onSelectEntry(entryId);
      }
    });
  }

  /**
   * Update history entries
   * @param {Array} history - Array of history entries
   */
  updateHistory(history) {
    const content = this.container.querySelector('.history-content');
    
    if (!history || history.length === 0) {
      content.innerHTML = `
        <div class="history-empty">
          <p>No calculations yet</p>
        </div>
      `;
      return;
    }

    const entriesHTML = history
      .map((entry) => {
        return `
          <div class="history-entry" role="listitem" data-id="${entry.id}" tabindex="0">
            <div class="history-expression">${entry.expressionString}</div>
            <div class="history-result">${entry.resultString}</div>
            <time class="history-timestamp" datetime="${entry.timestamp}">
              ${this._formatTimestamp(entry.timestamp)}
            </time>
          </div>
        `;
      })
      .join('');

    content.innerHTML = entriesHTML;

    // Make entries keyboard navigable
    const entries = content.querySelectorAll('.history-entry');
    entries.forEach((entry) => {
      entry.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          entry.click();
        }
      });
    });
  }

  /**
   * Format timestamp for display
   * @private
   * @param {string} isoString - ISO timestamp
   * @returns {string}
   */
  _formatTimestamp(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;

    // Less than 1 minute
    if (diff < 60000) {
      return 'Just now';
    }

    // Less than 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} min ago`;
    }

    // Less than 24 hours
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    // Format as time
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Open the history panel
   */
  open() {
    const panel = this.container.querySelector('.history-panel');
    const toggleButton = this.container.querySelector('.btn-toggle-history');

    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    toggleButton.setAttribute('aria-expanded', 'true');
    toggleButton.setAttribute('aria-label', 'Close history panel');
    this.isOpen = true;

    // Focus the first history entry or close button
    const firstEntry = panel.querySelector('.history-entry');
    if (firstEntry) {
      firstEntry.focus();
    } else {
      panel.querySelector('.btn-close').focus();
    }
  }

  /**
   * Close the history panel
   */
  close() {
    const panel = this.container.querySelector('.history-panel');
    const toggleButton = this.container.querySelector('.btn-toggle-history');

    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-label', 'Open history panel');
    this.isOpen = false;

    // Return focus to toggle button
    toggleButton.focus();
  }

  /**
   * Toggle the history panel
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Get the panel element
   * @returns {HTMLElement}
   */
  getElement() {
    return this.container.querySelector('.history-panel');
  }
}
