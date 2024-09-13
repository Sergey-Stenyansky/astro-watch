import { memo } from "react";

import type { AstroObjectInterface } from "@/services/api/schema/feed";

import { Link, Typography, Box } from "@mui/material";

import Card from "@/primitives/Card";
import Spacing from "@/primitives/Spacing";

import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import CardCell from "@/primitives/Cells/CardCell";
import { flexSpaceBetween, overlowEllipsis } from "@/theme/commonStyles";

import { diameterFormatter } from "./util";
import { useTranslation } from "react-i18next";
import formatDate, { DateFormat } from "@/util/date/format";

interface ComponentProps {
  item: AstroObjectInterface;
}

const linkStyles = [{ maxWidth: 800 }, overlowEllipsis];

const AstroObjectCard = ({ item }: ComponentProps) => {
  const approachData = item.closeApproachData[0];
  const { t } = useTranslation();
  return (
    <Card>
      <Box sx={flexSpaceBetween}>
        <Typography variant="h5">{item.name}</Typography>
        <Link sx={linkStyles} href={item.nasaJplUrl}>
          {item.nasaJplUrl}
        </Link>
      </Box>
      <Spacing v={1} />
      {item.estimatedDiameter.feet && (
        <CardCell
          text={t("feed.astroObjectFields.estimatedDiameter")}
          value={diameterFormatter(item.estimatedDiameter.feet)}
        />
      )}
      <CardCell
        text={t("feed.astroObjectFields.closeApproachDate")}
        value={formatDate(approachData.closeApproachDate, DateFormat.shortDate)}
      />
      <CardCell
        text={t("feed.astroObjectFields.relativeVelocity")}
        value={Number(approachData.relativeVelocity.kilometersPerSecond).toFixed(2)}
      />
      <CardCell
        text={t("feed.astroObjectFields.missDistance")}
        value={Number(approachData.missDistance.kilometers).toFixed(2)}
      />
      <CardCell
        text={t("feed.astroObjectFields.absoluteMagnitude")}
        value={item.absoluteMagnitudeH}
      />
      <CardCell
        text={t("feed.astroObjectFields.isSentryObject")}
        value={item.isSentryObject ? <CheckCircle color="success" /> : <Cancel color="error" />}
      />
      {item.isPotentiallyHazardous && (
        <CardCell text={t("feed.astroObjectFields.isPotentiallyHazardous")} color="error" />
      )}
    </Card>
  );
};

export default memo(AstroObjectCard);
