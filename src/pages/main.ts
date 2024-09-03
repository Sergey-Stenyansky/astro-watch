import Page from "../appEntry/page";

export default class MainPage extends Page {
  path: string = "/";

  constructor() {
    super({ name: "Main" });
  }
}
