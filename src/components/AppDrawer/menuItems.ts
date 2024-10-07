import { InternalIcons } from "@/primitives/InternalIcon";
import { AppRoutes } from "@/core/appRoutes";
import i18n from "@/i18n";

export type AppMenuItem = {
  title: string;
  code: string;
  icon?: InternalIcons;
  link?: string;
  testTag?: string;
  action?: () => void;
};

export const menuItems: AppMenuItem[] = [
  {
    title: i18n.t("mainMenu.feed"),
    code: "feed",
    icon: "article_outlined",
    link: AppRoutes.getFeedUrl(),
    testTag: "main-menu-feed",
  },
  {
    title: i18n.t("mainMenu.browse"),
    code: "browse",
    icon: "manage_search",
    link: AppRoutes.getBrowseUrl(),
    testTag: "main-menu-browse",
  },
];
