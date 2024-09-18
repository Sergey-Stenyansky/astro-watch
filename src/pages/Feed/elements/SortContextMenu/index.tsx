import { memo, useCallback } from "react";

import { useToggle } from "react-use";

import ContextMenu from "@/primitives/ContextMenu";
import ContextMenuItem from "@/primitives/ContextMenuItem";

import { sortActionItems } from "./actions";
import { SortActionValues } from "./types";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  value?: SortActionValues;
  onChange: (value: SortActionValues) => void;
}

const SortContextMenu = ({ value, onChange }: ComponentProps) => {
  const { t } = useTranslation();
  const [sortOpened, setSortOpened] = useToggle(false);
  return (
    <ContextMenu
      open={sortOpened}
      onChangeOpen={setSortOpened}
      onSelect={onChange}
      trigger={useCallback(
        ({ toggle }, ref) => (
          <List ref={ref}>
            <ListItemButton onClick={toggle} sx={{ padding: "0" }}>
              <ListItemText
                primary={t("sort.word")}
                secondary={
                  sortActionItems.find((item) => item.value === value)?.text ||
                  t("menu.pickFromList")
                }
              />
            </ListItemButton>
          </List>
        ),
        [value, t],
      )}
      popupContent={useCallback(
        ({ submit }) => (
          <>
            {sortActionItems.map((action) => (
              <ContextMenuItem
                key={action.value}
                icon={action.icon}
                value={action.value}
                primary={action.text}
                onClick={submit}
                selected={action.value === value}
              />
            ))}
          </>
        ),
        [value],
      )}
    />
  );
};

export default memo(SortContextMenu);
