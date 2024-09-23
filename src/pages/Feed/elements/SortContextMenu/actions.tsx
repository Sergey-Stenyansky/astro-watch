import i18n from "@/i18n";
import { SortActionValues, type SortActionItem } from "./types";
import { rotateY180 } from "@/theme/commonStyles";
import InternalIcon from "@/primitives/InternalIcon";

export const sortActionItems: SortActionItem[] = [
  {
    text: i18n.t("feed.sort.name"),
    value: SortActionValues.nameAsc,
    icon: <InternalIcon icon="sort" sx={rotateY180} color="action" />,
    selectedText: i18n.t("feed.sort.name") + ` (${i18n.t("sort.asc")})`,
  },
  {
    text: i18n.t("feed.sort.name"),
    value: SortActionValues.nameDesc,
    icon: "sort",
    selectedText: i18n.t("feed.sort.name") + ` (${i18n.t("sort.desc")})`,
  },
  {
    text: i18n.t("feed.sort.date"),
    value: SortActionValues.dateAsc,
    icon: <InternalIcon icon="sort" sx={rotateY180} color="action" />,
    selectedText: i18n.t("feed.sort.date") + ` (${i18n.t("sort.earlier")})`,
  },
  {
    text: i18n.t("feed.sort.date"),
    value: SortActionValues.dateDesc,
    icon: "sort",
    selectedText: i18n.t("feed.sort.date") + ` (${i18n.t("sort.later")})`,
  },
];
