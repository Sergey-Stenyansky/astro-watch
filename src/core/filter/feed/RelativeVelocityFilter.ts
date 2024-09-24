import type { AstroObjectInterface } from "@/services/api/schema/astroObject";
import { FilterField } from "@/core/filter/filters";

export default class RelativeVelocitFilter extends FilterField<AstroObjectInterface> {
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
      const data = current.closeApproachData[0];
      const kps = data.relativeVelocity.kilometersPerSecond;
      if (!kps) return min;
      return Math.min(+kps, min);
    }, Infinity);
    this.range[1] = items.reduce((max, current) => {
      const data = current.closeApproachData[0];
      const kps = data.relativeVelocity.kilometersPerSecond;
      if (!kps) return max;
      return Math.max(+kps, max);
    }, -Infinity);
  }

  checkFun = (item: AstroObjectInterface) => {
    const data = item.closeApproachData[0];
    const kps = data.relativeVelocity.kilometersPerSecond;
    if (!kps) return false;
    return Number(kps) >= this.value[0] && Number(kps) <= this.value[1];
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
