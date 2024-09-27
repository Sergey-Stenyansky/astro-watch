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
  Box,
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
import { flex1, positionRelative } from "@/theme/commonStyles";
import TextInput from "@/primitives/TextInput";

import TablePagination from "@mui/material/TablePagination";

import Highlight from "@/primitives/Highlight";
import SpinnerOverlay from "@/primitives/SpinnerOverlay";
import CommonPageHeader from "@/components/CommonPageHeader";

const toolbarStyles = {
  pl: { sm: 2 },
  pr: { xs: 1, sm: 1 },
};

const BrowseContent = () => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const { data, isFetching, isLoading, isError } = useGetAstroBrowseQuery({ page, perPage });
  const [searchValue, setSearchValue] = useState("");

  const { sort } = useBrowseContext();

  const { t } = useTranslation();

  const items = useMemo(() => {
    const items = (data?.nearEarthObjects || []).slice();
    return applySort(items, sort.activeField, sort.sortOrder);
  }, [data, sort]);

  if (!isLoading && isError) {
    return <Navigate to={AppRoutes.getDefaultUrl()} />;
  }

  if (!items.length) {
    return (
      <>
        <CommonPageHeader title={t("browse.asteroids")} />
        <TableContainer component={Paper}>
          <Table size="small">
            <BrowseTableHead />
            <TablePlaceholder title={t("search.noElements")} colSpan={6} />
          </Table>
        </TableContainer>
      </>
    );
  }

  return (
    <>
      <CommonPageHeader title={t("browse.asteroids")} />
      <Toolbar sx={toolbarStyles}>
        <Box sx={flex1} />
        <TextInput
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue("")}
        />
      </Toolbar>
      <TableContainer component={Paper}>
        <Table size="small">
          <BrowseTableHead />
          <TableBody sx={positionRelative}>
            {isFetching && <SpinnerOverlay />}
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th">
                  <Typography>
                    <Highlight search={searchValue}>{item.name}</Highlight>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatDate(item.closeApproachData[0].closeApproachDate, DateFormat.shortDate)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {item.estimatedDiameter.feet
                      ? diameterFormatter(item.estimatedDiameter.feet)
                      : ""}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{yesOrNo(item.isSentryObject)}</Typography>
                </TableCell>
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
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component="div"
        count={data?.page.totalElements || 20}
        rowsPerPage={perPage}
        page={page}
        onPageChange={(_, page) => setPage(page)}
        onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPerPage(+e.target.value);
          setPage(0);
        }}
        labelDisplayedRows={({ from, to, count }) => (
          <Typography component="span">{`${from}–${to} ${t("pagination.of")} ${count}`}</Typography>
        )}
        labelRowsPerPage={<Typography component="span">{t("pagination.perPage")}</Typography>}
      />
    </>
  );
};

export default BrowseContent;
