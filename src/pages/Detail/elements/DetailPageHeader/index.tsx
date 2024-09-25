import { Button, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

import PageHeader from "@/primitives/PageHeader";
import InternalIcon from "@/primitives/InternalIcon";
import { useAppNavigation } from "@/components/AppNavigation/context";
import { useAppDrawerContext } from "@/components/AppDrawer/context";

const DetailPageHeader = (props: { title?: string }) => {
  const { t } = useTranslation();
  const appNavigation = useAppNavigation();
  const { appDrawer } = useAppDrawerContext();
  return (
    <PageHeader
      title={props.title}
      leftContent={
        <>
          <IconButton onClick={appDrawer.open}>
            <InternalIcon icon="menu" color="primary" />
          </IconButton>
          {appNavigation.isEmpty ? null : (
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
    />
  );
};

export default DetailPageHeader;
