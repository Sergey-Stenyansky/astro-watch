import { createContext, useContext } from "react";
import { NavigateFunction, Location } from "react-router-dom";

export type AppNavigationContextType = {
  goBack: () => void;
  goForward: () => void;
  go: NavigateFunction;
  locationStack: Location[];
  isEmpty: boolean;
};

export const AppNavigationContext = createContext<AppNavigationContextType>(null!);
export const useAppNavigation = () => useContext(AppNavigationContext);
