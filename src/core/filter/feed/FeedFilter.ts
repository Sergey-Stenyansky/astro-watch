import type { AstroObjectInterface } from "@/services/api/schema/feed";
import { FilterField, Filter } from "@/core/filter/filters";
import type { FeedFilterState } from "@/reducers/feed/feedFilter";

import NameFilter from "./NameFilter";
import HazardousFilter from "./HazardousFilter";
import SentryFilter from "./SentriFilter";
import DiameterFilter from "./DiameterFilter";
import RelativeVelocityFilter from "./RelativeVelocityFilter";
import AbsoluteMagnitudeFilter from "./AbsoluteMagnitudeFilter";

export interface FeedFilterFields extends Record<string, FilterField<any>> {
  name: NameFilter;
  hazardous: HazardousFilter;
  sentry: SentryFilter;
  diameter: DiameterFilter;
  relativeVelocity: RelativeVelocityFilter;
  absoluteMagnitude: AbsoluteMagnitudeFilter;
}

export type FeedFilterType = Filter<AstroObjectInterface, FeedFilterFields>;

function createFilter(): FeedFilterType {
  return new Filter({
    name: new NameFilter(),
    hazardous: new HazardousFilter(),
    sentry: new SentryFilter(),
    diameter: new DiameterFilter(),
    relativeVelocity: new RelativeVelocityFilter(),
    absoluteMagnitude: new AbsoluteMagnitudeFilter(),
  });
}

export class FeedFilter {
  private filter = createFilter();

  init(items: AstroObjectInterface[]) {
    this.filter.init(items);
  }

  apply(state: FeedFilterState, items: AstroObjectInterface[]): AstroObjectInterface[] {
    const fields = this.filter.filters;

    fields.name.value = state.name;
    fields.hazardous.value = state.isHazardous || false;
    fields.sentry.value = state.isSentryObject || false;
    if (state.diameter) {
      fields.diameter.value = state.diameter;
    }
    if (state.relativeVelocity) {
      fields.relativeVelocity.value = state.relativeVelocity;
    }
    if (state.absoluteMagnitude) {
      fields.absoluteMagnitude.value = state.absoluteMagnitude;
    }
    return this.filter.apply(items);
  }

  get plainObject() {
    return {
      diameter: this.diameter.plainObject,
      relativeVelocity: this.relativeVelocity.plainObject,
      absoluteMagnitude: this.absoluteMagnitude.plainObject,
    };
  }

  get diameter() {
    return this.filter.filters.diameter;
  }

  get relativeVelocity() {
    return this.filter.filters.relativeVelocity;
  }

  get absoluteMagnitude() {
    return this.filter.filters.absoluteMagnitude;
  }
}
