const numberButton = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const decimal = document.querySelector(".decimal");
const opButton = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const answer = document.querySelector(".answer");
const previousOp = document.querySelector(".previous-operation");

let currentPrompt = "";
let currentOperation = "";

numberButton.forEach(function (number) {
  number.addEventListener("click", (e) => {
    currentPrompt += e.target.innerText;
    answer.innerText = currentPrompt;
  });
});

deleteButton.addEventListener("click", () => {
  if (currentPrompt.toString().slice(-3) === 'NaN') {
    currentPrompt = currentPrompt.toString().slice(0, -3);
  } else if (currentPrompt.slice(-2) === "e+") {
    currentPrompt = currentPrompt.slice(0, -2);
  } else {
    currentPrompt = currentPrompt.slice(0, -1);
  }
  answer.innerText = currentPrompt;
});

clearButton.addEventListener("click", () => {
  currentPrompt = "";
  answer.innerText = "";
});

decimal.addEventListener("click", (e) => {
  numbers = currentPrompt.split(/[/*+\-]/);
  if (numbers.length < 2) {
    if (!numbers[0].includes(".")) {
      currentPrompt += ".";
      answer.innerText = currentPrompt;
    }
  } else if (!numbers[1].includes(".")) {
    currentPrompt += ".";
    answer.innerText = currentPrompt;
  }
});

equalsButton.addEventListener("click", () => {
  numbers = currentPrompt.split(/[/*\-+]/);
  let opAnswer = operate(currentOperation, numbers[0], numbers[1]);
  answer.innerText = opAnswer;
  previousOp.innerText = `${numbers[0]}${currentOperation}${numbers[1]}=`;
  currentOperation = "";
  currentPrompt = opAnswer;
});

opButton.forEach(function (op) {
  //   op.addEventListener("click", (e) => {
  //     numbers = currentPrompt.split(/[/*\-+]/);
  //     if (numbers.length === 2) {
  //       // logic here for doing the calculation if there are already two numbers
  //       if (numbers[1] === "") {
  //         // second number is blank
  //         console.log("second number blank");
  //       } else {
  //         console.log("two numbers");
  //       }
  //     } else if (numbers.length === 1) {
  //       if (numbers[0] === "." || numbers[0] === "") {
  //         // put a zero if first number is just a decimal or blank
  //         currentPrompt += "0";
  //         opAddToPrompt(e);
  //         // } else if (numbers[0] === '') {
  //         //     // put a zero
  //         //     console.log('number 0 is blank');
  //       } else {
  //         opAddToPrompt(e);
  //       }
  //     }
  //   });
  op.addEventListener("click", (e) => {
    opAddToPrompt(e);
  });
});

function opAddToPrompt(e) {
  switch (e.target.innerText) {
    case "÷":
      currentPrompt += "/";
      currentOperation = "/";
      break;
    case "×":
      currentPrompt += "*";
      currentOperation = "*";
      break;
    case "−":
      currentPrompt += "-";
      currentOperation = "-";
      break;
    case "+":
      currentPrompt += "+";
      currentOperation = "+";
      break;
  }
  answer.innerText = currentPrompt;
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
      return divide(a, b);
  }
}
