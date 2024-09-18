import { SortingReducerState, SortOrder } from "@/reducers/sorting";
import dayjs from "dayjs";

export enum FeedSortingFields {
  date = "date",
  name = "name",
}

export type FeedSortingState = SortingReducerState<FeedSortingFields>;

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
