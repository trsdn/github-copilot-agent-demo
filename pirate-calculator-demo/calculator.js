/**
 * Pirate Calculator - JavaScript Implementation
 * Arrr! This be the brain of our calculator ship!
 */

class PirateCalculator {
    constructor() {
        this.display = document.getElementById('display');
        this.pirateIndicator = document.getElementById('pirate-indicator');
        
        // Calculator state
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.waitingForOperand = false;
        
        // Pirate mode state
        this.pirateMode = false;
        this.pirateSequence = '';
        this.clearCount = 0;
        
        // Initialize event listeners
        this.initializeEventListeners();
        this.initializeKeyboardSupport();
    }
    
    initializeEventListeners() {
        // Number buttons
        document.querySelectorAll('.btn-number').forEach(button => {
            button.addEventListener('click', () => {
                if (button.id === 'decimal') {
                    this.inputDecimal();
                } else {
                    this.inputDigit(button.textContent);
                }
            });
        });
        
        // Operator buttons
        document.getElementById('add').addEventListener('click', () => this.inputOperation('+'));
        document.getElementById('subtract').addEventListener('click', () => this.inputOperation('-'));
        document.getElementById('multiply').addEventListener('click', () => this.inputOperation('*'));
        document.getElementById('divide').addEventListener('click', () => this.inputOperation('/'));
        
        // Function buttons
        document.getElementById('equals').addEventListener('click', () => this.calculate());
        document.getElementById('clear').addEventListener('click', () => this.clear());
        document.getElementById('delete').addEventListener('click', () => this.delete());
    }
    
