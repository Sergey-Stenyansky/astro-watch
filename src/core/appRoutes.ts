export class AppRoutes {
  static getFeedUrl() {
    return "/feed";
  }

  static getDetailUrl(id: number) {
    return `/detail/${id}`;
  }

  static getDefaultUrl() {
    return AppRoutes.getFeedUrl();
  }
}
