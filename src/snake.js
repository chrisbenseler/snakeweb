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
      currentDirection = key;
    },
    grow(step = 1) {
      tailLength += step;
    },
    log: () => {
      console.log({
        head,
        tail,
        currentDirection,
      });
    },
  };
};

export { Snake };
