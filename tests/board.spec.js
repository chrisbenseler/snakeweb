import { expect } from "@jest/globals";
import { Board, _randomItem } from "../src/board";
import { Snake } from "../src/snake";

let board = null;

describe("Board", () => {
  beforeEach(() => {
    const snake = Snake({ headCoordinates: { x: 1, y: 1 } });
    board = Board({ snake, sizeX: 15, sizeY: 15, cbGrow: () => {} });
  });

  test("Should create", () => {
    expect(board).toBeDefined();
  });

  describe("_randomItem function", () => {
    it("Should return a random item", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = _randomItem(arr);
      expect(arr).toContain(result);
    });
  });
});
