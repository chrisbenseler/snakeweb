

const Board = ({ snake, size, cbGrow }) => {
  const _board = {};

  let currentFood = null;

  Array(size)
    .fill()
    .forEach((_, indexX) => {
      Array(size)
        .fill()
        .forEach((_, indexY) => {
          _board[indexX + "_" + indexY] = { snake: false };
        });
    });

  

  const update = () => {
    const snakeCoords = [snake.head(), ...snake.tail()].map(
      (c) => c.x + "_" + c.y
    );

    Object.keys(_board).forEach((key) => {
      _board[key] = { ..._board[key], snake: snakeCoords.indexOf(key) >= 0 };
    });

    const head = snake.head();
    if (head.x + "_" + head.y === currentFood) {
      snake.grow();
      _board[currentFood].food = false;
      currentFood = null;
      cbGrow();
    }
  };

  const addFood = () => {
    const snakeCoords = [snake.head(), ...snake.tail()].map(
      (c) => c.x + "_" + c.y
    );

    const emptyCells = Object.keys(_board).filter(
      (key) => snakeCoords.indexOf(key) < 0
    );

    const randmon = _randomItem(emptyCells);
    console.log("Adding food in board: ", randmon);
    _board[randmon].food = true;
    currentFood = randmon;
  };

  update();

  return {
    snake,
    update,
    status: () => {
      return { ..._board };
    },
    addFood,
    tick: () => {
      snake.move();
      update();
    },
  };
};

const _randomItem = (items) => items[Math.floor(Math.random() * items.length)];

export { Board };
