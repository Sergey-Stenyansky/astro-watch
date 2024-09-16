import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AsyncView from "@/components/AsyncView";
import { pages } from "@/pages";
import theme from "@/theme";
import MainLayout from "../MainLayout";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  const routesElement = (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {pages
          .filter((page) => page.isActive)
          .map((page) => (
            <Route key={page.path} path={page.path} element={<AsyncView name={page.name} />} />
          ))}
      </Route>
    </Routes>
  );

  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
              {routesElement}
              <CssBaseline />
            </ThemeProvider>
          </LocalizationProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

export default App;
