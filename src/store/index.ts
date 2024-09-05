import { configureStore } from "@reduxjs/toolkit";
import counter from "../reducers/counter/counter";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";

const store = configureStore({
  reducer: {
    counter,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
