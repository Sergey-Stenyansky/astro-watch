import { SortingReducerState, SortOrder } from "@/reducers/sorting";
import { assignDefault } from "@/util/object";
import { getDateSorter, getNameSorter, getNumberSorter } from "@/util/sorting";

import { AstroObjectOrbitalDataInterface } from "@/services/api/schema/browse";

export enum BrowseSortingFields {
  date = "date",
  name = "name",
  diameter = "diameter",
}

export type BrowseSortingState = SortingReducerState<BrowseSortingFields>;

const sortByDate = (order: SortOrder) => {
  const sorter = getDateSorter(order);
  return (a: AstroObjectOrbitalDataInterface, b: AstroObjectOrbitalDataInterface) => {
    const dateA = a.closeApproachData[0].closeApproachDate;
    const dateB = b.closeApproachData[0].closeApproachDate;
    return sorter(dateA, dateB);
  };
};

const sortByName = (order: SortOrder) => {
  const sorter = getNameSorter(order);
  return (a: AstroObjectOrbitalDataInterface, b: AstroObjectOrbitalDataInterface) =>
    sorter(a.name, b.name);
};

const sortByDiameter = (order: SortOrder) => {
  const sorter = getNumberSorter(order);
  return (a: AstroObjectOrbitalDataInterface, b: AstroObjectOrbitalDataInterface) =>
    sorter(a.estimatedDiameter.feet?.diameterMin || 0, b.estimatedDiameter.feet?.diameterMin || 0);
};

export const applySort = (
  items: AstroObjectOrbitalDataInterface[],
  sortBy: BrowseSortingFields,
  order: SortOrder,
) => {
  switch (sortBy) {
    case BrowseSortingFields.date:
      return items.slice().sort(sortByDate(order));
    case BrowseSortingFields.name:
      return items.slice().sort(sortByName(order));
    case BrowseSortingFields.diameter:
      return items.slice().sort(sortByDiameter(order));
    default:
      return items;
  }
};

export const createBrowseSorting = (config: Partial<BrowseSortingState> = {}): BrowseSortingState =>
  assignDefault(
    {
      activeField: BrowseSortingFields.date,
      defaultField: BrowseSortingFields.date,
      sortOrder: SortOrder.asc,
      sortFields: {
        [BrowseSortingFields.date]: {
          name: "date",
          values: [SortOrder.desc, SortOrder.asc],
        },
        [BrowseSortingFields.name]: {
          name: "name",
          values: [SortOrder.desc, SortOrder.asc],
        },
        [BrowseSortingFields.diameter]: {
          name: "diameter",
          values: [SortOrder.desc, SortOrder.asc],
        },
      },
    },
    config,
  );
