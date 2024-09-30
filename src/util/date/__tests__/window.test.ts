import { describe, expect, it } from "@jest/globals";

import { getDateValue, timeRange } from "../window";
import dayjs from "dayjs";

describe("time window module", () => {
  describe("get ime window from date", () => {
    it("gets a week after date in a regular year", () => {
      expect(getDateValue(timeRange(dayjs("2002-02-27"), 7, "days"))).toBe("2002-02-27 2002-03-05");
    });
    it("gets a week before date in a regular year", () => {
      expect(getDateValue(timeRange(dayjs("2002-03-05"), -7, "days"))).toBe(
        "2002-02-27 2002-03-05",
      );
    });
    it("gets a week after date in a leap year", () => {
      expect(getDateValue(timeRange(dayjs("2000-02-27"), 7, "days"))).toBe("2000-02-27 2000-03-04");
    });
    it("gets a week before date in a leap year", () => {
      expect(getDateValue(timeRange(dayjs("2000-03-04"), -7, "days"))).toBe(
        "2000-02-27 2000-03-04",
      );
    });
  });
});
