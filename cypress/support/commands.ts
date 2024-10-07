import { mount } from "cypress/react18";

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("data", (value) => {
  return cy.get(`[data-cy=${value}]`);
});
