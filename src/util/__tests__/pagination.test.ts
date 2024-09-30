import { describe, expect, it } from "@jest/globals";

import { calculateTotalPages, calculatePagination } from "../pagination";

describe("pagination module", () => {
  describe("calculate total pagination pages", () => {
    it("calculates number of pages for zero elements", () => {
      expect(calculateTotalPages(0, 32)).toBe(0);
    });
    it("calculates number of pages for one element", () => {
      expect(calculateTotalPages(1, 32)).toBe(1);
    });
    it("calculates number for the count of one element off a full page", () => {
      expect(calculateTotalPages(31, 32)).toBe(1);
    });
    it("calculates pages for a full page", () => {
      expect(calculateTotalPages(32, 32)).toBe(1);
    });
    it("calculates pages for a full page and one element", () => {
      expect(calculateTotalPages(33, 32)).toBe(2);
    });
    it("calculates pages for two full pages", () => {
      expect(calculateTotalPages(64, 32)).toBe(2);
    });
    it("calculates pages for approx. four pages and then some elements", () => {
      expect(calculateTotalPages(100, 32)).toBe(4);
    });
  });

  describe("calculate pagnation parameters", () => {
    it("correctly calculates parameters for a 1-indexed pagination", () => {
      expect(calculatePagination(1, 8, 100)).toEqual({ firstIndex: 1, lastIndex: 8 });
    });
    it("correctly calculates parameters for a 1-indexed pagination", () => {
      expect(calculatePagination(3, 8, 100)).toEqual({ firstIndex: 17, lastIndex: 24 });
    });
    it("correctly calculates parameters for a page size of 1", () => {
      expect(calculatePagination(1, 1, 100)).toEqual({ firstIndex: 1, lastIndex: 1 });
    });
    it("correctly calculates parameters for a page size of 1", () => {
      expect(calculatePagination(5, 1, 100)).toEqual({ firstIndex: 5, lastIndex: 5 });
    });
    it("incorrectly calculates parameters for an item count of 1", () => {
      expect(calculatePagination(2, 8, 1)).not.toEqual({ firstIndex: 1, lastIndex: 1 });
    });
    it("incorrectly calculates parameters for a 0-indexed pagination", () => {
      expect(calculatePagination(0, 8, 100)).not.toEqual({ firstIndex: 1, lastIndex: 8 });
    });
  });
});
