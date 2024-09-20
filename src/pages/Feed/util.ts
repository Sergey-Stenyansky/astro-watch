import { round } from "@/util/number";

import { FeedSortingFields } from "./sorting";
import { SortOrder } from "@/reducers/sorting";

export function formatRangeLabel(value: number[]) {
  if (!value[0] || !value[1]) return "";
  return round(value[0]) + " - " + round(value[1]);
}

export function parseSorting(value: string) {
  const [field, order] = value.split("-");
  return {
    field: field as FeedSortingFields,
    order: order as SortOrder,
  };
}
