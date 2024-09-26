import { BrowseSortingFields } from "./sorting";

import i18n from "@/i18n";

export type BrowseTableHeader = {
  title: string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  sortingField?: BrowseSortingFields;
};

export const tableHeaders: BrowseTableHeader[] = [
  {
    title: i18n.t("browse.tableHeaders.name"),
    sortingField: BrowseSortingFields.name,
  },
  {
    title: i18n.t("browse.tableHeaders.date"),
    sortingField: BrowseSortingFields.date,
  },
  {
    title: i18n.t("browse.tableHeaders.diameter"),
    sortingField: BrowseSortingFields.diameter,
  },
  {
    title: i18n.t("browse.tableHeaders.sentryObject"),
    align: "center",
  },
  {
    title: i18n.t("browse.tableHeaders.hazardous"),
    align: "center",
  },
  {
    title: i18n.t("browse.tableHeaders.link"),
    align: "center",
  },
];
