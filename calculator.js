/**
 * Pirate Calculator - JavaScript Logic
 * A calculator with a special pirate mode Easter egg!
 */

class PirateCalculator {
    constructor() {
        // Calculator state
        this.currentNumber = '0';
        this.previousNumber = '';
        this.operator = '';
        this.waitingForNewNumber = false;
        this.isPirateMode = false;
        this.pirateSequence = '';
        this.clearCount = 0;
        
        // DOM elements
        this.mainDisplay = document.getElementById('main-display');
        this.secondaryDisplay = document.getElementById('secondary-display');
        this.pirateIndicator = document.getElementById('pirate-mode-indicator');
        this.messageContainer = document.getElementById('message-container');
        this.messageDisplay = document.getElementById('message-display');
        
        // Initialize
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        // Number buttons
        document.querySelectorAll('.btn-number').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.inputNumber(e.target.dataset.number || e.target.textContent);
            });
        });

        // Operator buttons
        document.getElementById('add-btn').addEventListener('click', () => this.inputOperator('+'));
        document.getElementById('subtract-btn').addEventListener('click', () => this.inputOperator('-'));
        document.getElementById('multiply-btn').addEventListener('click', () => this.inputOperator('*'));
        document.getElementById('divide-btn').addEventListener('click', () => this.inputOperator('/'));

        // Function buttons
        document.getElementById('equals-btn').addEventListener('click', () => this.calculate());
        document.getElementById('clear-btn').addEventListener('click', () => this.clear());
        document.getElementById('delete-btn').addEventListener('click', () => this.delete());
        document.getElementById('decimal-btn').addEventListener('click', () => this.inputDecimal());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    inputNumber(num) {
        // Check for pirate sequence (7734)
        this.pirateSequence += num;
        if (this.pirateSequence.length > 4) {
            this.pirateSequence = this.pirateSequence.slice(-4);
        }
        
        if (this.pirateSequence === '7734' && !this.isPirateMode) {
            this.activatePirateMode();
        }

        if (this.waitingForNewNumber || this.currentNumber === '0') {
            this.currentNumber = num;
            this.waitingForNewNumber = false;
        } else {
            // Prevent numbers exceeding 999,999,999
            if (this.currentNumber.replace('.', '').length >= 9) {
                this.showMessage("Blimey! That number be too large for this old calculator, matey!");
                return;
            }
            this.currentNumber += num;
        }
        
        this.updateDisplay();
        this.clearCount = 0; // Reset clear count when typing
    }

    inputOperator(op) {
        if (this.previousNumber !== '' && this.currentNumber !== '' && !this.waitingForNewNumber) {
            this.calculate();
        }

        this.operator = op;
        this.previousNumber = this.currentNumber;
        this.waitingForNewNumber = true;
        this.updateSecondaryDisplay();
        this.clearCount = 0;
    }

    inputDecimal() {
        if (this.waitingForNewNumber) {
            this.currentNumber = '0.';
            this.waitingForNewNumber = false;
        } else if (!this.currentNumber.includes('.')) {
            this.currentNumber += '.';
        }
        this.updateDisplay();
        this.clearCount = 0;
    }

    calculate() {
        if (this.previousNumber === '' || this.operator === '' || this.waitingForNewNumber) {
            return;
        }

        const prev = parseFloat(this.previousNumber);
        const current = parseFloat(this.currentNumber);
        let result;

        try {
            switch (this.operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        this.showMessage("BLIMEY! Can't divide by zero, matey!");
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }

            // Check for overflow
            if (!isFinite(result) || Math.abs(result) > 999999999) {
                this.showMessage("Shiver me timbers! That result be too large for the ship's log!");
                return;
            }

            // Round to 10 decimal places
            result = Math.round(result * 10000000000) / 10000000000;
            
            if (this.isPirateMode) {
                this.showPirateResult(result);
            } else {
                this.currentNumber = result.toString();
                this.updateDisplay();
            }

        } catch (error) {
            this.showMessage("Arrr! Something went wrong with that calculation, matey!");
            return;
        }

        this.previousNumber = '';
        this.operator = '';
        this.waitingForNewNumber = true;
        this.updateSecondaryDisplay();
        this.clearCount = 0;
    }

    showPirateResult(result) {
        // Show "ARRR!" for 1 second, then show result
        this.mainDisplay.textContent = 'ARRR!';
        this.mainDisplay.style.color = '#dc143c';
        
        setTimeout(() => {
            this.currentNumber = result.toString();
            this.updateDisplay();
            this.mainDisplay.style.color = '#ffd700'; // Reset to gold
        }, 1000);
    }

    clear() {
        if (this.isPirateMode) {
            this.clearCount++;
            if (this.clearCount >= 2) {
                this.deactivatePirateMode();
                this.clearCount = 0;
            }
        }

        this.currentNumber = '0';
        this.previousNumber = '';
        this.operator = '';
        this.waitingForNewNumber = false;
        this.pirateSequence = '';
        this.updateDisplay();
        this.updateSecondaryDisplay();
        this.hideMessage();
    }

    delete() {
        if (this.currentNumber.length > 1) {
            this.currentNumber = this.currentNumber.slice(0, -1);
        } else {
            this.currentNumber = '0';
        }
        this.updateDisplay();
        this.clearCount = 0;
    }

    activatePirateMode() {
        this.isPirateMode = true;
        this.pirateIndicator.style.display = 'block';
        this.showMessage("Ahoy! Pirate mode activated! Press Clear twice to exit, savvy?", 3000);
        
        // Add some visual flair
        document.body.style.animation = 'pirateActivation 0.5s ease-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }

    deactivatePirateMode() {
        this.isPirateMode = false;
        this.pirateIndicator.style.display = 'none';
        this.showMessage("Pirate mode deactivated. Back to regular sailin', matey!", 2000);
        this.clearCount = 0;
    }

    updateDisplay() {
        // Format large numbers with commas for readability
        let displayValue = this.currentNumber;
        
        if (!displayValue.includes('.') && displayValue.length > 3) {
            const num = parseInt(displayValue);
            if (!isNaN(num)) {
                displayValue = num.toLocaleString();
            }
        }
        
        this.mainDisplay.textContent = displayValue;
    }

    updateSecondaryDisplay() {
        if (this.previousNumber && this.operator) {
            const operatorSymbol = this.getOperatorSymbol(this.operator);
            this.secondaryDisplay.textContent = `${this.previousNumber} ${operatorSymbol}`;
        } else {
            this.secondaryDisplay.textContent = '';
        }
    }

    getOperatorSymbol(op) {
        switch (op) {
            case '+': return '+';
            case '-': return '−';
            case '*': return '×';
            case '/': return '÷';
            default: return op;
        }
    }

    showMessage(message, duration = 4000) {
        this.messageDisplay.textContent = message;
        this.messageContainer.style.display = 'block';
        
        // Auto-hide message after duration
        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => {
            this.hideMessage();
        }, duration);
    }

    hideMessage() {
        this.messageContainer.style.display = 'none';
        clearTimeout(this.messageTimeout);
    }

    handleKeyboard(event) {
        const key = event.key;
        
        // Prevent default for calculator keys
        if ('0123456789+-*/.='.includes(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
            event.preventDefault();
        }
        
        // Handle different key types
        if ('0123456789'.includes(key)) {
            this.inputNumber(key);
        } else if (key === '+') {
            this.inputOperator('+');
        } else if (key === '-') {
            this.inputOperator('-');
        } else if (key === '*') {
            this.inputOperator('*');
        } else if (key === '/') {
            this.inputOperator('/');
        } else if (key === '.' || key === ',') {
            this.inputDecimal();
        } else if (key === 'Enter' || key === '=') {
            this.calculate();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            this.clear();
        } else if (key === 'Backspace') {
            this.delete();
        }
    }
}

// Add CSS animation for pirate mode activation
const style = document.createElement('style');
style.textContent = `
    @keyframes pirateActivation {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new PirateCalculator();
    
    // Add some accessibility announcements
    const mainDisplay = document.getElementById('main-display');
    const observer = new MutationObserver(() => {
        // Announce changes to screen readers
        mainDisplay.setAttribute('aria-label', `Current value: ${mainDisplay.textContent}`);
    });
    
    observer.observe(mainDisplay, { childList: true, characterData: true, subtree: true });
});

// Service Worker registration for PWA capabilities (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here for offline support
        console.log('⚓ Pirate Calculator loaded and ready for action!');
    });
}