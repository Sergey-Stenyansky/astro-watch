import { describe, expect, it } from "@jest/globals";

import { getDateValue, timeRange } from "../window";
import dayjs from "dayjs";

describe("time window module", () => {
  it.each([
    [timeRange(dayjs("2002-02-27"), 7, "days"), "2002-02-27 2002-03-05"],
    [timeRange(dayjs("2002-03-05"), -7, "days"), "2002-02-27 2002-03-05"],
    [timeRange(dayjs("2000-02-27"), 7, "days"), "2000-02-27 2000-03-04"],
    [timeRange(dayjs("2000-03-04"), -7, "days"), "2000-02-27 2000-03-04"],
  ])("get time window from date", (value, expected) => expect(getDateValue(value)).toBe(expected));
});
