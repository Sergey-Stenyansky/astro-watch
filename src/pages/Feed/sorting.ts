import { SortingReducerState, SortOrder } from "@/reducers/sorting";
import { AstroObjectInterface } from "@/services/api/schema/astroObject";
import { assignDefault } from "@/util/object";
import { getDateSorter, getNameSorter } from "@/util/sorting";

export enum FeedSortingFields {
  date = "date",
  name = "name",
}

export type FeedSortingState = SortingReducerState<FeedSortingFields>;

const sortByDate = (order: SortOrder) => {
  const sorter = getDateSorter(order);
  return (a: AstroObjectInterface, b: AstroObjectInterface) => {
    const dateA = a.closeApproachData[0].closeApproachDate;
    const dateB = b.closeApproachData[0].closeApproachDate;
    return sorter(dateA, dateB);
  };
};

const sortByName = (order: SortOrder) => {
  const sorter = getNameSorter(order);
  return (a: AstroObjectInterface, b: AstroObjectInterface) => sorter(a.name, b.name);
};

export const applySort = (
  items: AstroObjectInterface[],
  sortBy: FeedSortingFields,
  order: SortOrder,
) => {
  switch (sortBy) {
    case FeedSortingFields.date:
      return items.slice().sort(sortByDate(order));
    case FeedSortingFields.name:
      return items.slice().sort(sortByName(order));
    default:
      return items;
  }
};

export const createFeedSorting = (config: Partial<FeedSortingState> = {}): FeedSortingState =>
  assignDefault(
    {
      activeField: FeedSortingFields.date,
      defaultField: FeedSortingFields.date,
      sortOrder: SortOrder.asc,
      sortFields: {
        [FeedSortingFields.date]: {
          name: "date",
          values: [SortOrder.desc, SortOrder.asc],
        },
        [FeedSortingFields.name]: {
          name: "name",
          values: [SortOrder.desc, SortOrder.asc],
        },
      },
    },
    config,
  );
