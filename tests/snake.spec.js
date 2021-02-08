// const { Snake } = require("../src/snake");

import { expect } from "@jest/globals";
import { Snake } from "../src/snake";

let livingSnake = null;

describe("Snake", () => {
  beforeEach(() => {
    livingSnake = Snake({});
  });

  test("Should create", () => {
    expect(livingSnake).toBeDefined();
  });

  test("Should have direction", () => {
    const dir = livingSnake.direction();
    expect(dir).not.toBeNull();
  });

  test("Should not have tail", () => {
    const tail = livingSnake.tail();
    expect(tail).toBeInstanceOf(Array);
    expect(tail.length).toBe(0);
  });

  describe("Direction", () => {
    test("Should have default direction", () => {
      const direction = livingSnake.direction();
      expect(direction).toBe("RIGHT");
    });

    test("Should move to valid direction", () => {
        expect(() => {
          livingSnake.changeDirection("ANYWAY");
        }).toThrowError(RangeError);
      });

    test("Should change direction", () => {
      livingSnake.changeDirection("UP");
      const direction = livingSnake.direction();
      expect(direction).toBe("UP");
    });

    test("Should not change to same direction", () => {
      expect(() => {
        livingSnake.changeDirection("RIGHT");
      }).toThrowError("Snake is already in this direction");
    });

    test("Should not go backwards", () => {
        expect(() => {
          livingSnake.changeDirection("LEFT");
        }).toThrowError("Snake cannot move backwards");
      });

  });

  describe("Overlap", () => {
    test("Should overlap head and tail", () => {
        const head = { x: 1, y: 1 };
        const tail = [{ x: 0, y: 0}, { x: 0, y: 0}, { x: 1, y: 1}];
        const isOverlapped = livingSnake.overlap({ head, tail});
        expect(isOverlapped).toBeTruthy();
    });

    test("Should not overlap head and tail", () => {
        const head = { x: 2, y: 1 };
        const tail = [{ x: 0, y: 0}, { x: 0, y: 0}, { x: 1, y: 1}];
        const isOverlapped = livingSnake.overlap({ head, tail});
        expect(isOverlapped).toBeFalsy();
    });

    test("Should not overlap head and tail", () => {
        const head = { x: 2, y: 1 };
        const tail = { x: 2, y: 1 };
        expect(() => { livingSnake.overlap({ head, tail}) }).toThrowError(TypeError);
    }); 

  });
});
