import { memo } from "react";
import { Paper, Typography } from "@mui/material";
import { flexCenter, flexColumn } from "@/theme/commonStyles";
import Spacing from "../Spacing";
import { Search } from "@mui/icons-material";

interface ComponentProps {
  primaryText: string;
  secondaryText?: string;
  width?: number | string;
  height?: number | string;
}

const Placeholder = ({ primaryText, secondaryText, width = 540, height = 200 }: ComponentProps) => {
  return (
    <Paper sx={[{ width, height, borderRadius: 3 }, flexCenter, flexColumn]} elevation={4}>
      <div style={flexCenter}>
        <Typography variant="h5" fontWeight="fontWeightBold">
          {primaryText}
        </Typography>
        <Spacing h={1} />
        <Search fontSize="large" color="disabled" />
      </div>
      <Spacing v={1} />
      {secondaryText && <Typography>{secondaryText}</Typography>}
    </Paper>
  );
};

export default memo(Placeholder);
