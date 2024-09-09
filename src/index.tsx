import "./index.css";

import { createRoot } from "react-dom/client";
import App from "@/components/App";
import RequestManager from "@/util/request";
import deployment from "@/deployment/deployment.json";

async function run() {
  RequestManager.setBaseUrl(deployment.envConfigs[deployment.env as "development"].baseUrl);

  if (process.env.NODE_ENV === "development") {
    const mock = await import("@/mocks/browser");

    await mock.startMockServiceWorker();
  }

  createRoot(document.getElementById("root")!).render(<App />);
}

run();
