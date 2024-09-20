import { PropsWithChildren, useReducer, useMemo } from "react";
import { FeedContext } from "./context";
import { sortingReducer } from "@/reducers/sorting";
import { createFeedSorting, FeedSortingFields } from "./sorting";
import { FeedFilter } from "@/core/filter/feed/FeedFilter";

const FeedContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [sort, sortDispatch] = useReducer(sortingReducer<FeedSortingFields>, {}, createFeedSorting);
  const filter = useMemo(() => new FeedFilter(), []);
  const contextValue = useMemo(
    () => ({ filter, sort, sortDispatch }),
    [filter, sort, sortDispatch],
  );

  return <FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>;
};

export default FeedContextProvider;
