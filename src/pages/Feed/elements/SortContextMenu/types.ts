import { ReactElement } from "react";
import { InternalIcons } from "@/primitives/InternalIcon";

export enum SortActionValues {
  dateAsc = "date-asc",
  dateDesc = "date-desc",
  nameAsc = "name-asc",
  nameDesc = "name-desc",
}

export type SortActionItem = {
  value: SortActionValues;
  text: string;
  icon?: ReactElement | InternalIcons;
};
