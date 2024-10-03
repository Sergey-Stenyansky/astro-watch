import { describe, expect, it } from "@jest/globals";
import { clampRange, inRange, round, validateRange } from "../number";

describe("number module", () => {
  describe("in range function", () => {
    it.each([
      [
        "checks for the lower bound of the interval",
        { value: 10, range: [10, 15], expected: true },
      ],
      [
        "checks for the upper bound of the interval",
        { value: 15, range: [10, 15], expected: true },
      ],
      [
        "checks for an in-bound point of the interval",
        { value: 12, range: [10, 15], expected: true },
      ],
      [
        "checks for a lower out-bound point of the interval",
        { value: 5, range: [10, 15], expected: false },
      ],
      [
        "checks for a upper out-bound point of the interval",
        { value: 20, range: [10, 15], expected: false },
      ],
    ])("%s", (_, { value, range, expected }) => expect(inRange(value, range)).toBe(expected));
  });

  describe("round function", () => {
    it.each([
      [
        "rounds a number with more decimal places to two decimal places",
        { value: 10.123, expected: 10.12 },
      ],
      [
        "rounds a number with less decimal places to two decimal places",
        { value: 10.1, expected: 10.1 },
      ],
      [
        "rounds a number with zero decimal places to two decimal places",
        { value: 10, expected: 10 },
      ],
    ])("%s", (_, { value, expected }) => expect(round(value, 2)).toBe(expected));
  });

  describe("clamp range function", () => {
    it.each([
      ["clamps the interval into a bigger interval", { a: [5, 10], b: [1, 15], expected: [5, 10] }],
      [
        "clamps the interval into a bigger interval with an equal lower bound",
        { a: [5, 10], b: [5, 15], expected: [5, 10] },
      ],
      [
        "clamps the interval into a bigger interval with an equal upper bound",
        { a: [5, 10], b: [1, 10], expected: [5, 10] },
      ],
      [
        "clamps the interval into an intersecting interval with an equal lower bound",
        { a: [5, 10], b: [5, 9], expected: [5, 9] },
      ],
      [
        "clamps the interval into an intersecting interval with an equal upper bound",
        { a: [5, 10], b: [6, 15], expected: [6, 10] },
      ],
      [
        "incorrectly clamps the interval into a disjoint lower interval",
        { a: [5, 10], b: [1, 4], expected: [5, 4] },
      ],
      [
        "incorrectly clamps the interval into a disjoint upper interval",
        { a: [5, 10], b: [11, 15], expected: [11, 10] },
      ],
    ])("%s", (_, { a, b, expected }) => expect(clampRange(a, b)).toEqual(expected));
  });

  describe("validate range function", () => {
    it.each([
      ["validates a correct interval", { interval: [1, 10], expected: true }],
      ["validates a correct point interval", { interval: [10, 10], expected: true }],
      [
        "invalidates an incorrect interval (mismatched bounds)",
        { interval: [10, 1], expected: false },
      ],
      [
        "invalidates an incorrect interval (less than two elements)",
        { interval: [1], expected: false },
      ],
      [
        "invalidates an incorrect interval (more than two elements)",
        { interval: [1, 10, 100], expected: false },
      ],
    ])("%s", (_, { interval, expected }) => expect(validateRange(interval)).toBe(expected));
  });
});
