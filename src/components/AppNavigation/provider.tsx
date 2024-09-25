import { PropsWithChildren, useState, useMemo, useLayoutEffect } from "react";
import {
  useLocation,
  useNavigate,
  useNavigationType,
  NavigationType,
  type Location,
} from "react-router-dom";
import { AppNavigationContext } from "./context";

export function AppNavigationProvider({ children }: PropsWithChildren<{}>) {
  const [locationStack, setLocationStack] = useState<Location[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    switch (navigationType) {
      case NavigationType.Push:
        return setLocationStack((value) => value.concat(location));
      case NavigationType.Replace:
        return setLocationStack((value) => value.slice(0, -1).concat(location));
      case NavigationType.Pop:
        return setLocationStack((value) => value.slice(0, -1));
      default:
    }
  }, [navigationType, location]);

  const contextValue = useMemo(() => {
    return {
      go: navigate,
      goBack: () => navigate(-1),
      goForward: () => navigate(1),
      locationStack,
      isEmpty: locationStack.length === 0,
    };
  }, [navigate, locationStack]);

  return (
    <AppNavigationContext.Provider value={contextValue}>{children}</AppNavigationContext.Provider>
  );
}
