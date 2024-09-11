import { memo } from "react";

import type { AstroObjectInterface } from "@/services/api/schema/feed";
import { Title, Text, Card } from "@mantine/core";

interface ComponentProps {
  item: AstroObjectInterface;
}

function AstroObjectCard({ item }: ComponentProps) {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder style={{ width: "100%" }}>
      <Title order={3}>{item.name}</Title>
      <Text size="sm">{item.nasaJplUrl}</Text>
      <Text size="sm">Диаметр</Text>
      {item.estimatedDiameter.feet && (
        <>
          <Text size="sm">{item.estimatedDiameter.feet.diameterMin}</Text>-
          <Text size="sm">{item.estimatedDiameter.feet.diameterMax}</Text>
        </>
      )}
    </Card>
  );
}

export default memo(AstroObjectCard);
