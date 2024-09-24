import { AppRoutes } from "@/core/appRoutes";
import { useGetAtroDetailQuery } from "@/services/api";
import { Navigate, useParams } from "react-router-dom";

import CardCell from "@/primitives/Cells/CardCell";
import Card from "@/primitives/Card";
import Spacing from "@/primitives/Spacing";

import {
  Typography,
  Box,
  Skeleton,
  Link,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  Button,
  DialogTitle,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import Close from "@mui/icons-material/Close";

import formatDate, { DateFormat } from "@/util/date/format";

import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

import { diameterFormatter } from "@/util/format/diameter";
import { useToggle } from "react-use";

import { CloseApproachDataInterface } from "@/services/api/schema/closeApproachData";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { useMemo } from "react";
import dayjs from "dayjs";
import Checkbox from "@/primitives/Checkbox";
import { flexCenter } from "@/theme/commonStyles";
import i18n from "@/i18n";
import { getElementDeclension } from "@/util/wordDeclinations/element";

const ApproachDataItem = ({ item }: { item: CloseApproachDataInterface }) => {
  const { t } = useTranslation();
  const [opened, setOpened] = useToggle(false);

  return (
    <Accordion expanded={opened} onChange={setOpened}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Typography fontWeight="fontWeightBold">
          {formatDate(item.closeApproachDate, DateFormat.shortDate)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CardCell
          text={t("feed.closeApproachDate")}
          value={formatDate(item.closeApproachDate, DateFormat.shortDate)}
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

const APPROACH_DATA_LIMIT = 30;

function getShowAllButtonText(total: number, limited: boolean) {
  const count = total - APPROACH_DATA_LIMIT;
  return limited ? `${i18n.t("show")} ${count} ${getElementDeclension(count)}` : i18n.t("hide");
}

const Detail = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetAtroDetailQuery(Number(id));

  const { t } = useTranslation();

  const [excludePast, setExcludePast] = useToggle(true);
  const [limitItems, setLimitItems] = useToggle(true);

  const [orbitalDataOpened, toggleOrbitalData] = useToggle(false);

  const approachData = useMemo(() => {
    let items = data?.closeApproachData || [];
    let total = items.length;
    if (excludePast) {
      const today = dayjs();
      items = items.filter((item) => {
        const date = dayjs(item.closeApproachDateFull);
        return date.isAfter(today);
      });
      total = items.length;
    }
    if (limitItems) {
      items = items.slice(0, APPROACH_DATA_LIMIT);
    }
    return { items, total };
  }, [excludePast, data, limitItems]);

  if (!isFetching && isError) {
    return <Navigate to={AppRoutes.getDefaultUrl()} />;
  }

  if (!data) {
    return <Skeleton width="100%" height={300} />;
  }

  return (
    <>
      <Card>
        <Link href={data.nasaJplUrl}>{data.nasaJplUrl}</Link>
        <Spacing v={1} />
        {data.estimatedDiameter.feet && (
          <CardCell
            text={t("feed.diameter")}
            value={diameterFormatter(data.estimatedDiameter.feet)}
          />
        )}
        <CardCell text={t("feed.absoluteMagnitude")} value={data.absoluteMagnitudeH} />
        <CardCell
          text={t("feed.astroObjectFields.isSentryObject")}
          value={data.isSentryObject ? <CheckCircle color="success" /> : <Cancel color="error" />}
        />
        {data.isPotentiallyHazardous && (
          <CardCell text={t("feed.astroObjectFields.isPotentiallyHazardous")} color="error" />
        )}
        <Spacing v={1} />
        <Box>
          <Button variant="text" onClick={toggleOrbitalData}>
            {t("detail.orbitalData.word")}
          </Button>
        </Box>
        <Checkbox label="Только будущие" checked={excludePast} onChange={setExcludePast} />
        {approachData.items.map((item) => (
          <ApproachDataItem key={item.closeApproachDateFull} item={item} />
        ))}
        {approachData.total > APPROACH_DATA_LIMIT && (
          <>
            <Spacing v={2} />
            <Box sx={flexCenter}>
              <Chip
                variant="outlined"
                label={getShowAllButtonText(approachData.total, limitItems)}
                onClick={setLimitItems}
              />
            </Box>
          </>
        )}
        <Dialog fullScreen open={orbitalDataOpened} onClose={toggleOrbitalData} scroll="body">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleOrbitalData}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {t("detail.orbitalData.word")}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <CardCell text={t("detail.orbitalData.orbitId")} value={data.orbitalData.orbitId} />
            <CardCell
              text={t("detail.orbitalData.orbitDeterminationDate")}
              value={data.orbitalData.orbitDeterminationDate}
            />
            <CardCell
              text={t("detail.orbitalData.firstObservationDate")}
              value={data.orbitalData.firstObservationDate}
            />
            <CardCell
              text={t("detail.orbitalData.lastObservationDate")}
              value={data.orbitalData.lastObservationDate}
            />
            <CardCell
              text={t("detail.orbitalData.dataArcInDays")}
              value={data.orbitalData.dataArcInDays}
            />
            <CardCell
              text={t("detail.orbitalData.observationsUsed")}
              value={data.orbitalData.observationsUsed}
            />
            <CardCell
              text={t("detail.orbitalData.orbitUncertainty")}
              value={data.orbitalData.orbitUncertainty}
            />
            <CardCell
              text={t("detail.orbitalData.minimumOrbitIntersection")}
              value={data.orbitalData.minimumOrbitIntersection}
            />
            <CardCell
              text={t("detail.orbitalData.jupiterTisserandInvariant")}
              value={data.orbitalData.jupiterTisserandInvariant}
            />
            <CardCell
              text={t("detail.orbitalData.epochOsculation")}
              value={data.orbitalData.epochOsculation}
            />
            <CardCell
              text={t("detail.orbitalData.eccentricity")}
              value={data.orbitalData.eccentricity}
            />
            <CardCell
              text={t("detail.orbitalData.semiMajorAxis")}
              value={data.orbitalData.semiMajorAxis}
            />
            <CardCell
              text={t("detail.orbitalData.inclination")}
              value={data.orbitalData.inclination}
            />
            <CardCell
              text={t("detail.orbitalData.ascendingNodeLongitude")}
              value={data.orbitalData.ascendingNodeLongitude}
            />
            <CardCell
              text={t("detail.orbitalData.orbitalPeriod")}
              value={data.orbitalData.orbitalPeriod}
            />
            <CardCell
              text={t("detail.orbitalData.perihelionDistance")}
              value={data.orbitalData.perihelionDistance}
            />
            <CardCell
              text={t("detail.orbitalData.perihelionArgument")}
              value={data.orbitalData.perihelionArgument}
            />
            <CardCell
              text={t("detail.orbitalData.aphelionDistance")}
              value={data.orbitalData.aphelionDistance}
            />
            <CardCell
              text={t("detail.orbitalData.perihelionTime")}
              value={data.orbitalData.perihelionTime}
            />
            <CardCell
              text={t("detail.orbitalData.meanAnomaly")}
              value={data.orbitalData.meanAnomaly}
            />
            <CardCell
              text={t("detail.orbitalData.meanMotion")}
              value={data.orbitalData.meanMotion}
            />
            <CardCell text={t("detail.orbitalData.equinox")} value={data.orbitalData.equinox} />
          </DialogContent>
          <DialogTitle sx={{ paddingTop: 0 }} variant="h6">
            {t("detail.orbitalData.orbitClass.word")}
          </DialogTitle>
          <DialogContent>
            <CardCell
              text={t("detail.orbitalData.orbitClass.type")}
              value={data.orbitalData.orbitClass.orbitclassType}
            />
            <CardCell
              text={t("detail.orbitalData.orbitClass.description")}
              value={data.orbitalData.orbitClass.orbitClassDescription}
            />
            <CardCell
              text={t("detail.orbitalData.orbitClass.range")}
              value={data.orbitalData.orbitClass.orbitClassRange}
            />
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};

export default Detail;
