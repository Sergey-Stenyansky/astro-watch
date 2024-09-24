import i18n from "@/i18n";

import wordDeclension from "@/util/wordDeclension";

export function getElementDeclension(count: number) {
  return wordDeclension(count, [
    i18n.t("declensions.element.one"),
    i18n.t("declensions.element.few"),
    i18n.t("declensions.element.many"),
  ]);
}
