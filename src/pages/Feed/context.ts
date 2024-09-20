import { type FeedSortingState } from "./sorting";

import { createContext, Dispatch, useContext } from "react";
import { SortingActions } from "@/reducers/sorting";

import { FeedSortingFields } from "./sorting";
import { FeedFilter } from "@/core/filter/feed/FeedFilter";

export type FeedContextType = {
  sort: FeedSortingState;
  sortDispatch: Dispatch<SortingActions<FeedSortingFields>>;
  filter: FeedFilter;
};

export const FeedContext = createContext<FeedContextType>(null!);
export const useFeedContext = () => useContext(FeedContext);
