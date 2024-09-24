import type { AstroObjectInterface } from "@/services/api/schema/astroObject";
import { FilterField } from "@/core/filter/filters";

export default class AbsoluteMagnitudeFilter extends FilterField<AstroObjectInterface> {
  public range: number[] = [];

  constructor(public value: number[] = []) {
    super();
  }

  init(items: AstroObjectInterface[]) {
    if (!items.length) {
      this.range = [];
      return;
    }
    this.range[0] = items.reduce((min, current) => {
      const h = current.absoluteMagnitudeH;
      if (!h) return min;
      return Math.min(h, min);
    }, Infinity);
    this.range[1] = items.reduce((max, current) => {
      const h = current.absoluteMagnitudeH;
      if (!h) return max;
      return Math.max(h, max);
    }, -Infinity);
  }

  checkFun = (item: AstroObjectInterface) => {
    const h = item.absoluteMagnitudeH;
    if (!h) return false;
    return h >= this.value[0] && h <= this.value[1];
  };

  get isApplied(): boolean {
    if (!this.range) return false;
    return this.value[0] !== this.range[0] || this.value[1] !== this.range[1];
  }

  get plainObject() {
    return {
      value: this.value,
      range: this.range,
    };
  }
}
