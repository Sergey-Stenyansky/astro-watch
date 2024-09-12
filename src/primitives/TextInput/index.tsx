import { IconButton, InputAdornment, TextField, type TextFieldProps } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

import { forwardRef, Ref } from "react";

import { preventDefault } from "@/util/preventDefault";

interface ComponentProps extends Omit<TextFieldProps, "variant"> {
  onClear?: () => void;
}

const TextInput = ({ onClear, ...innerProps }: ComponentProps, ref: Ref<any>) => {
  return (
    <TextField
      {...innerProps}
      ref={ref}
      slotProps={{
        input: {
          endAdornment: !!innerProps.value && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={onClear} onMouseDown={preventDefault}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default forwardRef(TextInput);
