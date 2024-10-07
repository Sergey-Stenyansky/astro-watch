import { AppRoutes } from "@/core/appRoutes";
import { useGetAtroDetailQuery } from "@/services/api";
import { Navigate, useParams } from "react-router-dom";

import CardCell from "@/primitives/Cells/CardCell";
import Card from "@/primitives/Card";
import Spacing from "@/primitives/Spacing";

import { Box, Skeleton, Link, Chip, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { diameterFormatter } from "@/util/format/diameter";
import { useToggle } from "react-use";

import Checkbox from "@/primitives/Checkbox";
import { flexCenter, flexSpaceBetween } from "@/theme/commonStyles";
import OrbitalDataModal from "./modals/OrbitalDataModal";
import ApproachDataItem from "./elements/ApproachDataItem";

import { overlowEllipsis } from "@/theme/commonStyles";

import { APPROACH_DATA_LIMIT } from "./common";
import { getShowAllButtonText } from "./util";
import { useApproachData } from "./hooks";
import { CloseApproachDataInterface } from "@/services/api/schema/closeApproachData";
import InternalIcon from "@/primitives/InternalIcon";

import CommonPageHeader from "@/components/CommonPageHeader";

const PlaceHolder = () => {
  return (
    <>
      <CommonPageHeader withBackButton />
      <Skeleton variant="rectangular" animation="wave" width="100%" height={300} />
      <Skeleton variant="rectangular" animation="wave" width="100%" height={300} />
      <Skeleton variant="rectangular" animation="wave" width="100%" height={300} />
    </>
  );
};

const linkStyles = [{ maxWidth: 600 }, overlowEllipsis];

const empty: CloseApproachDataInterface[] = [];

const Detail = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetAtroDetailQuery(Number(id));

  const { t } = useTranslation();

  const [excludePast, setExcludePast] = useToggle(true);
  const [limitItems, setLimitItems] = useToggle(true);

  const [orbitalDataOpened, toggleOrbitalData] = useToggle(false);

  const approachData = useApproachData(data?.closeApproachData || empty, excludePast, limitItems);

  if (!isFetching && isError) {
    return <Navigate to={AppRoutes.getDefaultUrl()} />;
  }

  if (!data) {
    return <PlaceHolder />;
  }

  return (
    <>
      <CommonPageHeader withBackButton title={data.name} />
      <Card testTag="detail-content">
        <Box sx={flexSpaceBetween}>
          <Link sx={linkStyles} href={data.nasaJplUrl}>
            {data.nasaJplUrl}
          </Link>
          <Button variant="text" onClick={toggleOrbitalData} data-cy="toggle-orbital-data">
            {t("detail.orbitalData.word")}
          </Button>
        </Box>
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
          value={
            data.isSentryObject ? (
              <InternalIcon icon="check_circle" color="success" />
            ) : (
              <InternalIcon icon="cancel" color="error" />
            )
          }
        />
        {data.isPotentiallyHazardous && (
          <CardCell text={t("feed.astroObjectFields.isPotentiallyHazardous")} color="error" />
        )}
        <Spacing v={1} />
        <Checkbox
          label={t("detail.onlyFutureDates")}
          checked={excludePast}
          onChange={setExcludePast}
        />
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
        <OrbitalDataModal
          opened={orbitalDataOpened}
          onChangeOpened={toggleOrbitalData}
          data={data.orbitalData}
        />
      </Card>
    </>
  );
};

export default Detail;
