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

  const updateDraw = () => {
    const status = currentBoard.status();

    const coordinates = Object.keys(status).filter(
      (key) => status[key].snake === true
    );

    Object.keys(cells).forEach((key) => {
      if (coordinates.indexOf(key) >= 0) {
        cells[key].classList.add("hassnake");
      } else {
        cells[key].classList.remove("hassnake");
      }
    });
  };

  updateDraw();

  setTimeout(() => {
    currentBoard.tick();
    updateDraw();
  }, 1000);
  setTimeout(() => {
    currentBoard.tick();
    updateDraw();
  }, 2000);


  setTimeout(() => {
    currentBoard.snake.grow();
    currentBoard.tick();
    updateDraw();
  }, 3000);

  setTimeout(() => {
    currentBoard.tick();
    updateDraw();
  }, 4000);

  setTimeout(() => {
    currentBoard.tick();
    updateDraw();
  }, 5000);

  setTimeout(() => {
    currentBoard.snake.grow();
    currentBoard.tick();
    updateDraw();
  }, 6000);


});
