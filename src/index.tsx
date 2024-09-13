import "./global.styles.css";

import { createRoot } from "react-dom/client";
import App from "@/components/App";

import "@/i18n/index";

async function run() {
  if (process.env.NODE_ENV === "development") {
    const mock = await import("@/mocks/browser");
    await mock.startMockServiceWorker();
  }
  createRoot(document.getElementById("root")!).render(<App />);
}

run();
