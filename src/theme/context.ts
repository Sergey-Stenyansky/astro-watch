import { PaletteMode, Theme } from "@mui/material";
import { createContext, useContext } from "react";

export type AppThemeContextType = {
  theme: Theme;
  mode: PaletteMode;
  toggleMode: (value?: PaletteMode) => void;
};

export const AppThemeContext = createContext<AppThemeContextType>(null!);
export const useAppTheme = () => useContext(AppThemeContext);
