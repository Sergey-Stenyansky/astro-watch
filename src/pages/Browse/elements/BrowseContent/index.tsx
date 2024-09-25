import { AppRoutes } from "@/core/appRoutes";
import InternalIcon from "@/primitives/InternalIcon";
import { useGetAstroBrowseQuery } from "@/services/api";
import formatDate, { DateFormat } from "@/util/date/format";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMemo, useState, ChangeEvent } from "react";
import { Navigate } from "react-router-dom";

import { Link as AppLink } from "react-router-dom";
import { applySort } from "@/pages/Browse/sorting";
import { diameterFormatter } from "@/util/format/diameter";
import { yesOrNo } from "@/util/wordUtil";

import BrowseTableHead from "@/pages/Browse/elements/BrowseTableHead";
import { useBrowseContext } from "@/pages/Browse/context";
import TablePlaceholder from "@/primitives/TablePlaceholder";
import { useTranslation } from "react-i18next";
import { flex1 } from "@/theme/commonStyles";
import TextInput from "@/primitives/TextInput";

import Highlight from "@/primitives/Highlight";

const toolbarStyles = {
  pl: { sm: 2 },
  pr: { xs: 1, sm: 1 },
};

const BrowseContent = () => {
  const { data, isFetching, isError } = useGetAstroBrowseQuery(0);
  const [searchValue, setSearchValue] = useState("");

  const { sort } = useBrowseContext();

  const { t } = useTranslation();

  const items = useMemo(() => {
    const items = (data?.nearEarthObjects || []).slice();

    return applySort(items, sort.activeField, sort.sortOrder);
  }, [data, sort]);

  if (!isFetching && isError) {
    return <Navigate to={AppRoutes.getDefaultUrl()} />;
  }

  if (!items.length) {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <BrowseTableHead />
          <TablePlaceholder title={t("search.noElements")} colSpan={6} />
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <Toolbar sx={toolbarStyles}>
        <Typography variant="h5" sx={flex1}>
          {t("browse.asteroids")}
        </Typography>
        <TextInput
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue("")}
        />
      </Toolbar>
      <TableContainer component={Paper}>
        <Table size="small">
          <BrowseTableHead />
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th">
                  <Highlight search={searchValue}>{item.name}</Highlight>
                </TableCell>
                <TableCell>
                  {formatDate(item.closeApproachData[0].closeApproachDate, DateFormat.shortDate)}
                </TableCell>
                <TableCell>
                  {item.estimatedDiameter.feet
                    ? diameterFormatter(item.estimatedDiameter.feet)
                    : ""}
                </TableCell>
                <TableCell align="center">{yesOrNo(item.isSentryObject)}</TableCell>
                <TableCell align="center">
                  <Typography
                    fontWeight={item.isPotentiallyHazardous ? "fontWeightBold" : "fontWeightNormal"}
                    color={item.isPotentiallyHazardous ? "error" : "default"}
                  >
                    {yesOrNo(item.isPotentiallyHazardous)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <AppLink to={AppRoutes.getDetailUrl(item.id)}>
                    <IconButton>
                      <InternalIcon icon="open_in_new" />
                    </IconButton>
                  </AppLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BrowseContent;
