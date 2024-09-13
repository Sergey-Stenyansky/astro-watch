import { SxProps } from "@mui/material";
import Card from "@mui/material/Card";

import { memo, ReactNode } from "react";

export type CardElevation = 1 | 2 | 3;

const cardStylesMap: Record<CardElevation, SxProps> = {
  1: { padding: "8px 12px", width: "100%", borderRadius: 2 },
  2: { padding: "8px 12px", width: "100%", borderRadius: 2, boxShadow: 2 },
  3: { padding: "8px 12px", width: "100%", borderRadius: 2, boxShadow: 3 },
};

interface ComponentProps {
  children?: ReactNode;
  elevation?: CardElevation;
}

const CardComponent = ({ children, elevation = 3 }: ComponentProps) => (
  <Card variant="elevation" sx={cardStylesMap[elevation]}>
    {children}
  </Card>
);

export default memo(CardComponent);
