import { describe, expect, it } from "@jest/globals";
import { clampRange, inRange, round, validateRange } from "../number";

describe("number module", () => {
  describe("in range function", () => {
    it("checks for the lower bound of the interval", () => {
      expect(inRange(10, [10, 15])).toBe(true);
    });
    it("checks for the upper bound of the interval", () => {
      expect(inRange(15, [10, 15])).toBe(true);
    });
    it("checks for an in-bound point of the interval", () => {
      expect(inRange(12, [10, 15])).toBe(true);
    });
    it("checks for a lower out-bound point of the interval", () => {
      expect(inRange(5, [10, 15])).toBe(false);
    });
    it("checks for an upper out-bound point of the interval", () => {
      expect(inRange(20, [10, 15])).toBe(false);
    });
  });

  describe("round function", () => {
    it("rounds a number with more decimal places to two decimal places", () => {
      expect(round(10.123, 2)).toBe(10.12);
    });
    it("rounds a number with less decimal places to two decimal places", () => {
      expect(round(10.1, 2)).toBe(10.1);
    });
    it("rounds a number with zero decimal places to two decimal places", () => {
      expect(round(10, 2)).toBe(10);
    });
  });

  describe("clamp range function", () => {
    it("clamps the interval into a bigger interval", () => {
      expect(clampRange([5, 10], [1, 15])).toEqual([5, 10]);
    });
    it("clamps the interval into a bigger interval with an equal lower bound", () => {
      expect(clampRange([5, 10], [5, 15])).toEqual([5, 10]);
    });
    it("clamps the interval into a bigger interval with an equal upper bound", () => {
      expect(clampRange([5, 10], [1, 10])).toEqual([5, 10]);
    });
    it("clamps the interval into an intersecting interval with an equal lower bound", () => {
      expect(clampRange([5, 10], [5, 9])).toEqual([5, 9]);
    });
    it("clamps the interval into an intersecting interval with an equal upper bound", () => {
      expect(clampRange([5, 10], [6, 15])).toEqual([6, 10]);
    });
    it("clamps the interval into a disjoint lower interval (unhandled case)", () => {
      expect(clampRange([5, 10], [1, 4])).toEqual([5, 4]);
    });
    it("clamps the interval into a disjoint upper interval (unhandled case)", () => {
      expect(clampRange([5, 10], [11, 15])).toEqual([11, 10]);
    });
  });

  describe("validate range function", () => {
    it("validates a correct interval", () => {
      expect(validateRange([1, 10])).toBe(true);
    });
    it("validates a correct point interval", () => {
      expect(validateRange([10, 10])).toBe(true);
    });
    it("invalidates an incorrect interval (mismatched bounds)", () => {
      expect(validateRange([10, 1])).toBe(false);
    });
    it("invalidates an incorrect interval (less than two elements)", () => {
      expect(validateRange([1])).toBe(false);
    });
    it("invalidates an incorrect interval (more than two elements)", () => {
      expect(validateRange([1, 10, 100])).toBe(false);
    });
  });
});
