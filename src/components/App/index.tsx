import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AsyncView from "@/components/AsyncView";
import { pages } from "@/pages";
import { MantineProvider } from "@mantine/core";
import MainLayout from "../MainLayout";

export default function App() {
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
        <MantineProvider>
          <BrowserRouter>
            <MainLayout>{routesElement}</MainLayout>
          </BrowserRouter>
        </MantineProvider>
      </Provider>
    </StrictMode>
  );
}
