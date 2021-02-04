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

});
