import { memo } from "react";

import { useToggle } from "react-use";

import ContextMenu from "@/primitives/ContextMenu";
import ContextMenuItem from "@/primitives/ContextMenuItem";

import { sortActionItems } from "./actions";
import { SortActionValues } from "./types";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";

export interface SortContextMenuProps {
  value?: SortActionValues;
  onChange: (value: SortActionValues) => void;
}

function getValueText(value: string | undefined, t: any) {
  const item = sortActionItems.find((item) => item.value === value);
  if (!item) return t("menu.pickFromList");
  return item.selectedText;
}

const SortContextMenu = ({ value, onChange }: SortContextMenuProps) => {
  const { t } = useTranslation();
  const [sortOpened, setSortOpened] = useToggle(false);
  return (
    <ContextMenu
      open={sortOpened}
      onChangeOpen={setSortOpened}
      onSelect={onChange}
      trigger={(context, ref) => (
        <List ref={ref}>
          <ListItemButton onClick={context.toggle} sx={{ padding: 0 }}>
            <ListItemText primary={t("sort.word")} secondary={getValueText(value, t)} />
          </ListItemButton>
        </List>
      )}
      popupContent={(context) => (
        <>
          {sortActionItems.map((action) => (
            <ContextMenuItem
              key={action.value}
              icon={action.icon}
              value={action.value}
              primary={action.text}
              onClick={context.submit}
              selected={action.value === value}
            />
          ))}
        </>
      )}
    />
  );
};

export default memo(SortContextMenu);
