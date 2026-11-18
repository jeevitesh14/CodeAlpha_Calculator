
// ======================================
// CODEALPHA - CALCULATOR
// JavaScript Functionality
// ======================================

// Selecting HTML elements
const currentOperand = document.getElementById("current-operand");
const previousOperand = document.getElementById("previous-operand");
const buttons = document.querySelectorAll(".buttons button");

// Calculator variables
let currentValue = "0";
let previousValue = "";
let operation = null;
let shouldResetScreen = false;

// Update calculator display
function updateDisplay() {
    currentOperand.textContent = currentValue;

    if (operation !== null && previousValue !== "") {
        previousOperand.textContent =
            `${previousValue} ${operation}`;
    } else {
        previousOperand.textContent = "";
    }
}

// Enter numbers
function appendNumber(number) {
    if (currentValue === "Error") clearCalculator();

    if (shouldResetScreen) {
        currentValue = number;
        shouldResetScreen = false;
    } else {
        if (currentValue === "0") {
            currentValue = number;
        } else {
            currentValue += number;
        }
    }

    updateDisplay();
}

// Enter decimal point
function addDecimal() {
    if (currentValue === "Error") clearCalculator();

    if (shouldResetScreen) {
        currentValue = "0";
        shouldResetScreen = false;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

// Select arithmetic operation
function chooseOperation(selectedOperation) {
    if (currentValue === "Error") return;

    if (operation !== null && !shouldResetScreen) {
        calculate();
    }

    previousValue = currentValue;
    operation = selectedOperation;
    shouldResetScreen = true;

    updateDisplay();
}

// Perform calculations
function calculate() {
    if (operation === null || shouldResetScreen) return;

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    switch (operation) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                currentValue = "Error";
                previousValue = "";
                operation = null;
                shouldResetScreen = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    // Avoid floating-point precision issues
    currentValue = String(
        Number.parseFloat(result.toPrecision(12))
    );

    previousValue = "";
    operation = null;
    shouldResetScreen = true;

    updateDisplay();
}

// Clear calculator
function clearCalculator() {
    currentValue = "0";
    previousValue = "";
    operation = null;
    shouldResetScreen = false;

    updateDisplay();
}

// Delete last digit
function deleteNumber() {
    if (currentValue === "Error" || shouldResetScreen) {
        currentValue = "0";
        shouldResetScreen = false;
    } else {
        currentValue = currentValue.slice(0, -1);

        if (currentValue === "" || currentValue === "-") {
            currentValue = "0";
        }
    }

    updateDisplay();
}

// Change positive / negative sign
function changeSign() {
    if (currentValue === "Error") return;

    if (currentValue !== "0") {
        currentValue = String(parseFloat(currentValue) * -1);
    }

    updateDisplay();
}

// Calculate percentage
function calculatePercentage() {
    if (currentValue === "Error") return;

    currentValue = String(parseFloat(currentValue) / 100);
    shouldResetScreen = true;

    updateDisplay();
}

// ======================================
// BUTTON CLICK EVENTS
// ======================================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        if (button.dataset.number !== undefined) {
            appendNumber(button.dataset.number);
        }

        if (button.dataset.operation !== undefined) {
    if (button.dataset.operation === "%") {
        calculatePercentage();
    } else {
        chooseOperation(button.dataset.operation);
    }
}

        switch (button.dataset.action) {

            case "clear":
                clearCalculator();
                break;

            case "delete":
                deleteNumber();
                break;

            case "decimal":
                addDecimal();
                break;

            case "equals":
                calculate();
                break;

            case "sign":
                changeSign();
                break;
        }

        
    });

});

// ======================================
// KEYBOARD SUPPORT
// ======================================

document.addEventListener("keydown", event => {

    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        appendNumber(key);
    }

    else if (key === ".") {
        addDecimal();
    }

    else if (key === "+") {
        chooseOperation("+");
    }

    else if (key === "-") {
        chooseOperation("-");
    }

    else if (key === "*") {
        chooseOperation("×");
    }

    else if (key === "/") {
        event.preventDefault();
        chooseOperation("÷");
    }

    else if (key === "%") {
        calculatePercentage();
    }

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        deleteNumber();
    }

    else if (key === "Escape") {
        clearCalculator();
    }

});

// Initialize display
updateDisplay();

console.log("CodeAlpha Calculator Loaded Successfully!");
