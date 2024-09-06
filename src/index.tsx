import "./index.css";

import { createRoot } from "react-dom/client";
import appEntry from "@/appEntry";
import AppEntryComponent from "@/components/AppEntry";

async function run() {
  if (process.env.NODE_ENV === "development") {
    const mock = await import("@/mocks/browser");

    await mock.startMockServiceWorker();
  }

  createRoot(document.getElementById("root")!).render(<AppEntryComponent appEntry={appEntry} />);
}

run();
