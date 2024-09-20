import type { AstroObjectInterface } from "@/services/api/schema/feed";
import { FilterField } from "@/core/filter/filters";

export default class DiameterFilter extends FilterField<AstroObjectInterface> {
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
      const ft = current.estimatedDiameter.feet;
      if (!ft) return min;
      return Math.min(ft.diameterMin, min);
    }, Infinity);
    this.range[1] = items.reduce((max, current) => {
      const ft = current.estimatedDiameter.feet;
      if (!ft) return max;
      return Math.max(ft.diameterMax, max);
    }, -Infinity);
  }

  checkFun = (item: AstroObjectInterface) => {
    const ft = item.estimatedDiameter.feet;
    if (!ft) return false;
    return ft.diameterMin >= this.value[0] && ft.diameterMax <= this.value[1];
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
