import "./global.styles.css";

import { createRoot } from "react-dom/client";
import App from "@/components/App";

import "@/i18n";

import deployment from "@/deployment/deployment.json";

async function run() {
  if (deployment.env === "development") {
    const mock = await import("@/mocks/browser");
    await mock.startMockServiceWorker();
  }
  createRoot(document.getElementById("root")!).render(<App />);
}

run();
