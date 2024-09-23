import { AppRoutes } from "@/core/appRoutes";
import { useGetAtroDetailQuery } from "@/services/api";
import { Navigate, useParams } from "react-router-dom";

import CardCell from "@/primitives/Cells/CardCell";
import Card from "@/primitives/Card";
import Spacing from "@/primitives/Spacing";

import {
  Typography,
  Box,
  Skeleton,
  Link,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import formatDate, { DateFormat } from "@/util/date/format";

import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

import { diameterFormatter } from "@/util/format/diameter";
import { useToggle } from "react-use";

import { CloseApproachDataInterface } from "@/services/api/schema/closeApproachData";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { useMemo } from "react";
import dayjs from "dayjs";
import Checkbox from "@/primitives/Checkbox";
import { flexCenter } from "@/theme/commonStyles";
import i18n from "@/i18n";
import { getElementDeclension } from "@/util/wordDeclinations/element";

const ApproachDataItem = ({ item }: { item: CloseApproachDataInterface }) => {
  const { t } = useTranslation();
  const [opened, setOpened] = useToggle(false);

  return (
    <Accordion expanded={opened} onChange={setOpened}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Typography fontWeight="fontWeightBold">
          {formatDate(item.closeApproachDate, DateFormat.shortDate)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CardCell
          text={t("feed.closeApproachDate")}
          value={formatDate(item.closeApproachDate, DateFormat.shortDate)}
        />
        <CardCell
          text={t("feed.relativeVelocity")}
          value={Number(item.relativeVelocity.kilometersPerSecond).toFixed(2)}
        />
        <CardCell
          text={t("feed.astroObjectFields.missDistance")}
          value={Number(item.missDistance.kilometers).toFixed(2)}
        />
      </AccordionDetails>
    </Accordion>
  );
};

const APPROACH_DATA_LIMIT = 30;

function getShowAllButtonText(total: number, limited: boolean) {
  const count = total - APPROACH_DATA_LIMIT;
  return limited ? `${i18n.t("show")} ${count} ${getElementDeclension(count)}` : i18n.t("hide");
}

const Detail = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetAtroDetailQuery(Number(id));

  const { t } = useTranslation();

  const [excludePast, setExcludePast] = useToggle(true);
  const [limitItems, setLimitItems] = useToggle(true);

  const approachData = useMemo(() => {
    let items = data?.closeApproachData || [];
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

  if (!isFetching && isError) {
    return <Navigate to={AppRoutes.getDefaultUrl()} />;
  }

  if (!data) {
    return <Skeleton width="100%" height={300} />;
  }

  return (
    <>
      <Card>
        <Link href={data.nasaJplUrl}>{data.nasaJplUrl}</Link>
        <Spacing v={1} />
        {data.estimatedDiameter.feet && (
          <CardCell
            text={t("feed.diameter")}
            value={diameterFormatter(data.estimatedDiameter.feet)}
          />
        )}
        <CardCell text={t("feed.absoluteMagnitude")} value={data.absoluteMagnitudeH} />
        <CardCell
          text={t("feed.astroObjectFields.isSentryObject")}
          value={data.isSentryObject ? <CheckCircle color="success" /> : <Cancel color="error" />}
        />
        {data.isPotentiallyHazardous && (
          <CardCell text={t("feed.astroObjectFields.isPotentiallyHazardous")} color="error" />
        )}
        <Checkbox label="Только будущие" checked={excludePast} onChange={setExcludePast} />
        {approachData.items.map((item) => (
          <ApproachDataItem key={item.closeApproachDateFull} item={item} />
        ))}
        {approachData.total > APPROACH_DATA_LIMIT && (
          <>
            <Spacing v={2} />
            <Box sx={flexCenter}>
              <Chip
                variant="outlined"
                label={getShowAllButtonText(approachData.total, limitItems)}
                onClick={setLimitItems}
              />
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

export default Detail;
