import type { AstroObjectInterface } from "@/services/api/schema/astroObject";
import { FilterField } from "@/core/filter/filters";

export default class NameFilter extends FilterField<AstroObjectInterface> {
  constructor(public value: string = "") {
    super();
  }

  checkFun = (item: AstroObjectInterface) => {
    return item.name.toLowerCase().includes(this.value.toLowerCase());
  };

  get isApplied(): boolean {
    return this.value.length > 0;
  }
}
