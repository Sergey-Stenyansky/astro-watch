import dayjs, { Dayjs, ManipulateType } from "dayjs";
import formatDate, { DateFormat } from "./format";

export function getTimeWindow(
  start: Dayjs,
  count: number,
  unit: ManipulateType,
  inclusive = false,
) {
  const end = start.add(inclusive ? count : count - 1, unit);
  return [start, end];
}

function format(date: Dayjs) {
  return formatDate(date, DateFormat.shortDateISO);
}

export function getDefaultFeedWindow() {
  const today = dayjs();
  const [startDate, endDate] = getTimeWindow(today, 7, "days");
  return { startDate: format(startDate), endDate: format(endDate) };
}
