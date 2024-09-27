import dayjs from "dayjs";
import formatDate, { DateFormat } from "@/util/date/format";

export const convertDate = (date: number | string) =>
  formatDate(dayjs(date), DateFormat.shortDateISO);

export const controls = {
  date: () => ({ control: "date" }) as const,
  text: () => ({ control: "text" }) as const,
  object: () => ({ control: "object" }) as const,
  number: (min?: number, max?: number, step?: number) =>
    ({ control: "number", min, max, step }) as const,
};
