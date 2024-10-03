import { describe, expect, it } from "@jest/globals";

import { calculateTotalPages, calculatePagination } from "../pagination";

describe("pagination module", () => {
  it.each([
    [0, 32, 0],
    [1, 32, 1],
    [31, 32, 1],
    [32, 32, 1],
    [33, 32, 2],
    [64, 32, 2],
    [100, 32, 4],
  ])("calculate total pagination pages", (page, perPage, expected) =>
    expect(calculateTotalPages(page, perPage)).toBe(expected),
  );
  it.each([
    [
      { page: 1, perPage: 8, count: 100 },
      { firstIndex: 1, lastIndex: 8 },
    ],
    [
      { page: 3, perPage: 8, count: 100 },
      { firstIndex: 17, lastIndex: 24 },
    ],
    [
      { page: 1, perPage: 1, count: 100 },
      { firstIndex: 1, lastIndex: 1 },
    ],
    [
      { page: 5, perPage: 1, count: 100 },
      { firstIndex: 5, lastIndex: 5 },
    ],
    [
      { page: 2, perPage: 8, count: 1, not: true },
      { firstIndex: 1, lastIndex: 1 },
    ],
    [
      { page: 0, perPage: 8, count: 100, not: true },
      { firstIndex: 1, lastIndex: 8 },
    ],
  ])(
    "calculate pagnation parameters",
    //@ts-ignore
    ({ page, perPage, count, not }, { firstIndex, lastIndex }) => {
      if (not) {
        expect(calculatePagination(page, perPage, count)).not.toEqual({ firstIndex, lastIndex });
        return;
      }
      expect(calculatePagination(page, perPage, count)).toEqual({ firstIndex, lastIndex });
    },
  );
});
