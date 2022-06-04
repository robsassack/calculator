const numberButton = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const decimal = document.querySelector(".decimal");
const opButton = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const answer = document.querySelector(".answer");
const previousOp = document.querySelector(".previous-operation");

let firstNumber = "";
let secondNumber = "";
let currentOperation = "";

numberButton.forEach(function (number) {
  number.addEventListener("click", (e) => {
    if (currentOperation === "") {
      if (firstNumber.toString() !== "0") {
        firstNumber += e.target.innerText;
      }
      if (firstNumber.toString() === "0") {
        if (e.target.innerText !== "0") {
          firstNumber = e.target.innerText;
        }
      }
    } else {
      secondNumber += e.target.innerText;
    }
    answerDisplay();
  });
});

deleteButton.addEventListener("click", () => {
  if (secondNumber !== '') {
    secondNumber = secondNumber.toString().slice(0, -1);
  } else if (currentOperation !== '') {
    currentOperation = '';
  } else if (firstNumber !== '') {
    firstNumber = firstNumber.toString().slice(0, -1);
  }
  answerDisplay();
});

clearButton.addEventListener("click", () => {
  if (firstNumber === '' && previousOp !== '') {
    previousOp.innerText = '';
  }
  firstNumber = '';
  secondNumber = '';
  currentOperation = '';
  answer.innerText = "";
});

decimal.addEventListener("click", () => {
  if (secondNumber !== '' && !secondNumber.includes(".")) {
    secondNumber += '.';
  } if (secondNumber === '' && currentOperation !== '') {
    secondNumber = '.';
  } else if (!firstNumber.toString().includes('.')){
    firstNumber += '.';
  }
  answerDisplay();
});

equalsButton.addEventListener("click", () => {
  if (firstNumber !== ''
  && secondNumber !== ''
  && currentOperation !== '') {
    previousOp.innerText = `${firstNumber}${currentOperation}${secondNumber}=`;
    firstNumber = round(operate(currentOperation, firstNumber, secondNumber));
    answer.innerText = firstNumber;
    secondNumber = '';
    currentOperation = '';
  } else if (firstNumber !== '' && currentOperation === '') {
    previousOp.innerText = `${firstNumber}=`;
    answer.innerText = firstNumber;
    secondNumber = '';
    currentOperation = '';
  }
});

opButton.forEach(function (op) {
  op.addEventListener("click", (e) => {
    if (firstNumber === "") {
      firstNumber = 0;
      setCurrentOp(e);
    } else if (secondNumber === "") {
      setCurrentOp(e);
    } else {
      previousOp.innerText = `${firstNumber}${currentOperation}${secondNumber}=`;
      firstNumber = round(operate(currentOperation, firstNumber, secondNumber));
      answer.innerText = firstNumber;
      setCurrentOp(e);
      secondNumber = '';
      answerDisplay();
    }
  });
});

function setCurrentOp(e) {
  switch (e.target.innerText) {
    case "÷":
      currentOperation = "/";
      break;
    case "×":
      currentOperation = "*";
      break;
    case "−":
      currentOperation = "-";
      break;
    case "+":
      currentOperation = "+";
      break;
  }
  answerDisplay();
}

function answerDisplay() {
  answer.innerText = `${firstNumber}${currentOperation}${secondNumber}`;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function round(number) {
  return number.toFixed(8).replace(/\.?0+$/, "");
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "Divide by 0 error";
      }
      return divide(a, b);
  }
}
