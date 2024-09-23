import type { AstroObjectInterface } from "@/services/api/schema/astroObject";
import { FilterField, Filter } from "@/core/filter/filters";
import type { FeedFilterState } from "@/reducers/feed/feedFilter";

import NameFilter from "./NameFilter";
import HazardousFilter from "./HazardousFilter";
import SentryFilter from "./SentryFilter";
import DiameterFilter from "./DiameterFilter";
import RelativeVelocityFilter from "./RelativeVelocityFilter";
import AbsoluteMagnitudeFilter from "./AbsoluteMagnitudeFilter";
import { ApproachDateFilter } from "./ApproachDateFilter";

export interface FeedFilterFields extends Record<string, FilterField<any>> {
  name: NameFilter;
  hazardous: HazardousFilter;
  sentry: SentryFilter;
  diameter: DiameterFilter;
  relativeVelocity: RelativeVelocityFilter;
  absoluteMagnitude: AbsoluteMagnitudeFilter;
  approachDate: ApproachDateFilter;
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
    approachDate: new ApproachDateFilter(),
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
      fields.diameter.value = [...state.diameter];
    }
    if (state.relativeVelocity) {
      fields.relativeVelocity.value = [...state.relativeVelocity];
    }
    if (state.absoluteMagnitude) {
      fields.absoluteMagnitude.value = [...state.absoluteMagnitude];
    }

    if (state.approachDateCriteria) {
      fields.approachDate.criteriaList.forEach((criteria, index) => {
        criteria.value = state.approachDateCriteria?.[index]?.value || false;
      });
    }

    return this.filter.apply(items);
  }

  get plainObject() {
    return {
      diameter: this.diameter.plainObject,
      relativeVelocity: this.relativeVelocity.plainObject,
      absoluteMagnitude: this.absoluteMagnitude.plainObject,
      approachDate: this.approachDate.plainObject,
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

  get approachDate() {
    return this.filter.filters.approachDate;
  }
}
