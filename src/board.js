const Board = ({ snake, sizeX, sizeY, cbGrow }) => {
  const _board = _init(sizeX, sizeY);

  let currentFood = null;

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
    currentFood = _addFood(snake, _board);
  };

  const _isSnakeInBoard = (head) => {
    return !(
      head.x > sizeX - 1 ||
      head.x < 0 ||
      head.y > sizeY - 1 ||
      head.y < 0
    );
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
      if (snake.overlap({ head: snake.head(), tail: snake.tail() })) {
        throw Error("Snake has eaten itself");
      }

      if (!_isSnakeInBoard(snake.head())) {
        throw Error("Snake is out of bounds");
      }
    },
  };
};

const _randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const _init = (sizeX, sizeY) => {
  const _board = {};
  Array(sizeX)
    .fill()
    .forEach((_, indexX) => {
      Array(sizeY)
        .fill()
        .forEach((_, indexY) => {
          _board[indexX + "_" + indexY] = { snake: false };
        });
    });
  return _board;
};

const _addFood = (snake, _board) => {
  const snakeCoords = [snake.head(), ...snake.tail()].map(
    (c) => c.x + "_" + c.y
  );

  const emptyCells = Object.keys(_board).filter(
    (key) => snakeCoords.indexOf(key) < 0
  );

  const random = _randomItem(emptyCells);
  _board[random].food = true;
  return random;
};

export { Board };
