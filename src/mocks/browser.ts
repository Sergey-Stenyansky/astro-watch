import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export function startMockServiceWorker() {
  return worker.start({
    onUnhandledRequest(request, print) {
      const url = new URL(request.url);
      if (url.hostname.includes("localhost")) {
        return;
      }

      print.warning();
    },
  });
}

export function stopMockServiceWorker() {
  return worker.stop();
}
