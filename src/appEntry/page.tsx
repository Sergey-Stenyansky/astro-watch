export type PageConfig = {
  name: string;
};

export default abstract class Page {
  abstract readonly path: string;
  constructor(public config: PageConfig) {}

  get isActive() {
    return true;
  }
}
