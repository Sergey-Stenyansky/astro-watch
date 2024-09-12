import { memo } from "react";

import type { AstroObjectInterface } from "@/services/api/schema/feed";

import { Link, Typography, Box } from "@mui/material";

import Card from "@/primitives/Card";
import Spacing from "@/primitives/Spacing";

import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import CardCell from "@/primitives/Cells/CardCell";
import { flexSpaceBetween, overlowEllipsis } from "@/theme/commonStyles";

interface ComponentProps {
  item: AstroObjectInterface;
}

const linkStyles = [{ maxWidth: 800 }, overlowEllipsis];

const AstroObjectCard = ({ item }: ComponentProps) => {
  const approachData = item.closeApproachData[0];
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
        <Typography>
          Диаметр: {item.estimatedDiameter.feet.diameterMin} -{" "}
          {item.estimatedDiameter.feet.diameterMax}
        </Typography>
      )}
      <CardCell text="Дата приближения" value={approachData.closeApproachDate} />
      <CardCell
        text="Скорость"
        value={Number(approachData.relativeVelocity.kilometersPerSecond).toFixed(2)}
      />
      <CardCell
        text="Расстояние подлета"
        value={Number(approachData.missDistance.kilometers).toFixed(2)}
      />
      <CardCell text="Абсолютная звездная величина" value={item.absoluteMagnitudeH} />
      <CardCell
        text="Объект Sentry"
        value={item.isSentryObject ? <CheckCircle color="success" /> : <Cancel color="error" />}
      />
      {item.isPotentiallyHazardous && <CardCell text="Потенциально опасен" color="error" />}
    </Card>
  );
};

export default memo(AstroObjectCard);
