import Page from "./page";

export default class AppEntry {
  pages: Page[] = [];

  baseUrl = "";

  addPage(page: Page) {
    this.pages.push(page);
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
}
