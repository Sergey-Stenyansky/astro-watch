import dayjs, { Dayjs, ManipulateType } from "dayjs";
import formatDate, { DateFormat } from "./format";

export function timeRange(
  reference: Dayjs,
  count: number,
  unit: ManipulateType,
  inclusive = false,
) {
  const end = reference.add(getCount(count, inclusive), unit);
  return count > 0 ? [reference, end] : [end, reference];
}

export function getDefaultFeedWindow() {
  const today = dayjs();
  const [startDate, endDate] = timeRange(today, 7, "days");
  return { startDate: format(startDate), endDate: format(endDate) };
}

function getCount(count: number, inclusive: boolean) {
  if (inclusive) return count;
  return count > 0 ? count - 1 : count + 1;
}

function format(date: Dayjs | Dayjs[]) {
  if (Array.isArray(date)) {
    const result = date.reduce(
      (acc, current) => acc + " " + formatDate(current, DateFormat.shortDateISO),
      "",
    );
    return result.trimStart();
  }
  return formatDate(date, DateFormat.shortDateISO);
}
