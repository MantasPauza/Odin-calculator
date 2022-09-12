const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const prevOper = document.querySelector(".prev_oper");
const currentOper = document.querySelector(".current_oper");

class Calculator {
  constructor(prevOper, currentOper) {
    this.prevOper = prevOper;
    this.currentOper = currentOper;
    this.clear();
  }
  clear() {
    this.currentOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    console.log(this.currentOperand);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += number;
  }

  appendOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.prevOperand !== '') {
        this.operate()
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = '';

  }

  operate() {
    let result 
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    if (this.operation === '+') {
        result = current + prev;
    } else if (this.operation === '-') {
        result = current - prev;
        console.log(result);
    } else if (this.operation === '*') {
        result = current * prev;
    } else if (this.operation === '/') {
        result = current / prev;
    } else return;
    this.currentOperand = result;
    this.operation = undefined;
    this.prevOperand = '';
  }
  updateScreen() {
    this.currentOper.innerText = this.currentOperand;
    if (this.operation != null) {
        this.prevOper.innerText = `${this.prevOperand} ${this.operation}`
    } else {
        this.prevOper.innerText = '';
    }
  }
}

const calculator = new Calculator(prevOper, currentOper);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateScreen();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendOperation(button.innerText);
    calculator.updateScreen();
  });
});

equalButton.addEventListener("click", button => {
    calculator.operate();
    calculator.updateScreen();
    
});

clearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateScreen();
});

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateScreen();
});