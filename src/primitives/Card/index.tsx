import { SxProps } from "@mui/material";
import Card from "@mui/material/Card";

import { ReactNode } from "react";

export type CardElevation = 1 | 2 | 3;

const cardStylesMap: Record<CardElevation, SxProps> = {
  1: { padding: "8px 12px", width: "100%", borderRadius: 2 },
  2: { padding: "8px 12px", width: "100%", borderRadius: 2, boxShadow: 2 },
  3: { padding: "8px 12px", width: "100%", borderRadius: 2, boxShadow: 3 },
};

interface ComponentProps {
  children?: ReactNode;
  elevation?: CardElevation;
  testTag?: string;
}

const CardComponent = ({ children, elevation = 3, testTag }: ComponentProps) => (
  <Card variant="elevation" data-cy={testTag} sx={cardStylesMap[elevation]}>
    {children}
  </Card>
);

export default CardComponent;
