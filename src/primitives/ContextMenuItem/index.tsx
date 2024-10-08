import { MenuItem, ListItemText } from "@mui/material";

import InternalIcon, { InternalIcons } from "../InternalIcon";

import { isString } from "@/util/type";
import { fullWidth } from "@/theme/commonStyles";

interface ComponentProps {
  value: string | number;
  primary: string;
  secondary?: string;
  icon?: InternalIcons | React.ReactElement;
  selected?: boolean;
  onClick?: (value: string | number) => void;
  label?: string;
}

const ContextMenuItem = ({
  value,
  icon,
  primary,
  secondary,
  selected,
  onClick,
  label,
}: ComponentProps) => {
  return (
    <MenuItem
      aria-label={label}
      selected={selected}
      sx={fullWidth}
      value={value}
      onClick={() => onClick?.(value)}
    >
      <ListItemText secondary={secondary}>{primary}</ListItemText>
      {icon ? isString(icon) ? <InternalIcon icon={icon} color="action" /> : icon : null}
    </MenuItem>
  );
};

export default ContextMenuItem;
