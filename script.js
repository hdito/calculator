function operate(operation, x, y) {
    switch (operation) {
        case "+":
            return +x + +y
        case "−":
            return x - y
        case "×":
            return x * y
        case "÷":
            return x / y
    }
}

const digits = document.querySelectorAll("[data-digit]");
const equalButton = document.querySelector("[data-equal]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-clear]")
digits.forEach(digit => digit.addEventListener('click', (e) => display(e.currentTarget.textContent)))
equalButton.addEventListener('click', (e) => display(e.currentTarget.textContent));
operationButtons.forEach(operationButton => operationButton.addEventListener('click', (e) => display(e.currentTarget.textContent)))
clearButton.addEventListener('click', (e) => display(e.currentTarget.textContent))
function display(char) {
    const currentScreen = document.querySelector('[data-current-screen]');
    const lastScreen = document.querySelector('[data-previous-screen]');
    if (/[+−×÷]/.test(char)) {
        if (lastValue === null) {
            lastValue = currentValue;
            lastScreen.textContent = currentValue + char;
            currentScreen.textContent = null;
            currentValue = null;
            lastOperation = char;
        } else if (currentValue === null) {
            return
        } else {
            lastValue = operate(lastOperation, lastValue, currentValue)
            lastOperation = char;
            currentValue = null;
            lastScreen.textContent = lastValue;
            currentScreen.textContent = 0;
        }
    } else if (char === "=") {
        currentValue = operate(lastOperation, lastValue, currentScreen.textContent);
        currentScreen.textContent = currentValue;
        lastScreen.textContent = null;
        lastValue = null;
    } else if (char === "C") {
        currentValue = null;
        lastValue = null;
        lastOperation = null;
        lastScreen.textContent = null;
        currentScreen.textContent = null;
    } else if (currentValue === null) {
        currentScreen.textContent = char;
        currentValue = currentScreen.textContent;
    } else {
        currentScreen.textContent += char;
        currentValue = currentScreen.textContent;
    }
}

let currentValue = null;
let lastValue = null;
let lastOperation = null;
