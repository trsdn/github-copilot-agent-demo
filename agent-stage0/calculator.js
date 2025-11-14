// Calculator - Stage 0 Demo
// This is a minimal starting point - Agent Mode will help us add functionality!

let currentValue = '0';
let previousValue = null;
let currentOperation = null;
let shouldResetDisplay = false;

// Display functions
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = currentValue;
}

function clearDisplay() {
    currentValue = '0';
    previousValue = null;
    currentOperation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else if (num === '.' && currentValue.includes('.')) {
            return; // Don't add multiple decimal points
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

function setOperation(operation) {
    if (currentOperation !== null) {
        calculate();
    }
    previousValue = currentValue;
    currentOperation = operation;
    shouldResetDisplay = true;
}

function calculate() {
    // TODO: Add calculation logic during demo
    // This is where Agent Mode will help us implement:
    // - add function
    // - subtract function
    // - multiply function
    // - divide function
    
    console.log('Calculate:', previousValue, currentOperation, currentValue);
    
    // Placeholder - will be implemented during demo
    alert('Calculator functions will be added during the demo using Copilot Agent Mode!');
}

// Initialize display
updateDisplay();
