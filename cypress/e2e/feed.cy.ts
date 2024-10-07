describe("feed page", () => {
  it("should redirect from root to feed route", () => {
    cy.visit("/");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/feed");
    });
  });

  it("should contain page header and content", () => {
    cy.visit("/feed");
    cy.data("page-title").should("be.visible");
    cy.data("feed-filter").should("be.visible");
    cy.data("feed-content").should("be.visible");
  });
});
