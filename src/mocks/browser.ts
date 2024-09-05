import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export function startMockServiceWorker() {
  return worker.start();
}

export function stopMockServiceWorker() {
  return worker.stop();
}
