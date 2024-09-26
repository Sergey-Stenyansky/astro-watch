import { PropsWithChildren, useReducer, useMemo } from "react";
import { BrowseContext } from "./context";
import { sortingReducer } from "@/reducers/sorting";
import { createBrowseSorting, BrowseSortingFields } from "./sorting";

const BrowseContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [sort, sortDispatch] = useReducer(
    sortingReducer<BrowseSortingFields>,
    {},
    createBrowseSorting,
  );
  const contextValue = useMemo(() => ({ sort, sortDispatch }), [sort, sortDispatch]);

  return <BrowseContext.Provider value={contextValue}>{children}</BrowseContext.Provider>;
};

export default BrowseContextProvider;
