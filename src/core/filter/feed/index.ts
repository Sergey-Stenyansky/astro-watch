import { AstroObjectInterface } from "@/services/api/schema";
import { FilterField, Filter } from "@/core/filter/filters";
import type { FeedFilterState } from "@/reducers/feed/feedFilter";

export class NameFilter extends FilterField<AstroObjectInterface> {
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

export class HazardousFilter extends FilterField<AstroObjectInterface> {
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

export class FeedFilter {
  private filter = new Filter({
    nameFilter: new NameFilter(),
    hazardousFilter: new HazardousFilter(),
  });

  apply(state: FeedFilterState, items: AstroObjectInterface[]) {
    const fields = this.filter.filters;

    fields.nameFilter.value = state.name;
    fields.hazardousFilter.value = state.isHazardous || false;

    return this.filter.apply(items);
  }
}
