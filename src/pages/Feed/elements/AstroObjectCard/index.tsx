import { memo } from "react";

import type { AstroObjectInterface } from "@/services/api/schema/astroObject";

import { Link, Typography, Box } from "@mui/material";

import { Link as AppLink } from "react-router-dom";

import Card from "@/primitives/Card";
import Spacing from "@/primitives/Spacing";

import CardCell from "@/primitives/Cells/CardCell";
import { flexSpaceBetween, overlowEllipsis } from "@/theme/commonStyles";
import InternalIcon from "@/primitives/InternalIcon";

import { diameterFormatter } from "@/util/format/diameter";

import { useTranslation } from "react-i18next";
import formatDate, { DateFormat } from "@/util/date/format";
import { AppRoutes } from "@/core/appRoutes";

const linkStyles = [{ maxWidth: 800 }, overlowEllipsis];
const nameStyles = { textDecoration: "none", color: "inherit", flex: 1 };

const AstroObjectCard = ({ item }: { item: AstroObjectInterface }) => {
  const approachData = item.closeApproachData[0];
  const { t } = useTranslation();
  return (
    <Card>
      <Box sx={flexSpaceBetween}>
        <AppLink style={nameStyles} to={AppRoutes.getDetailUrl(item.id)} data-cy="app-link">
          <Typography variant="h5">{item.name}</Typography>
        </AppLink>
        <Link sx={linkStyles} href={item.nasaJplUrl}>
          {item.nasaJplUrl}
        </Link>
      </Box>
      <Spacing v={1} />
      {item.estimatedDiameter.feet && (
        <CardCell
          text={t("feed.diameter")}
          value={diameterFormatter(item.estimatedDiameter.feet)}
        />
      )}
      <CardCell
        text={t("feed.closeApproachDate")}
        value={formatDate(approachData.closeApproachDate, DateFormat.shortDate)}
      />
      <CardCell
        text={t("feed.relativeVelocity")}
        value={Number(approachData.relativeVelocity.kilometersPerSecond).toFixed(2)}
      />
      <CardCell
        text={t("feed.astroObjectFields.missDistance")}
        value={Number(approachData.missDistance.kilometers).toFixed(2)}
      />
      <CardCell text={t("feed.absoluteMagnitude")} value={item.absoluteMagnitudeH} />
      <CardCell
        text={t("feed.astroObjectFields.isSentryObject")}
        value={
          item.isSentryObject ? (
            <InternalIcon icon="check_circle" color="success" />
          ) : (
            <InternalIcon icon="cancel" color="error" />
          )
        }
      />
      {item.isPotentiallyHazardous && (
        <CardCell text={t("feed.astroObjectFields.isPotentiallyHazardous")} color="error" />
      )}
    </Card>
  );
};

export default memo(AstroObjectCard);
