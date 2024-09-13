import type { AstroObjectInterface } from "@/services/api/schema/feed";
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

export class SentryFilter extends FilterField<AstroObjectInterface> {
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

export interface FeedFilterFields extends Record<string, FilterField<any>> {
  nameFilter: NameFilter;
  hazardousFilter: HazardousFilter;
  sentryFilter: SentryFilter;
}

export type FeedFilterType = Filter<AstroObjectInterface, FeedFilterFields>;

function createFilter(): FeedFilterType {
  return new Filter({
    nameFilter: new NameFilter(),
    hazardousFilter: new HazardousFilter(),
    sentryFilter: new SentryFilter(),
  });
}

export class FeedFilter {
  private filter = createFilter();

  apply(state: FeedFilterState, items: AstroObjectInterface[]): AstroObjectInterface[] {
    const fields = this.filter.filters;

    fields.nameFilter.value = state.name;
    fields.hazardousFilter.value = state.isHazardous || false;
    fields.sentryFilter.value = state.isSentryObject || false;

    return this.filter.apply(items);
  }
}
