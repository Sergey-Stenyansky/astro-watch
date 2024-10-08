describe("feed page", () => {
  it("should redirect from root to feed route", () => {
    cy.visit("/");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/feed");
    });
  });

  it("should contain page header and content", () => {
    cy.visit("/feed");
    cy.getByTestId("page-title").should("be.visible");
    cy.getByTestId("feed-filter").should("be.visible");
    cy.getByTestId("feed-content").should("be.visible");
  });
});
