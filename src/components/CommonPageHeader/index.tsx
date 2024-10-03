import { Button, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

import PageHeader from "@/primitives/PageHeader";
import InternalIcon from "@/primitives/InternalIcon";
import { useAppNavigation } from "@/components/AppNavigation/context";
import { useAppDrawerContext } from "@/components/AppDrawer/context";
import AppThemeModeToggler from "../AppThemeModeToggler";

interface ComponentProps {
  title?: string;
  withBackButton?: boolean;
  withoutMode?: boolean;
}

const CommonPageHeader = ({ title, withBackButton, withoutMode }: ComponentProps) => {
  const { t } = useTranslation();
  const appNavigation = useAppNavigation();
  const { appDrawer } = useAppDrawerContext();
  return (
    <PageHeader
      title={title}
      leftContent={
        <>
          <IconButton onClick={appDrawer.open} aria-label={t("mainMenu.title")}>
            <InternalIcon icon="menu" color="primary" />
          </IconButton>
          {appNavigation.isEmpty || !withBackButton ? null : (
            <Button
              variant="text"
              startIcon={<InternalIcon icon="arrow_back" />}
              onClick={appNavigation.goBack}
            >
              {t("navigation.back")}
            </Button>
          )}
        </>
      }
      rightContent={!withoutMode && <AppThemeModeToggler />}
    />
  );
};

export default CommonPageHeader;
