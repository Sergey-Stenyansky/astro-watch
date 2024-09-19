import { ChangeEvent, memo, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Stack, Typography, FormGroup, Box, Collapse, IconButton } from "@mui/material";
import TextInput from "@/primitives/TextInput";
import {
  toggleOpened,
  setName,
  setIsHazardous,
  setIsSentryObject,
  setStartDate,
  setEndDate,
  setDiameter,
} from "@/reducers/feed/feedFilter";

import { windowSelector, feedFilterSelector } from "@/reducers/feed/selectors";

import Spacing from "@/primitives/Spacing";
import Checkbox from "@/primitives/Checkbox";
import Card from "@/primitives/Card";

import { flexSpaceBetween, fullWidth } from "@/theme/commonStyles";
import { useTranslation } from "react-i18next";
import { useFeedContext } from "@/pages/Feed/context";

import { sortActions, SortOrder } from "@/reducers/sorting";
import DatePickerPair from "@/primitives/DatePickerPair";
import { DateRangeProps } from "@/primitives/DatePickerPair/types";

import InternalIcon from "@/primitives/InternalIcon";
import SortContextMenu from "../SortContextMenu";
import { SortActionValues } from "../SortContextMenu/types";
import { FeedSortingFields } from "@/pages/Feed/sorting";
import RangeSlider from "@/primitives/RangeSlider";

import { round } from "@/util/number";
import { formatRangeLabel } from "@/pages/Feed/util";

const feedDateRange: DateRangeProps = {
  count: 7,
  unit: "days",
};

function parseSorting(value: string) {
  const [field, order] = value.split("-");
  return {
    field: field as FeedSortingFields,
    order: order as SortOrder,
  };
}

const FeedFilter = () => {
  const { t } = useTranslation();
  const { sortDispatch, sort, filter } = useFeedContext();

  const state = useAppSelector(feedFilterSelector);
  const window = useAppSelector((state) => windowSelector(state.feedFilter));
  const dispatch = useAppDispatch();

  const sortValue = sort.activeField + "-" + sort.sortOrder;

  const onChangeSort = useCallback(
    (value: SortActionValues) => {
      const values = parseSorting(value);
      sortDispatch(sortActions.setSorting(values.field, values.order));
    },
    [sortDispatch],
  );

  const diameterLabel = useMemo(() => {
    if (!state.diameter) return "";
    return formatRangeLabel(state.diameter);
  }, [state.diameter]);

  return (
    <Stack>
      <Card>
        <DatePickerPair
          firstLabel={t("feed.dateFrom")}
          firstDate={window.startDate}
          onChangeFirstDate={useCallback((value) => dispatch(setStartDate(value)), [dispatch])}
          secondLabel={t("feed.dateTo")}
          secondDate={window.endDate}
          onChangeSecondDate={useCallback((value) => dispatch(setEndDate(value)), [dispatch])}
          allowedRange={feedDateRange}
          label={t("feed.pickDate")}
        />
        <Box sx={flexSpaceBetween}>
          <Typography>{t("feed.customize")}</Typography>
          <IconButton onClick={() => dispatch(toggleOpened())}>
            <InternalIcon icon="settings" />
          </IconButton>
        </Box>
        <Collapse in={state.isOpened}>
          <Spacing v={1} />
          <TextInput
            sx={fullWidth}
            size="small"
            label={t("feed.name")}
            value={state.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))}
            onClear={() => dispatch(setName(""))}
          />
          <Spacing v={1} />
          <FormGroup>
            <Checkbox
              label={t("feed.astroObjectFields.isPotentiallyHazardous")}
              checked={state.isHazardous || false}
              onChange={(value: boolean) => dispatch(setIsHazardous(value))}
            />
            <Checkbox
              label={t("feed.astroObjectFields.isSentryObject")}
              checked={state.isSentryObject || false}
              onChange={(value: boolean) => dispatch(setIsSentryObject(value))}
            />
          </FormGroup>
          <Spacing v={1} />
          <RangeSlider
            label={
              <Typography>
                {t("feed.diameter")} {diameterLabel}
              </Typography>
            }
            min={filter.diameter.range[0]}
            max={filter.diameter.range[1]}
            value={state.diameter}
            debounce={300}
            formatValueLabel={round}
            onChange={useCallback((value: number[]) => dispatch(setDiameter(value)), [dispatch])}
            style={{ padding: "0 8px" }}
          />
        </Collapse>
        <SortContextMenu value={sortValue as SortActionValues} onChange={onChangeSort} />
      </Card>
    </Stack>
  );
};

export default memo(FeedFilter);
