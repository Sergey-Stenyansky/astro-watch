import Page from "../appEntry/page";

export default class FeedPage extends Page {
  path: string = "/";

  constructor() {
    super({ name: "Feed" });
  }
}
