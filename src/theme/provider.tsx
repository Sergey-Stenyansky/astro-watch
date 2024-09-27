import { PropsWithChildren, useMemo, useState } from "react";
import { AppThemeContext } from "./context";
import { PaletteMode, ThemeProvider } from "@mui/material";
import { themeFactory } from "./factory";
import { isString } from "@/util/type";

function modeToggler(mode: PaletteMode) {
  switch (mode) {
    case "light":
      return "dark";
    case "dark":
      return "light";
    default:
      return "light";
  }
}

export default function AppThemeProvider({ children }: PropsWithChildren<{}>) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const theme = useMemo(() => themeFactory({ mode }), [mode]);
  const contextValue = useMemo(
    () => ({
      theme,
      mode,
      toggleMode: (value?: PaletteMode) => {
        if (isString(value)) {
          return setMode(value);
        }
        setMode(modeToggler);
      },
    }),
    [theme, setMode, mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <AppThemeContext.Provider value={contextValue}>{children}</AppThemeContext.Provider>
    </ThemeProvider>
  );
}
