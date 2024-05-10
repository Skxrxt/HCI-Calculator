document.addEventListener('DOMContentLoaded', function() {
        const inputDisplay = document.getElementById('input-display');
        let currentInput = '';
        let inputHistory = '';
        let previousValue = 0;
        let currentOperator = '';
        let hasDecimal = false;
        let isEqualPressed = false;
        let isOutputDisplayed = false;
        const clearButton = document.getElementById('clear-button');
        const equalButton = document.getElementById('equal-button');
        const operators = document.querySelectorAll('.operator');
    
        function updateDisplay(value) {
            inputDisplay.textContent = value;
        }
    
        function clearDisplay() {
            inputDisplay.textContent = '';
        }
    
        function clearAll() {
            currentInput = '';
            inputHistory = '';
            previousValue = 0;
            currentOperator = '';
            hasDecimal = false;
            isOutputDisplayed = false;
            clearDisplay();
            enableOperators();
            equalButton.disabled = false;
            clearButton.disabled = true;
        }
    
        function calculateResult(num1, num2, operator) {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            switch (operator) {
                case '+':
                    return num1 + num2;
                case '-':
                    return num1 - num2;
                case '×':
                    return num1 * num2;
                case '÷':
                    if (num2 !== 0) {
                        return num1 / num2;
                    } else {
                        return 'Error: Division by zero';
                    }
                case '%':
                    return num1 % num2;
                default:
                    return 'Error: Invalid operator';
            }
        }
    
        function disableOperators() {
            operators.forEach(operator => {
                operator.disabled = true;
            });
        }
    
        function enableOperators() {
            operators.forEach(operator => {
                operator.disabled = false;
            });
        }
    
        document.querySelectorAll('.grid-item button').forEach(button => {
            button.addEventListener('click', function() {
                const buttonValue = this.textContent;
    
                if (buttonValue === 'C') {
                    clearAll();
                    return;
                }
    
                if (buttonValue === 'AC') {
                    clearDisplay();
                    clearAll();
                    return;
                }
    
                if (isOutputDisplayed) {
                    return;
                }
    
                if (!isNaN(parseFloat(buttonValue)) || buttonValue === '.') {
                    if (buttonValue === '.' && hasDecimal) {
                        return;
                    }
    
                    currentInput += buttonValue;
                    inputHistory += buttonValue;
                    updateDisplay(inputHistory);
                    if (buttonValue === '.') {
                        hasDecimal = true;
                    }
                    clearButton.disabled = false;
                } else if (['+', '-', '×', '÷', '%'].includes(buttonValue)) {
                    if (currentInput !== '' && currentInput[currentInput.length - 1] !== '.') {
                        if (currentOperator !== '') {
                            previousValue = calculateResult(previousValue, currentInput, currentOperator);
                            inputHistory += ' ' + buttonValue + ' ';
                            updateDisplay(inputHistory);
                        } else {
                            previousValue = parseFloat(currentInput);
                            inputHistory += ' ' + buttonValue + ' ';
                            updateDisplay(inputHistory);
                        }
                        currentInput = '';
                        currentOperator = buttonValue;
                        hasDecimal = false;
                        disableOperators(); // Disable operators when an operator is pressed
                    }
                } else if (buttonValue === '=') {
                    if (currentInput !== '' && currentOperator !== '' && currentInput[currentInput.length - 1] !== '.') {
                        previousValue = calculateResult(previousValue, currentInput, currentOperator);
                        if (isNaN(previousValue)) {
                            updateDisplay('Error');
                            isOutputDisplayed = true;
                        } else {
                            clearDisplay();
                            updateDisplay(previousValue);
                            isEqualPressed = true;
                            isOutputDisplayed = true;
                        }
                        disableOperators();
                    }
                }
            });
        });
        
        clearButton.addEventListener('click', clearAll);
    });
    