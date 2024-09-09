import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AsyncView from "@/components/AsyncView";
import { pages } from "@/pages";

export default function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {pages
              .filter((page) => page.isActive)
              .map((page) => {
                return (
                  <Route
                    key={page.path}
                    path={page.path}
                    element={<AsyncView name={page.name} />}
                  />
                );
              })}
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
