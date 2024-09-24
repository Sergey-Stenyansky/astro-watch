import { useMemo } from "react";
import dayjs from "dayjs";

import { APPROACH_DATA_LIMIT } from "./common";
import { CloseApproachDataInterface } from "@/services/api/schema/closeApproachData";

export function useApproachData(
  data: CloseApproachDataInterface[],
  excludePast: boolean,
  limitItems: boolean,
) {
  return useMemo(() => {
    let items = data.slice();
    let total = items.length;
    if (excludePast) {
      const today = dayjs();
      items = items.filter((item) => {
        const date = dayjs(item.closeApproachDateFull);
        return date.isAfter(today);
      });
      total = items.length;
    }
    if (limitItems) {
      items = items.slice(0, APPROACH_DATA_LIMIT);
    }
    return { items, total };
  }, [excludePast, data, limitItems]);
}
