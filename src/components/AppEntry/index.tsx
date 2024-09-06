import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import AppEntry from "@/appEntry/AppEntry";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AsyncView from "@/components/AsyncView";

interface ComponentProps {
  appEntry: AppEntry;
}

export default function AppEntryComponent({ appEntry }: ComponentProps) {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {appEntry.pages
              .filter((page) => page.isActive)
              .map((page) => (
                <Route
                  key={page.path}
                  path={page.path}
                  element={<AsyncView name={page.config.name} />}
                />
              ))}
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
