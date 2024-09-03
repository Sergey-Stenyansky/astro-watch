import Page from "./page";

export default class AppEntry {
  pages: Page[] = [];

  addPage(page: Page) {
    this.pages.push(page);
  }
}
