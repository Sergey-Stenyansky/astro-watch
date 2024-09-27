import { ChangeEvent, memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Stack, Typography, FormGroup, Box, Collapse, IconButton } from "@mui/material";
import TextInput from "@/primitives/TextInput";
import {
  setName,
  setIsHazardous,
  setIsSentryObject,
  setStartDate,
  setEndDate,
  setDiameter,
  setRelativeVelocity,
  setAbsoluteMagnitude,
  setDateCriteria,
} from "@/reducers/feed/feedFilter";

import { windowSelector, feedFilterSelector } from "@/reducers/feed/selectors";

import Spacing from "@/primitives/Spacing";
import Checkbox from "@/primitives/Checkbox";
import Card from "@/primitives/Card";

import { flexSpaceBetween, fullWidth } from "@/theme/commonStyles";
import { useTranslation } from "react-i18next";
import { useFeedContext } from "@/pages/Feed/context";

import { sortActions } from "@/reducers/sorting";
import DatePickerPair from "@/primitives/DatePickerPair";
import { DateRangeProps } from "@/primitives/DatePickerPair/types";

import InternalIcon from "@/primitives/InternalIcon";
import SortContextMenu from "../SortContextMenu";
import { SortActionValues } from "../SortContextMenu/types";
import RangeSlider from "@/primitives/RangeSlider";

import { round } from "@/util/number";
import { formatRangeLabel } from "@/pages/Feed/util";
import { parseSorting } from "@/pages/Feed/util";
import CheckboxGroup from "@/primitives/CheckboxGroup";
import { useToggle } from "react-use";

const feedDateRange: DateRangeProps = {
  count: 7,
  unit: "days",
};

const sliderStyle = { padding: "0 8px" };

const SliderLabelLayout = ({ text, value }: { text: string; value?: number[] | null }) => {
  const valueLabel = value ? formatRangeLabel(value) : "";
  return (
    <Typography>
      {text} {valueLabel}
    </Typography>
  );
};

const FeedFilter = () => {
  const { t } = useTranslation();
  const { sortDispatch, sort, filter } = useFeedContext();

  const state = useAppSelector(feedFilterSelector);
  const window = useAppSelector((state) => windowSelector(state.feedFilter));
  const dispatch = useAppDispatch();

  const sortValue = sort.activeField + "-" + sort.sortOrder;

  const [isOpened, setIsOpened] = useToggle(false);

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
          <IconButton onClick={setIsOpened}>
            <InternalIcon icon="settings" />
          </IconButton>
        </Box>
        <Collapse in={isOpened}>
          <Spacing v={1} />
          <TextInput
            sx={fullWidth}
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
          <CheckboxGroup
            label={t("feed.closeApproachDate")}
            items={state.approachDateCriteria || []}
            onToggle={(name: string) => dispatch(setDateCriteria({ name }))}
          />
          <Spacing v={1} />
          <RangeSlider
            label={<SliderLabelLayout text={t("feed.diameter")} value={state.diameter} />}
            min={filter.diameter.range[0]}
            max={filter.diameter.range[1]}
            value={state.diameter}
            debounce={300}
            formatValueLabel={round}
            onChange={useCallback((value: number[]) => dispatch(setDiameter(value)), [dispatch])}
            style={sliderStyle}
          />
          <Spacing v={1} />
          <RangeSlider
            label={
              <SliderLabelLayout text={t("feed.relativeVelocity")} value={state.relativeVelocity} />
            }
            min={filter.relativeVelocity.range[0]}
            max={filter.relativeVelocity.range[1]}
            value={state.relativeVelocity}
            debounce={300}
            formatValueLabel={round}
            onChange={useCallback(
              (value: number[]) => dispatch(setRelativeVelocity(value)),
              [dispatch],
            )}
            style={sliderStyle}
          />
          <Spacing v={1} />
          <RangeSlider
            label={
              <SliderLabelLayout
                text={t("feed.absoluteMagnitude")}
                value={state.absoluteMagnitude}
              />
            }
            min={filter.absoluteMagnitude.range[0]}
            max={filter.absoluteMagnitude.range[1]}
            value={state.absoluteMagnitude}
            debounce={300}
            formatValueLabel={round}
            onChange={useCallback(
              (value: number[]) => dispatch(setAbsoluteMagnitude(value)),
              [dispatch],
            )}
            style={sliderStyle}
          />
        </Collapse>
        <SortContextMenu value={sortValue as SortActionValues} onChange={onChangeSort} />
      </Card>
    </Stack>
  );
};

export default memo(FeedFilter);
