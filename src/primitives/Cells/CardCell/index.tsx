import { memo } from "react";

import { Box, Typography } from "@mui/material";

import { flexSpaceBetween } from "@/theme/commonStyles";

import { ReactElement } from "react";
import { isJSXContent } from "@/util/type";

interface ComponentProps {
  text?: string;
  color?: string;
  value?: string | number | ReactElement;
}

const cellStyles = [flexSpaceBetween, { paddingTop: "4px" }];

const CardCell = ({ text, color, value }: ComponentProps) => (
  <Box sx={cellStyles}>
    <Typography color={color}>{text}</Typography>
    {isJSXContent(value) ? <Typography>{value}</Typography> : value}
  </Box>
);

export default memo(CardCell);
