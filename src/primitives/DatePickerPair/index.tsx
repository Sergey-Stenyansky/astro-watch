import { Box, Typography } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

import { memo, useCallback, useMemo, useState } from "react";

import { flexColumn, tableTwoColumns, flexStart } from "@/theme/commonStyles";
import formatDate, { DateFormat } from "@/util/date/format";

import {
  isDateInRange,
  minDateDefault,
  maxDateDefault,
  validateRange,
  getSuccessResult,
  getErrorResult,
  errors,
} from "./util";
import { DatePickerPairRangeType, DatePickerPairValidationResult, DateRangeProps } from "./types";
import { timeRange } from "@/util/date/window";

import { useDatePair } from "./hooks";

interface ComponentProps {
  firstDate: string | null;
  onChangeFirstDate: (value: string | null) => void;
  secondDate: string | null;
  onChangeSecondDate: (value: string | null) => void;
  allowFrom?: Dayjs;
  allowTo?: Dayjs;
  allowedRange?: DateRangeProps;
  firstLabel?: string;
  secondLabel?: string;
  label?: string;
}

const containerStyles = [flexStart, flexColumn];

const ErrorLabel = (props: { text?: string | null }) =>
  props.text ? (
    <Typography mt="4px" color="error">
      {props.text}
    </Typography>
  ) : null;

const DatePickerPair = ({
  firstDate,
  secondDate,
  onChangeFirstDate,
  onChangeSecondDate,
  allowFrom = minDateDefault,
  allowTo = maxDateDefault,
  allowedRange,
  firstLabel,
  secondLabel,
  label,
}: ComponentProps) => {
  const [first, setFirst] = useState(firstDate);
  const [second, setSecond] = useState(secondDate);
  const [errorState, setErrorState] = useState<DatePickerPairValidationResult | null>(null);

  const oldDates = useDatePair(firstDate, secondDate);
  const dates = useDatePair(first, second);

  const validateDateValue = useCallback(
    (newFirst: Dayjs | null, newSecond: Dayjs | null) => {
      let firstValid = true;
      if (newFirst !== null) {
        firstValid = newFirst.isValid() && isDateInRange(newFirst, allowFrom, allowTo);
      }
      let secondValid = true;
      if (newSecond !== null) {
        secondValid = newSecond.isValid() && isDateInRange(newSecond, allowFrom, allowTo);
      }
      if (!firstValid) return getErrorResult({ first: errors.invalidDate() });
      if (!secondValid) return getErrorResult({ second: errors.invalidDate() });
      const { first, second } = oldDates;
      if (!allowedRange || first === null || second === null) return getSuccessResult();
      if (newSecond === null && newFirst !== null) {
        const range = timeRange(second, -allowedRange.count, allowedRange.unit);
        const error = validateRange(newFirst, range[0], range[1]);
        return error ? getErrorResult({ first: error }) : getSuccessResult();
      }
      if (newFirst === null && newSecond !== null) {
        const range = timeRange(first, allowedRange.count, allowedRange.unit);
        const error = validateRange(newSecond, range[0], range[1]);
        return error ? getErrorResult({ second: error }) : getSuccessResult();
      }
      if (newFirst === null || newSecond === null) return getSuccessResult();
      const range = timeRange(newFirst, allowedRange.count, allowedRange.unit);
      const error = validateRange(newSecond, range[0], range[1]);
      return error ? getErrorResult({ range: error }) : getSuccessResult();
    },
    [allowFrom, allowTo, allowedRange, oldDates],
  );

  const onChangeFirst = useCallback(
    (date: Dayjs | null) => {
      const result = validateDateValue(date, null);
      const formattedDate = formatDate(date, DateFormat.shortDateISO);
      const nextDate = result.valid ? formattedDate : firstDate;
      setErrorState(result);
      setFirst(formattedDate);
      onChangeFirstDate(nextDate);
    },
    [firstDate, setFirst, onChangeFirstDate, validateDateValue],
  );

  const onChangeSecond = useCallback(
    (date: Dayjs | null) => {
      const result = validateDateValue(null, date);
      const formattedDate = formatDate(date, DateFormat.shortDateISO);
      const nextDate = result.valid ? formattedDate : secondDate;
      setErrorState(result);
      setSecond(formattedDate);
      onChangeSecondDate(nextDate);
    },
    [secondDate, setSecond, onChangeSecondDate, validateDateValue],
  );

  const dateRanges = useMemo<DatePickerPairRangeType | undefined>(() => {
    if (!allowedRange) return;
    const { first, second } = oldDates;
    let firstRange, secondRange;
    if (first && first.isValid()) {
      const window = timeRange(first, allowedRange.count, allowedRange.unit);
      secondRange = { from: window[0], to: window[1] };
    }
    if (second && second.isValid()) {
      const window = timeRange(second, -allowedRange.count, allowedRange.unit);
      firstRange = { from: window[0], to: window[1] };
    }
    return { first: firstRange, second: secondRange };
  }, [oldDates, allowedRange]);

  return (
    <Box sx={containerStyles}>
      {label && <Typography mb="4px">{label}</Typography>}
      <Box sx={tableTwoColumns}>
        <DatePicker
          label={firstLabel}
          value={dates.first}
          format={DateFormat.shortDate}
          minDate={dateRanges?.first?.from || allowFrom}
          maxDate={dateRanges?.first?.to || allowTo}
          onChange={onChangeFirst}
          slotProps={{
            textField: {
              helperText: <ErrorLabel text={errorState?.issues?.first} />,
            },
          }}
        />
        <DatePicker
          label={secondLabel}
          value={dates.second}
          format={DateFormat.shortDate}
          minDate={dateRanges?.second?.from || allowFrom}
          maxDate={dateRanges?.second?.to || allowTo}
          onChange={onChangeSecond}
          slotProps={{
            textField: {
              helperText: <ErrorLabel text={errorState?.issues?.second} />,
            },
          }}
        />
      </Box>
      <ErrorLabel text={errorState?.issues?.range} />
    </Box>
  );
};

export default memo(DatePickerPair);
