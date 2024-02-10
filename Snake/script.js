let snake = [[25, 25], [25,26], [25, 27]];
let table = document.getElementById("table");
let locations = [];
let moveColumn = 0;
let moveRow = 0;
let interval;
let fruit;

for (let i = 0; i < 50; i += 1) {
  let row = document.createElement("tr");
  let rowLocation = [];
  for (let j = 0; j < 50; j += 1) {
    let column = document.createElement("td");
    let columnLocation = column;
    rowLocation.push(columnLocation);
    row.appendChild(column);
  }
  locations.push(rowLocation);
  table.appendChild(row);
}

function startGame() {
  interval = setInterval(drawSnake, 100);
}

function drawSnake() {
  let last = snake[snake.length - 1]; // Added 'let' keyword here
  locations[last[0]][last[1]].className = "";

  let newRow = snake[0][0];
  let newColumn = snake[0][1];
  let oldRow = snake[0][0];
  let oldColumn = snake[0][1];
  snake[0][0] += moveRow;
  snake[0][1] += moveColumn;

  for (let i = 1; i < snake.length; i += 1) {
    oldRow = snake[i][0];
    oldColumn = snake[i][1];
    snake[i][0] = newRow;
    snake[i][1] = newColumn;
    newRow = oldRow;
    newColumn = oldColumn;
  }

  locations[snake[0][0]][snake[0][1]].className = "snake";
  checkEatFruit(snake[0][0], snake[0][1]);
}

document.addEventListener("keypress", function (e) {
  if (e.key === "d") {
    moveColumn = 1;
    moveRow = 0;
  } else if (e.key === "s") {
    moveColumn = 0;
    moveRow = 1;
  } else if (e.key === "a") {
    moveColumn = -1;
    moveRow = 0;
  } else if (e.key === "w") {
    moveColumn = 0;
    moveRow = -1;
  }
});

function createFruit() {
  let row = Math.floor(Math.random() * 25);
  let column = Math.floor(Math.random() * 25);
  while (snake.some(segment => segment[0] === row && segment[1] === column)) { // Simplified condition to avoid redeclaration
    row = Math.floor(Math.random() * 25);
    column = Math.floor(Math.random() * 25);
  }
  fruit = locations[row][column];
  fruit.className = "fruit";
}

function checkEatFruit(row, column) {
  if (fruit === locations[row][column]) {
    let lastSegment = snake[snake.length - 1]; // Changed variable name to avoid confusion
    let newRow = lastSegment[0]; // Changed variable name to avoid confusion
    let newColumn = lastSegment[1]; // Changed variable name to avoid confusion
    snake.push([newRow, newColumn]);
    createFruit();
  }
}

startGame();
createFruit();
