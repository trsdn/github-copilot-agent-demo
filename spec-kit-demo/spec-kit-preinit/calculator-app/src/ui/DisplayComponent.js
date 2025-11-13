/**
 * Display Component
 * Implements the dual-line display specified in contracts/display-component.md
 * @module ui/DisplayComponent
 */

/**
 * Calculator display component with expression and result lines
 */
export class DisplayComponent {
  /**
   * @param {HTMLElement} container - Container element for the display
   */
  constructor(container) {
    this.container = container;
    this._render();
    this._expressionLine = this.container.querySelector('.display-expression');
    this._resultLine = this.container.querySelector('.display-result');
  }

  /**
   * Render the display HTML structure
   * @private
   */
  _render() {
    this.container.innerHTML = `
      <div class="calculator-display" role="region" aria-label="Calculator display">
        <div class="display-expression" aria-live="polite" aria-atomic="true">
        </div>
        <div class="display-result" aria-live="assertive" aria-atomic="true" tabindex="0">
          0
        </div>
      </div>
    `;
  }

  /**
   * Update the expression line (top line)
   * @param {string} expression - Expression to display
   */
  updateExpression(expression) {
    this._expressionLine.textContent = expression || '';
  }

  /**
   * Update the result line (bottom line)
   * @param {string} result - Result to display
   */
  updateResult(result) {
    this._resultLine.textContent = result;
  }

  /**
   * Update both lines at once
   * @param {Object} data
   * @param {string} data.expression - Expression text
   * @param {string} data.result - Result text
   */
  update(data) {
    this.updateExpression(data.expression);
    this.updateResult(data.result);
  }

  /**
   * Show error state
   * @param {string} message - Error message
   */
  showError(message) {
    this._resultLine.textContent = message;
    this._resultLine.classList.add('error');
    this._resultLine.setAttribute('aria-invalid', 'true');
  }

  /**
   * Clear error state
   */
  clearError() {
    this._resultLine.classList.remove('error');
    this._resultLine.removeAttribute('aria-invalid');
  }

  /**
   * Get the display element
   * @returns {HTMLElement}
   */
  getElement() {
    return this.container.querySelector('.calculator-display');
  }
}
