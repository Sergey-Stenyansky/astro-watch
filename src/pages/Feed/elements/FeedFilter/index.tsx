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
  windowSelector,
  feedFilterSelector,
} from "@/reducers/feed/feedFilter";

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
import { FeedSortingFields } from "@/util/sorting";

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
  const { sortDispatch, sort } = useFeedContext();

  const state = useAppSelector(feedFilterSelector);
  const window = useAppSelector((state) => windowSelector(state.feedFilter));
  const dispatch = useAppDispatch();

  const sortValue = useMemo(() => sort.activeField + "-" + sort.sortOrder, [sort]);

  const onChangeSort = useCallback(
    (value: SortActionValues) => {
      const values = parseSorting(value);
      sortDispatch(sortActions.setSorting(values.field, values.order));
    },
    [sortDispatch],
  );

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
        </Collapse>
        <SortContextMenu value={sortValue as SortActionValues} onChange={onChangeSort} />
      </Card>
    </Stack>
  );
};

export default memo(FeedFilter);
