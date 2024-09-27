export class AppRoutes {
  static getFeedUrl() {
    return "/feed";
  }

  static getBrowseUrl() {
    return "/browse";
  }

  static getDetailUrl(id: number | string) {
    return `/detail/${id}`;
  }

  static getDefaultUrl() {
    return AppRoutes.getFeedUrl();
  }
}
