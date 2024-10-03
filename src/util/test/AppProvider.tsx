import { BrowserRouter } from "react-router-dom";
import { PropsWithChildren } from "react";
import { AppNavigationProvider } from "@/components/AppNavigation/provider";
import AppThemeProvider from "@/theme/provider";
import AppDrawerContextProvider from "@/components/AppDrawer/AppDrawerContextProvider";

const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <BrowserRouter>
      <AppNavigationProvider>
        <AppDrawerContextProvider>
          <AppThemeProvider>{children}</AppThemeProvider>
        </AppDrawerContextProvider>
      </AppNavigationProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
