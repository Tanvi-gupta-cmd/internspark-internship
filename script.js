let currentInput = "0";
let previousInput = "";
let operator = null;

const calculator = document.getElementById("calculator");

function createCalculator() {

  const display = document.createElement("div");
  display.className = "display";
  display.id = "display";
  display.textContent = "0";

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons";

  const buttons = [
    "C", "±", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "−",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  buttons.forEach(text => {

    const btn = document.createElement("button");

    btn.textContent = text;
    btn.classList.add("btn");

    if(["÷","×","−","+","="].includes(text)){
      btn.classList.add("operator");
    }

    if(["C","±","%"].includes(text)){
      btn.classList.add("action");
    }

    if(text === "0"){
      btn.classList.add("zero");
    }

    btn.addEventListener("click", () => {
      handleInput(text);
    });

    buttonsContainer.appendChild(btn);
  });

  calculator.appendChild(display);
  calculator.appendChild(buttonsContainer);
}

function updateDisplay() {
  document.getElementById("display").textContent = currentInput;
}

function handleInput(value) {

  if(!isNaN(value)){
    inputNumber(value);
  }
  else{

    switch(value){

      case ".":
        addDecimal();
        break;

      case "+":
        chooseOperator("+");
        break;

      case "−":
        chooseOperator("-");
        break;

      case "×":
        chooseOperator("*");
        break;

      case "÷":
        chooseOperator("/");
        break;

      case "=":
        calculate();
        break;

      case "C":
        clearCalculator();
        break;

      case "%":
        currentInput =
          String(parseFloat(currentInput)/100);
        break;

      case "±":
        toggleSign();
        break;
    }
  }

  updateDisplay();
}

function inputNumber(num){

  if(currentInput === "0"){
    currentInput = num;
  }else{
    currentInput += num;
  }
}

function addDecimal(){

  if(!currentInput.includes(".")){
    currentInput += ".";
  }
}

function chooseOperator(op){

  previousInput = currentInput;
  operator = op;
  currentInput = "0";
}

function calculate(){

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if(isNaN(prev) || isNaN(current)) return;

  let result;

  switch(operator){

    case "+":
      result = prev + current;
      break;

    case "-":
      result = prev - current;
      break;

    case "*":
      result = prev * current;
      break;

    case "/":
      result =
        current === 0
        ? "Error"
        : prev / current;
      break;

    default:
      return;
  }

  currentInput = String(result);
  operator = null;
  previousInput = "";
}

function clearCalculator(){

  currentInput = "0";
  previousInput = "";
  operator = null;
}

function toggleSign(){

  if(currentInput === "0") return;

  currentInput =
    currentInput.startsWith("-")
    ? currentInput.slice(1)
    : "-" + currentInput;
}

document.addEventListener("keydown",(e)=>{

  if(e.key >= "0" && e.key <= "9"){
    handleInput(e.key);
  }

  if(e.key === ".") handleInput(".");
  if(e.key === "+") handleInput("+");
  if(e.key === "-") handleInput("−");
  if(e.key === "*") handleInput("×");

  if(e.key === "/"){
    e.preventDefault();
    handleInput("÷");
  }

  if(e.key === "Enter"){
    handleInput("=");
  }

  if(e.key === "Escape"){
    handleInput("C");
  }
});

createCalculator();