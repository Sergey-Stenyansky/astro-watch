import { FormControl, FormGroup, FormLabel } from "@mui/material";
import { memo } from "react";
import Checkbox from "../Checkbox";

import { CheckboxGroupItem } from "./types";

export interface CheckboxGroupProps {
  label?: string;
  onToggle: (name: string) => void;
  items: CheckboxGroupItem[];
}

const CheckboxGroup = ({ items, label, onToggle }: CheckboxGroupProps) => {
  return (
    <FormControl fullWidth>
      {label && <FormLabel>{label}</FormLabel>}
      <FormGroup>
        {items.map((item) => (
          <Checkbox
            key={item.name}
            label={item.label}
            checked={item.value || false}
            onChange={() => onToggle(item.name)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default memo(CheckboxGroup);
