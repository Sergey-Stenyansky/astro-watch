import { Box, Typography } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

import { memo, useCallback, useMemo, useState } from "react";

import Spacing from "@/primitives/Spacing";
import { flexColumn, flexJcStart, flexStart } from "@/theme/commonStyles";
import formatDate, { DateFormat } from "@/util/date/format";

import {
  toDayjsDate,
  isDateInRange,
  minDateDefault,
  maxDateDefault,
  validateRange,
  getSuccessResult,
  getErrorResult,
  errors,
} from "./util";
import { DatePickerPairRangeType, DatePickerPairValidationResult, DateRangeProps } from "./types";

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

  const oldDates = useMemo(() => {
    return {
      first: toDayjsDate(firstDate),
      second: toDayjsDate(secondDate),
    };
  }, [firstDate, secondDate]);

  const dates = useMemo(() => {
    return {
      first: toDayjsDate(first),
      second: toDayjsDate(second),
    };
  }, [first, second]);

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
      if (!firstValid) {
        return getErrorResult({ first: errors.invalidDate() });
      }
      if (!secondValid) {
        return getErrorResult({ second: errors.invalidDate() });
      }
      if (!allowedRange || newFirst === null || newSecond === null) {
        return getSuccessResult();
      }
      const { first, second } = oldDates;
      if (!secondDate && first && first.isValid()) {
        const from = first;
        const to = from.add(allowedRange.count - 1, allowedRange.unit);
        const [valid, error] = validateRange(newSecond, from, to);
        return valid ? getSuccessResult() : getErrorResult({ second: error });
      }
      if (!firstDate && second && second.isValid()) {
        const to = second;
        const from = to.subtract(allowedRange.count - 1, allowedRange.unit);
        const [valid, error] = validateRange(newFirst, from, to);
        return valid ? getSuccessResult() : getErrorResult({ first: error });
      }
      const from = first!;
      const to = from.add(allowedRange.count - 1, allowedRange.unit);
      const [valid, error] = validateRange(newSecond, from, to);
      return valid ? getSuccessResult() : getErrorResult({ range: error });
    },
    [allowFrom, allowTo, allowedRange, firstDate, secondDate, oldDates],
  );

  const onChangeFirst = useCallback(
    (date: Dayjs | null) => {
      const result = validateDateValue(date, toDayjsDate(secondDate));
      const formattedDate = formatDate(date, DateFormat.shortDateISO);
      const nextDate = result.valid ? formattedDate : firstDate;
      setErrorState(result);
      setFirst(formattedDate);
      onChangeFirstDate(nextDate);
    },
    [firstDate, secondDate, setFirst, onChangeFirstDate, validateDateValue],
  );

  const onChangeSecond = useCallback(
    (date: Dayjs | null) => {
      const result = validateDateValue(toDayjsDate(firstDate), date);
      const formattedDate = formatDate(date, DateFormat.shortDateISO);
      const nextDate = result.valid ? formattedDate : secondDate;
      setErrorState(result);
      setSecond(formattedDate);
      onChangeSecondDate(nextDate);
    },
    [firstDate, secondDate, setSecond, onChangeSecondDate, validateDateValue],
  );

  const dateRanges = useMemo<DatePickerPairRangeType | undefined>(() => {
    if (!allowedRange) return;
    const { first, second } = oldDates;
    let firstRange, secondRange;
    if (first && first.isValid()) {
      secondRange = {
        from: first,
        to: first.add(allowedRange.count - 1, allowedRange.unit),
      };
    }
    if (second && second.isValid()) {
      firstRange = {
        from: second.subtract(allowedRange.count - 1, allowedRange.unit),
        to: second,
      };
    }
    return { first: firstRange, second: secondRange };
  }, [oldDates, allowedRange]);

  return (
    <Box sx={containerStyles}>
      {label && <Typography mb="4px">{label}</Typography>}
      <Box sx={flexJcStart}>
        <Box sx={containerStyles}>
          <DatePicker
            label={firstLabel}
            value={dates.first}
            format={DateFormat.shortDate}
            minDate={dateRanges?.first?.from || allowFrom}
            maxDate={dateRanges?.first?.to || allowTo}
            onChange={onChangeFirst}
          />
          <ErrorLabel text={errorState?.issues?.first} />
        </Box>
        <Spacing h={2} />
        <Box sx={containerStyles}>
          <DatePicker
            label={secondLabel}
            value={dates.second}
            format={DateFormat.shortDate}
            minDate={dateRanges?.second?.from || allowFrom}
            maxDate={dateRanges?.second?.to || allowTo}
            onChange={onChangeSecond}
          />
          <ErrorLabel text={errorState?.issues?.second} />
        </Box>
      </Box>
      <ErrorLabel text={errorState?.issues?.range} />
    </Box>
  );
};

export default memo(DatePickerPair);
