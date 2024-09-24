import CardCell from "@/primitives/Cells/CardCell";

import {
  Typography,
  Dialog,
  DialogTitle,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { OrbitalDataInterface } from "@/services/api/schema/orbitalData";
import formatDate, { DateFormat } from "@/util/date/format";
import InternalIcon from "@/primitives/InternalIcon";
import { flex1 } from "@/theme/commonStyles";

import styles from "./styles.module.css";

interface ModalProps {
  opened: boolean;
  onChangeOpened: (value: boolean) => void;
  data: OrbitalDataInterface;
}

const appBarClasses = { root: styles.appBar };

const OrbitalDataModal = ({ opened, onChangeOpened, data }: ModalProps) => {
  const { t } = useTranslation();
  return (
    <Dialog fullScreen open={opened} onClose={onChangeOpened} scroll="body">
      <AppBar position="relative" color="transparent" classes={appBarClasses}>
        <Toolbar variant="dense">
          <Typography sx={flex1} variant="h6" component="div">
            {t("detail.orbitalData.word")}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={() => onChangeOpened(false)}>
            <InternalIcon icon="close" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <CardCell text={t("detail.orbitalData.orbitId")} value={data.orbitId} />
        <CardCell
          text={t("detail.orbitalData.orbitDeterminationDate")}
          value={formatDate(data.orbitDeterminationDate, DateFormat.fullDateISO)}
        />
        <CardCell
          text={t("detail.orbitalData.firstObservationDate")}
          value={formatDate(data.firstObservationDate, DateFormat.shortDateISO)}
        />
        <CardCell
          text={t("detail.orbitalData.lastObservationDate")}
          value={formatDate(data.lastObservationDate, DateFormat.shortDateISO)}
        />
        <CardCell text={t("detail.orbitalData.dataArcInDays")} value={data.dataArcInDays} />
        <CardCell text={t("detail.orbitalData.observationsUsed")} value={data.observationsUsed} />
        <CardCell text={t("detail.orbitalData.orbitUncertainty")} value={data.orbitUncertainty} />
        <CardCell
          text={t("detail.orbitalData.minimumOrbitIntersection")}
          value={data.minimumOrbitIntersection}
        />
        <CardCell
          text={t("detail.orbitalData.jupiterTisserandInvariant")}
          value={data.jupiterTisserandInvariant}
        />
        <CardCell text={t("detail.orbitalData.epochOsculation")} value={data.epochOsculation} />
        <CardCell text={t("detail.orbitalData.eccentricity")} value={data.eccentricity} />
        <CardCell text={t("detail.orbitalData.semiMajorAxis")} value={data.semiMajorAxis} />
        <CardCell text={t("detail.orbitalData.inclination")} value={data.inclination} />
        <CardCell
          text={t("detail.orbitalData.ascendingNodeLongitude")}
          value={data.ascendingNodeLongitude}
        />
        <CardCell text={t("detail.orbitalData.orbitalPeriod")} value={data.orbitalPeriod} />
        <CardCell
          text={t("detail.orbitalData.perihelionDistance")}
          value={data.perihelionDistance}
        />
        <CardCell
          text={t("detail.orbitalData.perihelionArgument")}
          value={data.perihelionArgument}
        />
        <CardCell text={t("detail.orbitalData.aphelionDistance")} value={data.aphelionDistance} />
        <CardCell text={t("detail.orbitalData.perihelionTime")} value={data.perihelionTime} />
        <CardCell text={t("detail.orbitalData.meanAnomaly")} value={data.meanAnomaly} />
        <CardCell text={t("detail.orbitalData.meanMotion")} value={data.meanMotion} />
        <CardCell text={t("detail.orbitalData.equinox")} value={data.equinox} />
      </DialogContent>
      <DialogTitle sx={{ paddingTop: 0 }} variant="h6">
        {t("detail.orbitalData.orbitClass.word")}
      </DialogTitle>
      <DialogContent>
        <CardCell
          text={t("detail.orbitalData.orbitClass.type")}
          value={data.orbitClass.orbitclassType}
        />
        <CardCell
          text={t("detail.orbitalData.orbitClass.description")}
          value={data.orbitClass.orbitClassDescription}
        />
        <CardCell
          text={t("detail.orbitalData.orbitClass.range")}
          value={data.orbitClass.orbitClassRange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OrbitalDataModal;
