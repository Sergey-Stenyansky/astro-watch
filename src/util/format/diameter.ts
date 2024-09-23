import { MeasureInterface } from "@/services/api/schema/astroObject";

export function diameterFormatter(measure: MeasureInterface) {
  return measure.diameterMin.toFixed(2) + " - " + measure.diameterMax.toFixed(2);
}
