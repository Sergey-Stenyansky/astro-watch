import { PayloadAction } from "@reduxjs/toolkit";

export function setStateFactory<S extends Record<string, any>, K extends keyof S>(key: K) {
  return function set(state: S, { payload }: PayloadAction<S[typeof key]>) {
    state[key] = payload;
  };
}

export function togglerFactory<S extends Record<string, any>, K extends keyof S>(key: K) {
  return function toggle(state: S) {
    //@ts-ignore
    state[key] = !state[key];
  };
}
