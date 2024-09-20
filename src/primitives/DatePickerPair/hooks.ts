import { useMemo } from "react";
import { toDayjsDate } from "./util";

export const useDatePair = (first: string | null, second: string | null) =>
  useMemo(
    () => ({
      first: toDayjsDate(first),
      second: toDayjsDate(second),
    }),
    [first, second],
  );
