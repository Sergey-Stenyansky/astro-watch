import "./index.css";

import { createRoot } from "react-dom/client";
import AppEntryComponent from "./components/AppEntry/index.tsx";
import appEntry from "./appEntry/index.ts";
import { startMockServiceWorker } from "./mocks/browser.ts";

async function setup() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  startMockServiceWorker();
}

setup().then(() => {
  createRoot(document.getElementById("root")!).render(<AppEntryComponent appEntry={appEntry} />);
});
