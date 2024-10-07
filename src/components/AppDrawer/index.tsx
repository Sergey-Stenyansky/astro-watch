import { Divider, Drawer, Toolbar } from "@mui/material";
import { useAppDrawerContext } from "./context";
import { ListItem, Box, ListItemButton, ListItemIcon, ListItemText, List } from "@mui/material";
import InternalIcon from "@/primitives/InternalIcon";

import { NavLink } from "react-router-dom";
import Spacing from "@/primitives/Spacing";
import { useTranslation } from "react-i18next";

import { AppMenuItem, menuItems } from "./menuItems";

const listIconStyles = { minWidth: 48 };
const wrapperStyles = { width: 250 };
const linkStyles = { textDecoration: "none", color: "inherit" };

const AppMenuItemComponent = ({ item, selected }: { item: AppMenuItem; selected?: boolean }) => (
  <ListItem key={item.code} disablePadding data-cy={item.testTag}>
    <ListItemButton selected={selected} onClick={item.action}>
      {item.icon && (
        <ListItemIcon sx={listIconStyles}>
          <InternalIcon size="medium" icon={item.icon} />
        </ListItemIcon>
      )}
      <ListItemText primary={item.title} />
    </ListItemButton>
  </ListItem>
);

const AppDrawer = () => {
  const { opened, appDrawer } = useAppDrawerContext();
  const { t } = useTranslation();
  return (
    <Drawer open={opened} onClose={appDrawer.close}>
      <Box sx={wrapperStyles} onClick={appDrawer.close}>
        <Spacing v={1} />
        <Toolbar variant="dense">
          <ListItemText
            data-cy="main-menu-nav"
            primary={t("mainMenu.nav")}
            primaryTypographyProps={{
              fontSize: 20,
              fontWeight: "medium",
              lineHeight: "20px",
            }}
          />
        </Toolbar>
        <List>
          <Divider />
          {menuItems.map((item) => {
            return item.link ? (
              <NavLink key={item.code} style={linkStyles} to={item.link}>
                {({ isActive }) => <AppMenuItemComponent item={item} selected={isActive} />}
              </NavLink>
            ) : (
              <AppMenuItemComponent key={item.code} item={item} />
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;
