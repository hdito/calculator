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
        case "%":
            return x % y
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
    console.log(typeof (currentValue))
    if (/[+−×÷%]/.test(char)) {
        if (lastValue === null) {
            lastValue = currentValue;
            lastScreen.textContent = currentValue + char;
            currentScreen.textContent = "0";
            currentValue = "0";
            lastOperation = char;
        } else if (currentValue === "0") {
            return
        } else {
            lastValue = operate(lastOperation, lastValue, currentValue)
            lastOperation = char;
            currentValue = "0";
            lastScreen.textContent = lastValue;
            currentScreen.textContent = currentValue;
        }
        console.table(lastOperation, currentValue, lastValue);

    } else if (char === "=") {
        if (lastOperation !== null) {
            currentValue = operate(lastOperation, lastValue, currentScreen.textContent);
            currentScreen.textContent = currentValue;
            lastScreen.textContent = null;
            lastValue = null;
        }
        console.table(lastOperation, currentValue, lastValue);

    } else if (char === "C") {
        currentValue = "0";
        lastValue = null;
        lastOperation = null;
        lastScreen.textContent = null;
        currentScreen.textContent = currentValue;
        console.table(lastOperation, currentValue, lastValue);

    } else if (char === ".") {
        if (!currentScreen.textContent.includes(".")) {
            currentScreen.textContent += char;
            currentValue = currentScreen.textContent;
        }
        console.table(lastOperation, currentValue, lastValue);

    } else if (char === "back") {
        if (currentScreen.textContent.length > 1) {
            currentScreen.textContent = currentScreen.textContent.slice(0, -1);
            currentValue = currentScreen.textContent;
        } else {
            currentScreen.textContent = "0";
            currentValue = currentScreen.textContent;
        }

    } else if (currentValue === "0") {
        currentScreen.textContent = char;
        currentValue = currentScreen.textContent;
        console.table(lastOperation, currentValue, lastValue);

    } else {
        currentScreen.textContent += char;
        currentValue = currentScreen.textContent;
        console.table(lastOperation, currentValue, lastValue);

    }
}

let currentValue = "0";
let lastValue = null;
let lastOperation = null;

const currentScreen = document.querySelector("[data-current-screen]");
currentScreen.textContent = currentValue;