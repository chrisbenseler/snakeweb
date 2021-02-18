const Snake = ({ headCoordinates, direction = "RIGHT" }) => {
  let head = headCoordinates;
  let tail = [];
  let currentDirection = direction;
  let tailLength = 0;

  const MOVES = {
    RIGHT: { x: 1, y: 0 },
    LEFT: { x: -1, y: 0 },
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
  };

  return {
    head: () => head,
    tail: () => tail,
    direction: () => currentDirection,
    move: () => {
      const movement = MOVES[currentDirection];
      const _currentHead = { ...head };
      const _nextHead = { x: head.x + movement.x, y: head.y + movement.y };
      head = { ..._nextHead };
      tail = [_currentHead, ...tail].slice(0, tailLength);
    },
    changeDirection: (key) => {
      if (!MOVES.hasOwnProperty(key)) {
        throw new RangeError("Invalid direction");
      }

      if (key === currentDirection) {
        throw new Error("Snake is already in this direction");
      }
      if (
        (key == "UP" && currentDirection === "DOWN") ||
        (key == "DOWN" && currentDirection === "UP") ||
        (key == "RIGHT" && currentDirection === "LEFT") ||
        (key == "LEFT" && currentDirection === "RIGHT")
      ) {
        throw new Error("Snake cannot move backwards");
      }
      currentDirection = key;
    },
    grow(step = 1) {
      tailLength += step;
    },
    overlap: ({ head, tail }) => {
      if (!Array.isArray(tail))
        throw TypeError("Tail should be an array");

      return tail.some((item) => item.x === head.x && item.y === head.y);
    }
  };
};

export { Snake };
