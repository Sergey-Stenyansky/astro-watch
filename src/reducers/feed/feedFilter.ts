import { createSlice } from "@reduxjs/toolkit";

import { assignDefault } from "@/util/object";
import { setStateFactory } from "@/util/redux";

import { PayloadAction } from "@reduxjs/toolkit";

export type FeedFilterState = {
  startDate: Date | null;
  endDate: Date | null;
  name: string;
  absoluteMagnitude: number | null;
  diameter: number | null;
  isHazardous: boolean | null;
  closeApproachDate: Date | null;
  relativeVelocity: number | null;
  missDistance: number | null;
  orbitingBody: string;
  isSentryObject: boolean | null;
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
    },
    config,
  );
}

const initialState = getInitialState();

const feedFilterSlice = createSlice({
  name: "feedFilter",
  reducers: {
    setStartDate(state, { payload }: PayloadAction<Date>) {
      assignDefault(state, { startDate: payload, endDate: state.endDate });
    },
    setEndDate(state, { payload }: PayloadAction<Date>) {
      assignDefault(state, { startDate: state.endDate, endDate: payload });
    },
    clearFilter(state) {
      assignDefault(state, { startDate: state.startDate, endDate: state.endDate });
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
  },
  initialState,
});

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
} = feedFilterSlice.actions;

export default feedFilterSlice.reducer;
