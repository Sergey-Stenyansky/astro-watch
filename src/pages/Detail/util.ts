import { getElementDeclension } from "@/util/wordDeclinations/element";
import i18n from "@/i18n";

import { APPROACH_DATA_LIMIT } from "./common";

export function getShowAllButtonText(total: number, limited: boolean) {
  const count = total - APPROACH_DATA_LIMIT;
  return limited ? `${i18n.t("show")} ${count} ${getElementDeclension(count)}` : i18n.t("hide");
}
