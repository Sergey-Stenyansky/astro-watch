import { createSelector, createSlice } from "@reduxjs/toolkit";

import { assignDefault } from "@/util/object";
import { setStateFactory, togglerFactory } from "@/util/redux/factories";

import { PayloadAction } from "@reduxjs/toolkit";
import astroApi from "@/services/api";
import { getDefaultFeedWindow } from "@/util/date/window";
import { AppState } from "@/store";

export type FeedFilterState = {
  startDate: string | null;
  endDate: string | null;
  name: string;
  absoluteMagnitude: number | null;
  diameter: number | null;
  isHazardous: boolean | null;
  closeApproachDate: Date | null;
  relativeVelocity: number | null;
  missDistance: number | null;
  orbitingBody: string;
  isSentryObject: boolean | null;
  isOpened: boolean;
};

function getInitialState(config: Partial<FeedFilterState> = {}): FeedFilterState {
  return assignDefault(
    {
      startDate: null,
      endDate: null,
      name: "",
      absoluteMagnitude: null,
      diameter: null,
      isHazardous: null,
      closeApproachDate: null,
      relativeVelocity: null,
      missDistance: null,
      orbitingBody: "",
      isSentryObject: null,
      isOpened: true,
    },
    config,
  );
}

const defaultWindow = getDefaultFeedWindow();
const initialState = getInitialState(defaultWindow);

export const feedFilterSlice = createSlice({
  name: "feedFilter",
  reducers: {
    setStartDate(state, { payload }: PayloadAction<string | null>) {
      return assignDefault(getInitialState(), {
        startDate: payload,
        endDate: state.endDate,
        isOpened: state.isOpened,
      });
    },
    setEndDate(state, { payload }: PayloadAction<string | null>) {
      return assignDefault(getInitialState(), {
        startDate: state.startDate,
        endDate: payload,
        isOpened: state.isOpened,
      });
    },
    clearFilter(state) {
      return assignDefault(state, {
        startDate: state.startDate,
        endDate: state.endDate,
        isOpened: state.isOpened,
      });
    },
    setName: setStateFactory("name"),
    setAbsoluteMagnitude: setStateFactory("absoluteMagnitude"),
    setDiameter: setStateFactory("diameter"),
    setIsHazardous: setStateFactory("isHazardous"),
    setCloseApproachDate: setStateFactory("closeApproachDate"),
    setRelativeVelocity: setStateFactory("relativeVelocity"),
    setMissDistance: setStateFactory("missDistance"),
    setOrbitingBody: setStateFactory("orbitingBody"),
    setIsSentryObject: setStateFactory("isSentryObject"),
    setIsOpened: setStateFactory("isOpened"),
    toggleOpened: togglerFactory("isOpened"),
  },
  extraReducers: (builder) => {
    builder.addMatcher(astroApi.endpoints.getAtroFeed.matchFulfilled, (state) => {
      state.isOpened = false;
    });
  },
  initialState,
});

const selectWindow = (state: FeedFilterState) => ({
  startDate: state.startDate || "",
  endDate: state.endDate || "",
});

export const feedFilterSelector = (state: AppState) => state.feedFilter;
export const windowSelector = createSelector([feedFilterSelector], selectWindow);

export const {
  setStartDate,
  setEndDate,
  clearFilter,
  setName,
  setAbsoluteMagnitude,
  setDiameter,
  setIsHazardous,
  setCloseApproachDate,
  setRelativeVelocity,
  setMissDistance,
  setOrbitingBody,
  setIsSentryObject,
  toggleOpened,
  setIsOpened,
} = feedFilterSlice.actions;

export default feedFilterSlice.reducer;
