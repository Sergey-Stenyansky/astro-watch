import type { AstroObjectInterface } from "@/services/api/schema/feed";
import { FilterField, Filter } from "@/core/filter/filters";
import type { FeedFilterState } from "@/reducers/feed/feedFilter";

import NameFilter from "./NameFilter";
import HazardousFilter from "./HazardousFilter";
import SentryFilter from "./SentriFilter";
import DiameterFilter from "./DiameterFilter";

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
