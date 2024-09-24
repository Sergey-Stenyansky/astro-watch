import { AppBar, Toolbar, Typography } from "@mui/material";
import HideOnScroll from "@/primitives/HideOnScroll";
import { memo, ReactNode } from "react";
import { flex1, flexSpaceBetween } from "@/theme/commonStyles";

interface ComponentProps {
  title: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

const PageHeader = ({ title, leftContent, rightContent }: ComponentProps) => (
  <>
    <HideOnScroll>
      <AppBar position="fixed" color="default">
        <Toolbar sx={flexSpaceBetween}>
          {leftContent}
          <Typography align="center" sx={flex1} variant="h5" color="inherit" component="div">
            {title}
          </Typography>
          {rightContent}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Toolbar />
  </>
);

export default memo(PageHeader);
