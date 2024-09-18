import { memo, ReactElement } from "react";

import { MenuItem, ListItemText, ListItemIcon } from "@mui/material";

interface ComponentProps {
  value: string | number;
  primary: string;
  secondary?: string;
  icon?: string | ReactElement;
  onClick?: (value: string | number) => void;
}

const ContextMenuItem = ({ value, icon, primary, secondary, onClick }: ComponentProps) => (
  <MenuItem value={value} onClick={() => onClick?.(value)}>
    <ListItemText secondary={secondary}>{primary}</ListItemText>
  </MenuItem>
);

export default memo(ContextMenuItem);
