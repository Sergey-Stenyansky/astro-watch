import Page from "../appEntry/page";

export default class TestPage extends Page {
  path: string = "/test";

  constructor() {
    super({ name: "Test" });
  }
}
