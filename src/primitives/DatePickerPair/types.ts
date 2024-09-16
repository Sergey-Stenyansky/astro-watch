import { ManipulateType, Dayjs } from "dayjs";

export type DateRangeProps = {
  count: number;
  unit: ManipulateType;
};

export type DatePickerPairRangeType = {
  first?: {
    from: Dayjs;
    to: Dayjs;
  };
  second?: {
    from: Dayjs;
    to: Dayjs;
  };
};

export type DatePickerPairValidationResult = {
  valid: boolean;
  issues?: {
    first?: string;
    second?: string;
    range?: string;
  };
};
