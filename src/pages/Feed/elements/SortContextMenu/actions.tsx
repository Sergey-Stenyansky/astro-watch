import i18n from "@/i18n";
import { SortActionValues, type SortActionItem } from "./types";
import { rotateY180 } from "@/theme/commonStyles";
import InternalIcon from "@/primitives/InternalIcon";

export const sortActionItems: SortActionItem[] = [
  {
    text: i18n.t("feed.sort.name"),
    value: SortActionValues.nameAsc,
    icon: <InternalIcon icon="sort" sx={rotateY180} color="action" />,
  },
  {
    text: i18n.t("feed.sort.name"),
    value: SortActionValues.nameDesc,
    icon: "sort",
  },
  {
    text: i18n.t("feed.sort.date"),
    value: SortActionValues.dateAsc,
    icon: <InternalIcon icon="sort" sx={rotateY180} color="action" />,
  },
  {
    text: i18n.t("feed.sort.date"),
    value: SortActionValues.dateDesc,
    icon: "sort",
  },
];
