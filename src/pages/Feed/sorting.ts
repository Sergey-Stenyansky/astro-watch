import { SortingReducerState, SortOrder } from "@/reducers/sorting";
import { AstroObjectInterface } from "@/services/api/schema/feed";
import { assignDefault } from "@/util/object";
import dayjs from "dayjs";

export enum FeedSortingFields {
  date = "date",
}

export type FeedSortingState = SortingReducerState<FeedSortingFields>;

const sortByDate = (order: SortOrder) => (a: AstroObjectInterface, b: AstroObjectInterface) => {
  const dateA = a.closeApproachData[0].closeApproachDate;
  const dateB = b.closeApproachData[0].closeApproachDate;
  switch (order) {
    case SortOrder.asc:
      return dayjs(dateA).diff(dateB, "days");
    case SortOrder.desc:
      return dayjs(dateB).diff(dateA, "days");
  }
  return 0;
};

export const applySort = (
  items: AstroObjectInterface[],
  sortBy: FeedSortingFields,
  order: SortOrder,
) => {
  switch (sortBy) {
    case FeedSortingFields.date:
      return items.slice().sort(sortByDate(order));
  }
  return items;
};

export const createFeedSorting = (config: Partial<FeedSortingState> = {}): FeedSortingState =>
  assignDefault(
    {
      activeField: FeedSortingFields.date,
      defaultField: FeedSortingFields.date,
      sortOrder: SortOrder.desc,
      sortFields: {
        [FeedSortingFields.date]: {
          name: "date",
          values: [SortOrder.desc, SortOrder.asc],
        },
      },
    },
    config,
  );
