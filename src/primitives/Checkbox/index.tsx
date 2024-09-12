import { margin0 } from "@/theme/commonStyles";
import { FormControlLabel, Checkbox } from "@mui/material";

import { memo, ChangeEvent } from "react";

interface ComponentProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  required?: boolean;
}

const CheckboxComponent = ({
  onChange,
  checked,
  label,
  labelPlacement = "end",
  required,
}: ComponentProps) => (
  <FormControlLabel
    sx={margin0}
    label={label}
    labelPlacement={labelPlacement}
    required={required}
    control={
      <Checkbox
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
      />
    }
  />
);

export default memo(CheckboxComponent);
