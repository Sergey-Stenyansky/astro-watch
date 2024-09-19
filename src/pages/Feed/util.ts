import { round } from "@/util/number";

export function formatRangeLabel(value: number[]) {
  if (!value[0] || !value[1]) return "";
  return round(value[0]) + " - " + round(value[1]);
}
