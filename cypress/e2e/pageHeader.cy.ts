describe("page header", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.visit("/");
  });

  it("should contain theme toggle button", () => {
    cy.data("theme-toggler").should("be.visible");
  });

  it("should persist selected theme in local storage by clicking the theme toggle button", () => {
    cy.data("theme-toggler").should(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(localStorage.getItem("mode")).to.not.exist;
    });
    cy.data("theme-toggler")
      .click()
      .should(() => {
        expect(localStorage.getItem("mode")).be.equal('"dark"');
      })
      .data("theme-toggler")
      .click()
      .should(() => {
        expect(localStorage.getItem("mode")).be.equal('"light"');
      });
  });

  it("should toggle app drawer on click", () => {
    cy.data("main-menu")
      .click()
      .data("main-menu-nav")
      .should("exist")
      .data("main-menu-feed")
      .should("exist")
      .data("main-menu-browse")
      .should("exist");
  });

  it("should navigate to browse page and back", () => {
    cy.data("main-menu")
      .click()
      .data("main-menu-browse")
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq("/browse");
      })
      .data("main-menu")
      .click()
      .data("main-menu-feed")
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq("/feed");
      });
  });

  it("should have back button when history stack in not empty", () => {
    cy.data("app-link")
      .first()
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.include("/detail");
      })
      .data("nav-back")
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq("/feed");
      });
  });
});
