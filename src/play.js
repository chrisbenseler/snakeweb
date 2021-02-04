import { Board } from "./board.js";

document.addEventListener("DOMContentLoaded", function () {
  var boardContainer = document.getElementById("board-container");

  var cells = {};

  for (var iX = 0; iX < 16; iX++) {
    for (var iY = 0; iY < 16; iY++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.innerHTML = iY + "_" + iX;
      cells[iY + "_" + iX] = cell;
      boardContainer.appendChild(cell);
    }
  }

  var currentBoard = Board({ size: 16 });

  start({ currentBoard, cells });

  /*
  setTimeout(function () {
    currentBoard.snake.grow();
  }, 2100);
  setTimeout(function () {
    currentBoard.snake.changeDirection("DOWN");
  }, 3100);
  setTimeout(function () {
    currentBoard.snake.grow();
  }, 4100);
  setTimeout(function () {
    currentBoard.snake.changeDirection("LEFT");
  }, 5100);
  */
});

function start({ currentBoard, cells }) {
  const updateDraw = () => {
    const status = currentBoard.status();

    const coordinates = Object.keys(status).filter(
      (key) => status[key].snake === true
    );

    const foods = Object.keys(status).filter(
      (key) => status[key].food === true
    );

    Object.keys(cells).forEach((key) => {
      if (coordinates.indexOf(key) >= 0) {
        cells[key].classList.add("hassnake");
      } else {
        cells[key].classList.remove("hassnake");
      }

      if (foods.indexOf(key) >= 0) {
        cells[key].classList.add("hasfood");
      } else {
        cells[key].classList.remove("hasfood");
      }
    });
  };

  updateDraw();

  let newDirection = null;

  arrowsListener({
    cb: (_direction) => {
      newDirection = _direction;
    },
  });

  setInterval(function () {
    if (newDirection) {
      try {
        currentBoard.snake.changeDirection(newDirection);
      } catch (e) {}
      newDirection = null;
    }
    currentBoard.tick();
    updateDraw();
  }, 1000);

  setTimeout(() => {
    currentBoard.addFood();
  }, 5000);
}

function arrowsListener({ cb }) {
  const MOVES = {
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowRight: "RIGHT",
    ArrowLeft: "LEFT",
  };
  var container = document.getElementById("arrows");
  container.addEventListener("click", function (event) {
    var dataset = event.target.dataset;
    if (!dataset) {
      return false;
    }
    cb(dataset.direction.toUpperCase());
  });

  document.addEventListener("keyup", function (event) {
    const direction = MOVES[event.key];

    if (!direction) {
      return;
    }

    cb(direction);
  });
}
