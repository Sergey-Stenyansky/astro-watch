import { ChangeEvent, memo, useCallback } from "react";
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
} from "@/reducers/feed/feedFilter";

import Spacing from "@/primitives/Spacing";
import Checkbox from "@/primitives/Checkbox";
import Card from "@/primitives/Card";

import { flexSpaceBetween, fullWidth, rotateY180 } from "@/theme/commonStyles";
import { useTranslation } from "react-i18next";
import Settings from "@mui/icons-material/Settings";
import { useFeedContext } from "@/pages/Feed/context";
import { sortActions } from "@/reducers/sorting";
import { FeedSortingFields } from "@/pages/Feed/sorting";

import Sort from "@mui/icons-material/Sort";

import { SortOrder } from "@/reducers/sorting";
import DatePickerPair from "@/primitives/DatePickerPair";
import { DateRangeProps } from "@/primitives/DatePickerPair/types";

const feedDateRange: DateRangeProps = {
  count: 7,
  unit: "days",
};

const FeedFilter = () => {
  const state = useAppSelector((state) => state.feedFilter);
  const dates = useAppSelector((state) => ({
    start: state.feedFilter.startDate,
    end: state.feedFilter.endDate,
  }));
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { sortDispatch, sort } = useFeedContext();

  return (
    <Stack>
      <Card>
        <DatePickerPair
          firstLabel={t("feed.dateFrom")}
          firstDate={dates.start}
          onChangeFirstDate={useCallback((value) => dispatch(setStartDate(value)), [dispatch])}
          secondLabel={t("feed.dateTo")}
          secondDate={dates.end}
          onChangeSecondDate={useCallback((value) => dispatch(setEndDate(value)), [dispatch])}
          allowedRange={feedDateRange}
          label={t("feed.pickDate")}
        />
        <Box sx={flexSpaceBetween}>
          <Typography>{t("feed.customize")}</Typography>
          <IconButton onClick={() => dispatch(toggleOpened())}>
            <Settings />
          </IconButton>
        </Box>
        <Box sx={flexSpaceBetween}>
          <Typography>{t("sort.word")}</Typography>
          <IconButton onClick={() => sortDispatch(sortActions.toggle(FeedSortingFields.date))}>
            {sort.sortOrder === SortOrder.desc ? <Sort /> : <Sort sx={rotateY180} />}
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
      </Card>
    </Stack>
  );
};

export default memo(FeedFilter);
