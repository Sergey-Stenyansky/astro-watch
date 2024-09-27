import { PropsWithChildren, useLayoutEffect, useState } from "react";
import { AppThemeContext } from "./context";
import { PaletteMode, ThemeProvider } from "@mui/material";
import { themeFactory } from "./factory";
import { isString } from "@/util/type";
import { useLocalStorage } from "react-use";

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
  const [localMode, setLocalMode] = useLocalStorage<PaletteMode>("mode");
  const [mode, setMode] = useState<PaletteMode>(localMode || "light");
  const theme = themeFactory({ mode });
  useLayoutEffect(() => setLocalMode(mode), [mode, setLocalMode]);
  return (
    <ThemeProvider theme={theme}>
      <AppThemeContext.Provider
        value={{
          theme,
          mode,
          toggleMode: (value?: PaletteMode) => {
            if (isString(value)) {
              return setMode(value);
            }
            setMode(modeToggler);
          },
        }}
      >
        {children}
      </AppThemeContext.Provider>
    </ThemeProvider>
  );
}
