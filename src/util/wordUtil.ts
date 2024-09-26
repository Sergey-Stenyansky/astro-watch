import i18n from "@/i18n";

export function yesOrNo(value: boolean, config?: { yes: string; no: string }) {
  return value ? config?.yes || i18n.t("yes") : config?.no || i18n.t("no");
}
