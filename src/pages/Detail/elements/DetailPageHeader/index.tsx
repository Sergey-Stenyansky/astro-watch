import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import PageHeader from "@/primitives/PageHeader";
import InternalIcon from "@/primitives/InternalIcon";

const DetailPageHeader = (props: { title?: string }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <PageHeader
      title={props.title}
      leftContent={
        <Button
          variant="text"
          startIcon={<InternalIcon icon="arrow_back" />}
          onClick={() => navigate(-1)}
        >
          {t("navigation.back")}
        </Button>
      }
    />
  );
};

export default DetailPageHeader;
