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

export class DiameterFilter extends FilterField<AstroObjectInterface> {
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

export interface FeedFilterFields extends Record<string, FilterField<any>> {
  nameFilter: NameFilter;
  hazardousFilter: HazardousFilter;
  sentryFilter: SentryFilter;
  diameterFilter: DiameterFilter;
}

export type FeedFilterType = Filter<AstroObjectInterface, FeedFilterFields>;

function createFilter(): FeedFilterType {
  return new Filter({
    nameFilter: new NameFilter(),
    hazardousFilter: new HazardousFilter(),
    sentryFilter: new SentryFilter(),
    diameterFilter: new DiameterFilter(),
  });
}

export class FeedFilter {
  private filter = createFilter();

  init(items: AstroObjectInterface[]) {
    this.filter.init(items);
  }

  apply(state: FeedFilterState, items: AstroObjectInterface[]): AstroObjectInterface[] {
    const fields = this.filter.filters;

    fields.nameFilter.value = state.name;
    fields.hazardousFilter.value = state.isHazardous || false;
    fields.sentryFilter.value = state.isSentryObject || false;
    if (state.diameter) {
      fields.diameterFilter.value = state.diameter;
    }

    return this.filter.apply(items);
  }

  get plainObject() {
    return {
      diameter: this.diameter.plainObject,
    };
  }

  get diameter() {
    return this.filter.filters.diameterFilter;
  }
}
