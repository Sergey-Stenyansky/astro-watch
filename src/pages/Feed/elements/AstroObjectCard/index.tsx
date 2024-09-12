import { memo } from "react";

import type { AstroObjectInterface } from "@/services/api/schema/feed";

import { Typography } from "@mui/material";

import Card from "@/primitives/Card";

interface ComponentProps {
  item: AstroObjectInterface;
}

const AstroObjectCard = ({ item }: ComponentProps) => {
  return (
    <Card>
      <Typography variant="h4">{item.name}</Typography>
      <Typography>{item.nasaJplUrl}</Typography>
      <Typography>Диаметр</Typography>
      {item.estimatedDiameter.feet && (
        <>
          <Typography>{item.estimatedDiameter.feet.diameterMin}</Typography>
          <Typography>{item.estimatedDiameter.feet.diameterMax}</Typography>
        </>
      )}
    </Card>
  );
};

export default memo(AstroObjectCard);
