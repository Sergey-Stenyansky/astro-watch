describe("browse page", () => {
  beforeEach(() => {
    cy.visit("/browse");
  });

  it("should contain page header and content", () => {
    cy.getByTestId("page-title")
      .should("be.visible")
      .getByTestId("browse-table")
      .should("be.visible");
  });

  it("should navigate to detail page", () => {
    cy.getByTestId("browse-asteroid-app-link").first().click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.include("/detail");
    });
    cy.getByTestId("nav-back")
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.include("/browse");
      });
  });
});
