import "./global.styles.css";

import { createRoot } from "react-dom/client";
import App from "@/components/App";

async function run() {
  if (process.env.NODE_ENV === "development") {
    const mock = await import("@/mocks/browser");
    await mock.startMockServiceWorker();
  }
  createRoot(document.getElementById("root")!).render(<App />);
}

run();
