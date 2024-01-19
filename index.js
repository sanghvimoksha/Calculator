const inputBox = document.getElementById('inputBox');
const buttons = document.querySelectorAll('button');

let expression = '';

// Custom function to evaluate expressions
function calculateExpression() {
    try {
        const result = Function(`'use strict'; return (${expression.replace("%", "/100")})`)();
        return String(result);
    } catch (error) {
        return 'Error';
    }
}

// Function to handle button click
function handleButtonClick(buttonText) {
    if (buttonText === '=') {
        expression = calculateExpression();
        inputBox.value = expression;
    } else if (buttonText === 'AC') {
        expression = '';
        inputBox.value = expression;
    } else if (buttonText === 'DEL') {
        expression = expression.slice(0, -1);
        inputBox.value = expression;
    } else if (buttonText === 'plusMinus') {
        expression = expression.startsWith('-') ? expression.slice(1) : `-${expression}`;
        inputBox.value = expression;
    } else if (buttonText === '%') {
        expression += '/100';
        inputBox.value = expression;
    } else {
        expression += buttonText;
        inputBox.value = expression;
    }
}

// Event listener for button clicks
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        handleButtonClick(event.target.innerText);
    });
});

// Event listener for keypress
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.', '%', 'Enter', 'Backspace'];
    
    if (validKeys.includes(key)) {
        if (key === 'Enter') {
            handleButtonClick('=');
        } else if (key === 'Backspace') {
            handleButtonClick('DEL');
        } else {
            handleButtonClick(key);
        }
    }
});