    initializeKeyboardSupport() {
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            // Prevent default for calculator keys
            if ('0123456789+-*/.=cC'.includes(key) || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
                event.preventDefault();
            }
            
            // Number keys
            if (/[0-9]/.test(key)) {
                this.inputDigit(key);
            }
            
            // Operator keys
            else if (key === '+') this.inputOperation('+');
            else if (key === '-') this.inputOperation('-');
            else if (key === '*') this.inputOperation('*');
            else if (key === '/') this.inputOperation('/');
            
            // Function keys
            else if (key === 'Enter' || key === '=') this.calculate();
            else if (key === 'Escape' || key === 'c' || key === 'C') this.clear();
            else if (key === 'Backspace') this.delete();
            else if (key === '.') this.inputDecimal();
        });
    }
    
    inputDigit(digit) {
        // Check for pirate mode sequence (7734)
        this.checkPirateSequence(digit);
        
        if (this.waitingForOperand) {
            this.currentOperand = digit;
            this.waitingForOperand = false;
        } else {
            if (this.currentOperand === '0') {
                this.currentOperand = digit;
            } else {
                // Prevent numbers from exceeding the limit
                if (this.currentOperand.replace('.', '').length >= 9) {
                    this.showError("Number too large, matey!");
                    return;
                }
                this.currentOperand += digit;
            }
        }
        
        this.updateDisplay();
        this.clearCount = 0; // Reset clear count when inputting
    }
    
    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentOperand = '0.';
            this.waitingForOperand = false;
        } else if (this.currentOperand.indexOf('.') === -1) {
            this.currentOperand += '.';
        }
        
        this.updateDisplay();
        this.clearCount = 0;
    }
    
    inputOperation(nextOperation) {
        const inputValue = parseFloat(this.currentOperand);
        
        if (this.previousOperand === '') {
            this.previousOperand = this.currentOperand;
        } else if (this.operation) {
            const currentValue = this.previousOperand || '0';
            const newValue = this.performCalculation(currentValue, this.currentOperand, this.operation);
            
            if (newValue === null) return; // Error occurred
            
            this.currentOperand = String(newValue);
            this.previousOperand = this.currentOperand;
        }
        
        this.waitingForOperand = true;
        this.operation = nextOperation;
        this.clearCount = 0;
    }
    
    calculate() {
        if (this.operation && this.previousOperand !== '' && !this.waitingForOperand) {
            const newValue = this.performCalculation(this.previousOperand, this.currentOperand, this.operation);
            
            if (newValue === null) return; // Error occurred
            
            // Pirate mode: show "ARRR!" before result
            if (this.pirateMode) {
                this.showPirateResult(String(newValue));
            } else {
                this.currentOperand = String(newValue);
                this.updateDisplay();
            }
            
            this.previousOperand = '';
            this.operation = null;
            this.waitingForOperand = true;
        }
        this.clearCount = 0;
    }
    
    performCalculation(firstOperand, secondOperand, operation) {
        const prev = parseFloat(firstOperand);
        const current = parseFloat(secondOperand);
        
        if (isNaN(prev) || isNaN(current)) return null;
        
        let result;
        
        switch (operation) {
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
                    this.showError("BLIMEY! Can't divide by zero, matey!");
                    return null;
                }
                result = prev / current;
                break;
            default:
                return null;
        }
        
        // Check for overflow
        if (Math.abs(result) > 999999999) {
            this.showError("Result too large, captain!");
            return null;
        }
        
        // Round to 10 decimal places to handle floating point precision
        return Math.round(result * 10000000000) / 10000000000;
    }
    
    clear() {
        this.clearCount++;
        
        // Exit pirate mode if Clear pressed twice
        if (this.clearCount >= 2 && this.pirateMode) {
            this.exitPirateMode();
            this.clearCount = 0;
            return;
        }
        
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.waitingForOperand = false;
        this.pirateSequence = '';
        this.updateDisplay();
    }
    
    delete() {
        if (this.currentOperand.length > 1) {
            this.currentOperand = this.currentOperand.slice(0, -1);
        } else {
            this.currentOperand = '0';
        }
        this.updateDisplay();
        this.clearCount = 0;
    }
    
    checkPirateSequence(digit) {
        this.pirateSequence += digit;
        
        // Keep only the last 4 digits
        if (this.pirateSequence.length > 4) {
            this.pirateSequence = this.pirateSequence.slice(-4);
        }
        
        // Check for the magic sequence: 7734
        if (this.pirateSequence === '7734') {
            this.enterPirateMode();
            this.pirateSequence = '';
        }
    }
    
    enterPirateMode() {
        this.pirateMode = true;
        this.pirateIndicator.classList.add('active');
        this.showTemporaryMessage("🏴‍☠️ PIRATE MODE ACTIVATED! 🏴‍☠️");
    }
    
    exitPirateMode() {
        this.pirateMode = false;
        this.pirateIndicator.classList.remove('active');
        this.showTemporaryMessage("⚓ Back to normal waters, matey! ⚓");
    }
    
    showPirateResult(result) {
        // Show "ARRR!" first
        this.display.textContent = "ARRR!";
        this.display.classList.add('pirate-flash');
        
        // After 1 second, show the actual result
        setTimeout(() => {
            this.display.classList.remove('pirate-flash');
            this.currentOperand = result;
            this.updateDisplay();
        }, 1000);
    }
    
    showTemporaryMessage(message) {
        const originalText = this.display.textContent;
        this.display.textContent = message;
        
        setTimeout(() => {
            this.updateDisplay();
        }, 2000);
    }
    
    showError(message) {
        this.display.textContent = message;
        this.display.classList.add('pirate-flash');
        
        setTimeout(() => {
            this.display.classList.remove('pirate-flash');
            this.updateDisplay();
        }, 2000);
    }
    
    updateDisplay() {
        // Format the number for display
        let displayValue = this.currentOperand;
        
        // Handle very long numbers
        if (displayValue.length > 12) {
            const num = parseFloat(displayValue);
            if (Math.abs(num) >= 1000000000) {
                displayValue = num.toExponential(2);
            } else {
                displayValue = num.toPrecision(10);
            }
        }
        
        this.display.textContent = displayValue;
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PirateCalculator();
});

// Add some pirate flair to console
console.log(`
🏴‍☠️ Ahoy! Pirate Calculator loaded successfully! 🏴‍☠️
⚓ Enter "7734" to discover the hidden treasure! ⚓
🗺️ Fair winds and happy calculating, matey! 🗺️
`);
