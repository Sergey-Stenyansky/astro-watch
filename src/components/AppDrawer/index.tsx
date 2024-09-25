import { Divider, Drawer, Toolbar } from "@mui/material";
import { useAppDrawerContext } from "./context";
import { ListItem, Box, ListItemButton, ListItemIcon, ListItemText, List } from "@mui/material";
import InternalIcon from "@/primitives/InternalIcon";

import { Link as AppLink } from "react-router-dom";
import Spacing from "@/primitives/Spacing";
import { useTranslation } from "react-i18next";

const linkStyles = { textDecoration: "none", color: "inherit" };

import { menuItems } from "./menuItems";

const AppDrawer = () => {
  const { opened, appDrawer } = useAppDrawerContext();
  const { t } = useTranslation();
  return (
    <Drawer open={opened} onClose={appDrawer.close}>
      <Box sx={{ width: 250 }} onClick={appDrawer.close}>
        <Spacing v={1} />
        <Toolbar variant="dense">
          <ListItemText
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
            const content = (
              <ListItem key={item.code} disablePadding>
                <ListItemButton onClick={item.action}>
                  {item.icon && (
                    <ListItemIcon sx={{ minWidth: 48 }}>
                      <InternalIcon size="medium" icon={item.icon} />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
            return item.link ? (
              <AppLink style={linkStyles} to={item.link}>
                {content}
              </AppLink>
            ) : (
              content
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;
