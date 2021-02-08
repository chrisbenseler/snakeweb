import { Board } from "./board.js";
import { Snake } from "./snake.js";

document.addEventListener("DOMContentLoaded", function () {
  var boardContainer = document.getElementById("board-container");

  var cells = {};

  for (var iX = 0; iX < 16; iX++) {
    for (var iY = 0; iY < 16; iY++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      // cell.innerHTML = iY + "_" + iX;
      cells[iY + "_" + iX] = cell;
      boardContainer.appendChild(cell);
    }
  }

  const cbGrow = () => {
    console.log("has eaten");
    addFoodTimer({ board: currentBoard, timeout: 1500 });
  };

  const snake = Snake({ headCoordinates: { x: 5, y: 5 } });

  var currentBoard = Board({
    snake,
    size: 16,
    cbGrow,
  });

  start({ currentBoard, cells });
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
  }, 500);

  addFoodTimer({ board: currentBoard });
}

const addFoodTimer = ({ board, timeout = 5000 }) => {
  var timer = setTimeout(() => {
    board.addFood();
  }, timeout);

  return timer;
};

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
