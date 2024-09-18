import dayjs, { Dayjs } from "dayjs";
import i18n from "@/i18n";
import formatDate, { DateFormat } from "@/util/date/format";
import { type DatePickerPairValidationResult } from "./types";

export const minDateDefault = dayjs("1900-01-01");
export const maxDateDefault = dayjs("2099-12-31");

export function isDateInRange(value: Dayjs, min: Dayjs | null, max: Dayjs | null) {
  let result = true;
  if (min) {
    result = value.isAfter(min) || value.isSame(min, "days");
  }
  if (max) {
    result = result && (value.isBefore(max) || value.isSame(max, "days"));
  }
  return result;
}

export function toDayjsDate(value: string | null) {
  if (value === null) return null;
  return dayjs(value);
}

export function getErrorResult(
  config: Partial<DatePickerPairValidationResult["issues"]>,
): DatePickerPairValidationResult {
  return {
    valid: false,
    issues: { ...config },
  };
}

export function getSuccessResult(): DatePickerPairValidationResult {
  return { valid: true };
}

export const errors = {
  invalidDate: () => i18n.t("datePicker.errors.invalidDate"),
  fromError: (from: Dayjs) =>
    i18n.t("datePicker.errors.fromError", { fromText: formatDate(from, DateFormat.shortDate) }),
  toError: (to: Dayjs) =>
    i18n.t("datePicker.errors.toError", { toText: formatDate(to, DateFormat.shortDate) }),
  rangeError: (from: Dayjs, to: Dayjs) => {
    const fromText = formatDate(from, DateFormat.shortDate);
    const toText = formatDate(to, DateFormat.shortDate);
    return i18n.t("datePicker.errors.rangeError", { fromText, toText });
  },
};

export const validateRange = (value: Dayjs, from: Dayjs, to: Dayjs) =>
  isDateInRange(value, from, to) ? "" : errors.rangeError(from, to);
