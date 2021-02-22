import { Board } from "./board.js";
import { Snake } from "./snake.js";

document.addEventListener("DOMContentLoaded", function () {
  var boardContainer = document.getElementById("board-container");

  var cells = {};

  var sizeX = 12;
  var sizeY = 8;

  for (var iY = 0; iY < sizeY; iY++) {
    for (var iX = 0; iX < sizeX; iX++) {
      var cell = document.createElement("div");
      cell.className = "cell " + iX + "_" + iY;
      cells[iX + "_" + iY] = cell;
      boardContainer.appendChild(cell);
    }
  }

  var startButton = document.getElementById("controls-start");
  startButton.addEventListener("click", function (event) {
    init(cells);
  });
});

function init(cells) {
  var cbGrow = () => {
    addFoodTimer({ board: currentBoard, timeout: 500 });
  };

  var snake = Snake({ headCoordinates: { x: 4, y: 4 } });

  var currentBoard = Board({
    snake,
    sizeX: 12,
    sizeY: 8,
    cbGrow,
  });

  start({ currentBoard, cells });
}

function start({ currentBoard, cells }) {
  var updateDraw = () => {
    var status = currentBoard.status();

    var coordinates = Object.keys(status).filter(
      (key) => status[key].snake === true
    );

    var foods = Object.keys(status).filter((key) => status[key].food === true);

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

  var newDirection = null;

  arrowsListener({
    cb: (_direction) => {
      newDirection = _direction;
    },
  });

  var interval = setInterval(function () {
    if (newDirection) {
      try {
        currentBoard.snake.changeDirection(newDirection);
      } catch (e) {}
      newDirection = null;
    }
    try {
      currentBoard.tick();
      updateDraw();
    } catch (e) {
      alert(e);
      clearInterval(interval);
    }
  }, 250);

  addFoodTimer({ board: currentBoard });
}

var addFoodTimer = ({ board, timeout = 1500 }) => {
  var timer = setTimeout(() => {
    board.addFood();
  }, timeout);

  return timer;
};

function arrowsListener({ cb }) {
  var MOVES = {
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowRight: "RIGHT",
    ArrowLeft: "LEFT",
    8: "UP",
    2: "DOWN",
    6: "RIGHT",
    4: "LEFT",
  };
  var container = document.getElementById("arrows");
  container.addEventListener("click", function (event) {
    event.preventDefault();
    var dataset = event.target.dataset;
    if (!dataset) {
      return false;
    }
    cb(dataset.direction.toUpperCase());
  });

  document.addEventListener("keyup", function (event) {
    var direction = MOVES[event.key];

    if (!direction) {
      return;
    }

    cb(direction);
  });
}
