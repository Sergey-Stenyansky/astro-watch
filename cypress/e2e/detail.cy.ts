describe("detail page", () => {
  beforeEach(() => {
    cy.visit("/").getByTestId("app-link").first().click();
  });

  it("should contain page header and content", () => {
    cy.getByTestId("page-title")
      .should("be.visible")
      .getByTestId("detail-content")
      .should("be.visible");
  });

  it("should open orbital data modal", () => {
    cy.getByTestId("toggle-orbital-data")
      .click()
      .getByTestId("orbital-data-modal")
      .should("be.visible")
      .getByTestId("orbital-data-close")
      .click()
      .getByTestId("orbital-data-modal")
      .should("not.be.visible");
  });
});
