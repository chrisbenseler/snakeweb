const Snake = require("./snake");

const Board = (size = 16) => {
  const _board = {};

  Array(size)
    .fill()
    .forEach((_, indexX) => {
      Array(size)
        .fill()
        .forEach((_, indexY) => {
          _board[indexX + "_" + indexY] = { snake: false };
        });
    });

  const snake = Snake({ headCoordinates: { x: 5, y: 5 } });

  const update = () => {
    const snakeCoords = [snake.head(), ...snake.tail()].map(
      (c) => c.x + "_" + c.y
    );

    Object.keys(_board).forEach((key) => {
      _board[key] = { ..._board[key], snake: snakeCoords.indexOf(key) >= 0 };
    });
  };

  update();

  return {
    snake,
    update,
    status: () => {
      return { ..._board };
    },
    tick: () => {
      snake.move();
      update();
      console.log("snack has moved");
    },
    
  };
};

const board = Board(16);
board.tick();
board.tick();
board.tick();
board.tick();
console.log(board.status());
