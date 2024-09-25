import { type BrowseSortingState } from "./sorting";

import { createContext, Dispatch, useContext } from "react";
import { SortingActions } from "@/reducers/sorting";

import { BrowseSortingFields } from "./sorting";

export type BrowseContextType = {
  sort: BrowseSortingState;
  sortDispatch: Dispatch<SortingActions<BrowseSortingFields>>;
};

export const BrowseContext = createContext<BrowseContextType>(null!);
export const useBrowseContext = () => useContext(BrowseContext);
