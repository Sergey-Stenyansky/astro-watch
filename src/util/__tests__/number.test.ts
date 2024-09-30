import { describe, expect, it } from "@jest/globals";
import { inRange } from "../number";

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
});
