import { mount } from "cypress/react18";

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("getByTestId", (value) => {
  return cy.get(`[data-test-id=${value}]`);
});
