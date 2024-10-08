/* eslint-disable @typescript-eslint/no-namespace */
// cypress/support/index.ts
import { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(value: string): Chainable<JQuery<HTMLElement>>;

      mount: typeof mount;
    }
  }
}
