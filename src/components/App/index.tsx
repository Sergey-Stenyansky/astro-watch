import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AsyncView from "@/components/AsyncView";
import { pages } from "@/pages";
import theme from "@/theme";
import MainLayout from "../MainLayout";

import { ThemeProvider, CssBaseline } from "@mui/material";

const App = () => {
  const routesElement = (
    <Routes>
      {pages
        .filter((page) => page.isActive)
        .map((page) => {
          return (
            <Route key={page.path} path={page.path} element={<AsyncView name={page.name} />} />
          );
        })}
    </Routes>
  );

  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <MainLayout>{routesElement}</MainLayout>
            <CssBaseline />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

export default App;
