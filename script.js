let display = document.getElementById('display');
let currentInput = '';
let historyList = [];

function appendNumber(number) {
  currentInput += number;
  display.value = currentInput;
}

function appendOperator(operator) {
  if (currentInput === '' || /[+\-*/%]$/.test(currentInput)) return;
  currentInput += operator;
  display.value = currentInput;
}

function appendDot() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    display.value = currentInput;
  }
}

function clearDisplay() {
  currentInput = '';
  display.value = '';
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

function calculateResult() {
  try {
    let result = eval(currentInput.replace('%', '/100'));
    addToHistory(`${currentInput} = ${result}`);
    currentInput = result.toString();
    display.value = currentInput;
  } catch {
    display.value = 'Error';
    currentInput = '';
  }
}

function addToHistory(entry) {
  historyList.push(entry);
  updateHistory();
}

function updateHistory() {
  const historyElement = document.getElementById('historyList');
  historyElement.innerHTML = '';
  historyList.slice().reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyElement.appendChild(li);
  });
}

function toggleHistory() {
  const historyDiv = document.getElementById('history');
  historyDiv.style.display = historyDiv.style.display === 'none' ? 'block' : 'none';
}

function clearHistory() {
  historyList = [];
  updateHistory();
}
