import { createContext, useContext } from "react";

export type AppDrawerController = {
  open: () => void;
  close: () => void;
  toggle: (value?: boolean) => void;
};

export type AppDrawerContextType = {
  appDrawer: AppDrawerController;
  opened: boolean;
};

export const AppDrawerContext = createContext<AppDrawerContextType>(null!);
export const useAppDrawerContext = () => useContext(AppDrawerContext);
