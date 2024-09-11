import { TextInput as MantineTextInput, TextInputProps, CloseButton } from "@mantine/core";

import { forwardRef, Ref } from "react";

import styles from "./styles.module.css";
import { preventDefault } from "@/util/preventDefault";

interface ComponentProps extends TextInputProps {
  onClear?: () => void;
}

function TextInput({ onClear, ...innerProps }: ComponentProps, ref: Ref<any>) {
  return (
    <MantineTextInput
      {...innerProps}
      ref={ref}
      classNames={styles}
      rightSection={
        innerProps.value && <CloseButton size="sm" onClick={onClear} onMouseDown={preventDefault} />
      }
    />
  );
}

export default forwardRef(TextInput);
