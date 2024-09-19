import { createSelector } from "@reduxjs/toolkit";

import { AppState } from "@/store";

import { FeedFilterState } from "./feedFilter";

export const feedFilterSelector = (state: AppState) => state.feedFilter;

const selectStartDate = (state: FeedFilterState) => state.startDate || "";
const selectEndDate = (state: FeedFilterState) => state.endDate || "";

export const windowSelector = createSelector(
  [selectStartDate, selectEndDate],
  (startDate: string, endDate: string) => ({ startDate, endDate }),
);
