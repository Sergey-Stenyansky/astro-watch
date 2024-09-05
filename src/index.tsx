import "./index.css";

import { createRoot } from "react-dom/client";
import AppEntryComponent from "./components/AppEntry/index.tsx";
import appEntry from "./appEntry/index.ts";
import { startMockServiceWorker } from "./mocks/browser.ts";

async function run() {
  if (process.env.NODE_ENV === "development") {
    await startMockServiceWorker();
  }

  createRoot(document.getElementById("root")!).render(<AppEntryComponent appEntry={appEntry} />);
}

run();
