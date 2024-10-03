import { describe, expect, it } from "@jest/globals";

import { withinMonth, withinWeek, withinYear } from "../index";
import dayjs from "dayjs";

describe("date module", () => {
  it.each([
    [dayjs("2024-09-07 23:59:59"), dayjs("2024-09-01 00:00:00"), true],
    [dayjs("2024-09-08 00:00:00"), dayjs("2024-09-01 00:00:00"), false],
    [dayjs("2024-08-31 23:59:59"), dayjs("2024-09-01 00:00:00"), false],
  ])("check for a date within a week from the one given", (a, b, expected) =>
    expect(withinWeek(a, b)).toBe(expected),
  );
  it.each([
    [dayjs("2024-09-30 23:59:59"), dayjs("2024-09-01 00:00:00"), true],
    [dayjs("2024-10-01 00:00:00"), dayjs("2024-09-01 00:00:00"), false],
    [dayjs("2024-08-31 23:59:59"), dayjs("2024-09-01 00:00:00"), false],
  ])("check for a date is within a month from the one given", (a, b, expected) =>
    expect(withinMonth(a, b)).toBe(expected),
  );
  it.each([
    [dayjs("2025-08-30 23:59:59"), dayjs("2024-09-01 00:00:00"), true],
    [dayjs("2025-09-01 00:00:00"), dayjs("2024-09-01 00:00:00"), false],
    [dayjs("2024-08-31 23:59:59"), dayjs("2024-09-01 00:00:00"), false],
  ])("check for a date is within a year from the one given", (a, b, expected) =>
    expect(withinYear(a, b)).toBe(expected),
  );
});
