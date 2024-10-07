describe("detail page", () => {
  beforeEach(() => {
    cy.visit("/").data("app-link").first().click();
  });

  it("should contain page header and content", () => {
    cy.data("page-title").should("be.visible").data("detail-content").should("be.visible");
  });

  it("should open orbital data modal", () => {
    cy.data("toggle-orbital-data")
      .click()
      .data("orbital-data-modal")
      .should("be.visible")
      .data("orbital-data-close")
      .click()
      .data("orbital-data-modal")
      .should("not.be.visible");
  });
});
