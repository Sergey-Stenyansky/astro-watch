import type { AstroObjectInterface } from "@/services/api/schema/astroObject";
import { FilterField } from "@/core/filter/filters";

export default class SentryFilter extends FilterField<AstroObjectInterface> {
  constructor(public value: boolean = false) {
    super();
  }

  checkFun = (item: AstroObjectInterface) => {
    return item.isSentryObject === true;
  };

  get isApplied(): boolean {
    return this.value === true;
  }
}
