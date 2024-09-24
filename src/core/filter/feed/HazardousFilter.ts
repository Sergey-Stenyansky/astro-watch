import type { AstroObjectInterface } from "@/services/api/schema/astroObject";
import { FilterField } from "@/core/filter/filters";

export default class HazardousFilter extends FilterField<AstroObjectInterface> {
  constructor(public value: boolean = false) {
    super();
  }

  checkFun = (item: AstroObjectInterface) => {
    return item.isPotentiallyHazardous === true;
  };

  get isApplied(): boolean {
    return this.value === true;
  }
}
