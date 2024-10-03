import dayjs, { Dayjs } from "dayjs";

import { inRange as inRangeInclusive } from "@/util/number";

import isTomorrow from "dayjs/plugin/isTomorrow";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const RANGE_CONFIG = { rightInclusive: false };
const inRange = (a: number, range: number[]) => inRangeInclusive(a, range, RANGE_CONFIG);

export const thisDay = (a: Dayjs) => a.isToday();
export const tomorrow = (a: Dayjs) => a.isTomorrow();
export const withinWeek = (a: Dayjs, b: Dayjs) => inRange(a.diff(b, "weeks", true), [0, 1]);
export const withinMonth = (a: Dayjs, b: Dayjs) => inRange(a.diff(b, "months", true), [0, 1]);
export const withinYear = (a: Dayjs, b: Dayjs) => inRange(a.diff(b, "years", true), [0, 1]);
export const aboveYear = (a: Dayjs, b: Dayjs) => a.diff(b, "years") > 1;
export const past = (a: Dayjs, b: Dayjs) => a.diff(b, "days") < 0;
