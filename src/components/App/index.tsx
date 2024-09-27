import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AsyncView from "@/components/AsyncView";
import { pages } from "@/pages";
import MainLayout from "../MainLayout";

import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppRoutes } from "@/core/appRoutes";
import { AppNavigationProvider } from "@/components/AppNavigation/provider";
import AppDrawerContextProvider from "@/components/AppDrawer/AppDrawerContextProvider";
import AppThemeProvider from "@/theme/provider";

const App = () => {
  const routesElement = (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {pages
          .filter((page) => page.isActive)
          .map((page) => (
            <Route key={page.path} path={page.path} element={<AsyncView name={page.name} />} />
          ))}
        <Route path="/" element={<Navigate to={AppRoutes.getDefaultUrl()} replace />} />
        <Route path="*" element={<Navigate to={AppRoutes.getDefaultUrl()} replace />} />
      </Route>
    </Routes>
  );

  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AppNavigationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AppThemeProvider>
                <AppDrawerContextProvider>
                  {routesElement}
                  <CssBaseline />
                </AppDrawerContextProvider>
              </AppThemeProvider>
            </LocalizationProvider>
          </AppNavigationProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

export default App;
