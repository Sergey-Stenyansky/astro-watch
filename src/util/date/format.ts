import dayjs, { Dayjs } from "dayjs";

export enum DateFormat {
  shortDate = "DD.MM.YYYY",
  shortDateISO = "YYYY-MM-DD",
}

export default function formatDate(
  date: Dayjs | Date | string | null | undefined,
  format: DateFormat | string,
  fallbackValue = "",
) {
  const parsed = dayjs(date);
  if (!parsed.isValid()) return fallbackValue;
  return parsed.format(format);
}
