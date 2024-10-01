import { describe, expect, it } from "@jest/globals";

import { withinMonth, withinWeek, withinYear } from "../index";
import dayjs from "dayjs";

describe("date module", () => {
  describe("check whether a date is within a week from the one given", () => {
    it("correctly includes the last day", () => {
      expect(withinWeek(dayjs("2024-09-07 23:59:59"), dayjs("2024-09-01 00:00:00"))).toBe(true);
    });
    it("correctly rejects a distant date", () => {
      expect(withinWeek(dayjs("2024-09-08 00:00:00"), dayjs("2024-09-01 00:00:00"))).toBe(false);
    });
    it("correctly rejects a past date", () => {
      expect(withinWeek(dayjs("2024-08-31 23:59:59"), dayjs("2024-09-01 00:00:00"))).toBe(false);
    });
  });
  describe("check whether a date is within a month from the one given", () => {
    it("correctly includes the last day", () => {
      expect(withinMonth(dayjs("2024-09-30 23:59:59"), dayjs("2024-09-01 00:00:00"))).toBe(true);
    });
    it("correctly rejects a distant date", () => {
      expect(withinMonth(dayjs("2024-10-01 00:00:00"), dayjs("2024-09-01 00:00:00"))).toBe(false);
    });
    it("correctly rejects a past date", () => {
      expect(withinMonth(dayjs("2024-08-31 23:59:59"), dayjs("2024-09-01 00:00:00"))).toBe(false);
    });
  });
  describe("check whether a date is within a year from the one given", () => {
    it("correctly includes the last day", () => {
      expect(withinYear(dayjs("2025-08-30 23:59:59"), dayjs("2024-09-01 00:00:00"))).toBe(true);
    });
    it("correctly rejects a distant date", () => {
      expect(withinYear(dayjs("2025-09-01 00:00:00"), dayjs("2024-09-01 00:00:00"))).toBe(false);
    });
    it("correctly rejects a past date", () => {
      expect(withinYear(dayjs("2024-08-31 23:59:59"), dayjs("2024-09-01 00:00:00"))).toBe(false);
    });
  });
});
