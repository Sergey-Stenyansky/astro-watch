import dayjs, { Dayjs } from "dayjs";

export enum DateFormat {
  shortDate = "DD.MM.YYYY",
  fullDate = "DD.MM.YYYY HH:mm:ss",
  shortDateISO = "YYYY-MM-DD",
  fullDateISO = "YYYY-MM-DD HH:mm:ss",
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
