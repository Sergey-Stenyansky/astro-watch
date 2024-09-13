import dayjs from "dayjs";

export enum DateFormat {
  shortDate = "DD.MM.YYYY",
}

export default function formatDate(
  date: Date | string | null | undefined,
  format: DateFormat | string,
  fallbackValue = "",
) {
  const parsed = dayjs(date);
  if (!parsed.isValid()) return fallbackValue;
  return parsed.format(format);
}
