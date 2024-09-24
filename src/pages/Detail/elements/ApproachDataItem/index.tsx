import CardCell from "@/primitives/Cells/CardCell";

import { Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

import formatDate, { DateFormat } from "@/util/date/format";
import { useToggle } from "react-use";

import { CloseApproachDataInterface } from "@/services/api/schema/closeApproachData";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { memo } from "react";

const ApproachDataItem = ({ item }: { item: CloseApproachDataInterface }) => {
  const { t } = useTranslation();
  const [opened, setOpened] = useToggle(false);

  return (
    <Accordion expanded={opened} onChange={setOpened}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Typography fontWeight="fontWeightBold">
          {formatDate(item.closeApproachDateFull, DateFormat.fullDate)}
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <CardCell
          text={t("feed.closeApproachDate")}
          value={formatDate(item.closeApproachDateFull, DateFormat.fullDate)}
        />
        <CardCell
          text={t("feed.relativeVelocity")}
          value={Number(item.relativeVelocity.kilometersPerSecond).toFixed(2)}
        />
        <CardCell
          text={t("feed.astroObjectFields.missDistance")}
          value={Number(item.missDistance.kilometers).toFixed(2)}
        />
        <CardCell
          text={t("detail.orbitingBody")}
          value={t(`orbitingBodies.${item.orbitingDody.toLocaleLowerCase()}`, item.orbitingDody)}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(ApproachDataItem);
