import { memo, useMemo, useState, ReactElement } from "react";

import { Menu, Stack } from "@mui/material";

type ContextMenuArgs = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  submit: (value: any) => void;
};

type ContextMenuCb = (
  args: ContextMenuArgs,
  triggerRef?: (el: Element | null) => void,
) => ReactElement;

interface ComponentProps {
  trigger: ContextMenuCb;
  popupContent: ContextMenuCb;
  open: boolean;
  onChangeOpen: (value: boolean) => void;
  onSelect: (value: any) => void;
}

const ContextMenu = ({ trigger, popupContent, open, onChangeOpen, onSelect }: ComponentProps) => {
  const [triggerElement, setTriggerElement] = useState<Element | null>(null);
  const context = useMemo(
    () => ({
      open: () => onChangeOpen(true),
      close: () => onChangeOpen(false),
      toggle: () => onChangeOpen(!open),
      submit: (value: any) => {
        onSelect(value);
        onChangeOpen(false);
      },
    }),
    [open, onChangeOpen, onSelect],
  );
  return (
    <>
      {trigger(context, setTriggerElement)}
      <Menu open={open} onClose={context.close} anchorEl={triggerElement}>
        <Stack>{popupContent(context)}</Stack>
      </Menu>
    </>
  );
};

export default memo(ContextMenu);
