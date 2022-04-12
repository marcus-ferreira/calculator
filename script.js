const display = document.querySelector('.display');
const buttons = document.getElementsByTagName('button');
const previousDisplay = document.querySelector('.previous-calculation');
const currentDisplay = document.querySelector('.current-calculation');

let firstOperand = null;
let secondOperand = null;
let operator = null;

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('touchstart', () => {

		if (i === 0) {
			// Clear
			firstOperand = null;
			secondOperand = null;
			operator = null;
			currentDisplay.innerHTML = 0;
			previousDisplay.innerHTML = '';

		} else if (i === 1) {
			// Backspace
			if (currentDisplay.innerHTML.length > 1) {
				currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1);
			} else {
				currentDisplay.innerHTML = 0;
			}

		} else if (i === 5) {
			// Divide
			addOperator('/');

		} else if (i === 9) {
			// Times
			addOperator('*');

		} else if (i === 13) {
			// Minus
			addOperator('-');

		} else if (i === 17) {
			// Plus
			addOperator('+');

		} else if (i === 14) {
			// Comma
			if (currentDisplay.innerHTML.indexOf(',') === -1) {
				currentDisplay.innerHTML += ',';
			}

		} else if (i === 16) {
			// Equals
			equals();

		} else if (buttons[i].innerHTML >= 0 && buttons[i].innerHTML <= 9) {
			// Numbers
			addNumber(buttons[i].innerHTML);
		}

	});
}

function addNumber(number) {
	if (currentDisplay.innerHTML === '0') {
		currentDisplay.innerHTML = number;
	} else if (currentDisplay.innerHTML.length < 11) {
		currentDisplay.innerHTML += number;
	}
}

function addOperator(op) {
	if (firstOperand === null) {
		firstOperand = currentDisplay.innerHTML;
		operator = op;
		previousDisplay.innerHTML = `${firstOperand} ${operator}`;
		currentDisplay.innerHTML = 0;
	}
}

function equals() {
	if (firstOperand != null && operator != null) {

		previousDisplay.innerHTML = `${firstOperand} ${operator} ${currentDisplay.innerHTML} =`;

		if (operator === '+') {
			currentDisplay.innerHTML = parseFloat(firstOperand.replace(',', '.')) + parseFloat(currentDisplay.innerHTML.replace(',', '.'));
		} else if (operator === '-') {
			currentDisplay.innerHTML = parseFloat(firstOperand.replace(',', '.')) - parseFloat(currentDisplay.innerHTML.replace(',', '.'));
		} else if (operator === '*') {
			currentDisplay.innerHTML = parseFloat(firstOperand.replace(',', '.')) * parseFloat(currentDisplay.innerHTML.replace(',', '.'));
		} else if (operator === '/') {
			currentDisplay.innerHTML = parseFloat(firstOperand.replace(',', '.')) / parseFloat(currentDisplay.innerHTML.replace(',', '.'));
		}

		if (currentDisplay.innerHTML.toString().length > 11) {
			currentDisplay.innerHTML = currentDisplay.innerHTML.toString().slice(0, 11);
		}

		currentDisplay.innerHTML = currentDisplay.innerHTML.replace('.', ',');
		firstOperand = null;
		secondOperand = null;
		operator = null;
	}
}
