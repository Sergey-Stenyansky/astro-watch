import { MeasureInterface } from "@/services/api/schema/feed";

export function diameterFormatter(measure: MeasureInterface) {
  return measure.diameterMin.toFixed(2) + " - " + measure.diameterMax.toFixed(2);
}
