describe("browse page", () => {
  beforeEach(() => {
    cy.visit("/browse");
  });

  it("should contain page header and content", () => {
    cy.data("page-title").should("be.visible").data("browse-table").should("be.visible");
  });

  it("should navigate to detail page", () => {
    cy.data("browse-asteroid-app-link").first().click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.include("/detail");
    });
    cy.data("nav-back")
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.include("/browse");
      });
  });
});
