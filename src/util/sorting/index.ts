import { SortOrder } from "@/reducers/sorting";
import dayjs from "dayjs";

export function getDateSorter(order: SortOrder) {
  switch (order) {
    case SortOrder.asc:
      return (a: string, b: string) => dayjs(a).diff(b, "days");
    case SortOrder.desc:
      return (a: string, b: string) => dayjs(b).diff(a, "days");
    default:
      return (a: string, b: string) => dayjs(a).diff(b, "days");
  }
}

export function getNameSorter(order: SortOrder) {
  switch (order) {
    case SortOrder.asc:
      return (a: string, b: string) => a.localeCompare(b);
    case SortOrder.desc:
      return (a: string, b: string) => b.localeCompare(a);
    default:
      return (a: string, b: string) => a.localeCompare(b);
  }
}

export function getNumberSorter(order: SortOrder) {
  switch (order) {
    case SortOrder.asc:
      return (a: number, b: number) => a - b;
    case SortOrder.desc:
      return (a: number, b: number) => b - a;
    default:
      return (a: number, b: number) => a - b;
  }
}
