describe("page header", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.visit("/");
  });

  it("should contain theme toggle button", () => {
    cy.getByTestId("theme-toggler").should("be.visible");
  });

  it("should persist selected theme in local storage by clicking the theme toggle button", () => {
    cy.getByTestId("theme-toggler").should(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(localStorage.getItem("mode")).to.not.exist;
    });
    cy.getByTestId("theme-toggler")
      .click()
      .should(() => {
        expect(localStorage.getItem("mode")).be.equal('"dark"');
      })
      .getByTestId("theme-toggler")
      .click()
      .should(() => {
        expect(localStorage.getItem("mode")).be.equal('"light"');
      });
  });

  it("should toggle app drawer on click", () => {
    cy.getByTestId("main-menu")
      .click()
      .getByTestId("main-menu-nav")
      .should("exist")
      .getByTestId("main-menu-feed")
      .should("exist")
      .getByTestId("main-menu-browse")
      .should("exist");
  });

  it("should navigate to browse page and back", () => {
    cy.getByTestId("main-menu")
      .click()
      .getByTestId("main-menu-browse")
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq("/browse");
      })
      .getByTestId("main-menu")
      .click()
      .getByTestId("main-menu-feed")
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq("/feed");
      });
  });

  it("should have back button when history stack in not empty", () => {
    cy.getByTestId("app-link")
      .first()
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.include("/detail");
      })
      .getByTestId("nav-back")
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq("/feed");
      });
  });
});
