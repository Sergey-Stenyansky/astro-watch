import { PropsWithChildren, useMemo } from "react";
import { useToggle } from "react-use";
import { isBoolean } from "@/util/type";
import { AppDrawerContext } from "./context";

const AppDrawerContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [opened, setOpened] = useToggle(false);

  const appDrawer = useMemo(
    () => ({
      open: () => setOpened(true),
      close: () => setOpened(false),
      toggle: (value?: boolean) =>
        isBoolean(value) ? setOpened(value) : setOpened((value: boolean) => !value),
    }),
    [setOpened],
  );

  const contextValue = useMemo(() => ({ appDrawer, opened }), [opened, appDrawer]);

  return <AppDrawerContext.Provider value={contextValue}>{children}</AppDrawerContext.Provider>;
};

export default AppDrawerContextProvider;
