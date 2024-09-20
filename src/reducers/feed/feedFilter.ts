import { createSlice } from "@reduxjs/toolkit";

import { assignDefault } from "@/util/object";
import { setStateFactory, togglerFactory } from "@/util/redux/factories";

import { PayloadAction } from "@reduxjs/toolkit";
import { getDefaultFeedWindow } from "@/util/date/window";
import { FeedFilter } from "@/core/filter/feed/FeedFilter";

import { clampRange, validateRange } from "@/util/number";
import { CheckboxGroupItem } from "@/primitives/CheckboxGroup/types";
import { isBoolean } from "@/util/type";

export type FeedFilterState = {
  startDate: string | null;
  endDate: string | null;
  name: string;
  diameter: number[] | null;
  relativeVelocity: number[] | null;
  absoluteMagnitude: number[] | null;
  isHazardous: boolean | null;
  closeApproachDate: Date | null;
  approachDateCriteria: CheckboxGroupItem[] | null;
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
      approachDateCriteria: null,
      closeApproachDate: null,
      relativeVelocity: null,
      missDistance: null,
      orbitingBody: "",
      isSentryObject: null,
      isOpened: false,
    },
    config,
  );
}

const defaultWindow = getDefaultFeedWindow();
const initialState = getInitialState(defaultWindow);

function setRange(value: number[] | null, newValue: number[]) {
  return value ? clampRange(value, newValue) : newValue;
}

const emptyDateCriteria: CheckboxGroupItem[] = [];

export const feedFilterSlice = createSlice({
  name: "feedFilter",
  reducers: {
    setStartDate: setStateFactory("startDate"),
    setEndDate: setStateFactory("endDate"),
    clearFilter(state) {
      return assignDefault(state, {
        startDate: state.startDate,
        endDate: state.endDate,
        isOpened: state.isOpened,
      });
    },
    initFromFilter(state, { payload }: PayloadAction<FeedFilter["plainObject"]>) {
      const { diameter, relativeVelocity, absoluteMagnitude, approachDate } = payload;
      if (validateRange(diameter.range)) {
        state.diameter = setRange(state.diameter, diameter.range);
      }
      if (validateRange(relativeVelocity.range)) {
        state.relativeVelocity = setRange(state.relativeVelocity, relativeVelocity.range);
      }
      if (validateRange(absoluteMagnitude.range)) {
        state.absoluteMagnitude = setRange(state.absoluteMagnitude, absoluteMagnitude.range);
      }
      state.approachDateCriteria = emptyDateCriteria;
      approachDate.criteriaList.forEach((c) => {
        state.approachDateCriteria!.push(c);
      });
      return state;
    },
    setDateCriteria(state, { payload }: PayloadAction<{ name: string; value?: boolean }>) {
      if (!state.approachDateCriteria) return state;
      const criteria = state.approachDateCriteria.find((item) => item.name === payload.name);
      if (!criteria) return state;
      criteria.value = isBoolean(payload.value) ? payload.value : !criteria.value;
      return state;
    },
    setName: setStateFactory("name"),
    setAbsoluteMagnitude: setStateFactory("absoluteMagnitude"),
    setIsHazardous: setStateFactory("isHazardous"),
    setCloseApproachDate: setStateFactory("closeApproachDate"),
    setRelativeVelocity: setStateFactory("relativeVelocity"),
    setDiameter: setStateFactory("diameter"),
    setMissDistance: setStateFactory("missDistance"),
    setOrbitingBody: setStateFactory("orbitingBody"),
    setIsSentryObject: setStateFactory("isSentryObject"),
    setIsOpened: setStateFactory("isOpened"),
    toggleOpened: togglerFactory("isOpened"),
  },
  initialState,
});

export const {
  setStartDate,
  setEndDate,
  clearFilter,
  setName,
  setAbsoluteMagnitude,
  setIsHazardous,
  setCloseApproachDate,
  setRelativeVelocity,
  setMissDistance,
  setOrbitingBody,
  setIsSentryObject,
  toggleOpened,
  setIsOpened,
  setDiameter,
  initFromFilter,
  setDateCriteria,
} = feedFilterSlice.actions;

export default feedFilterSlice.reducer;
