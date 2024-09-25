import { sortActions, SortOrder } from "@/reducers/sorting";
import { TableCell, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import { tableHeaders } from "@/pages/Browse/headers";
import { useBrowseContext } from "@/pages/Browse/context";

const BrowseTableHead = () => {
  const { sort, sortDispatch } = useBrowseContext();
  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map((header) => (
          <TableCell key={header.title} align={header.align}>
            {header.sortingField ? (
              <TableSortLabel
                active={sort.activeField === header.sortingField}
                direction={sort.sortOrder === SortOrder.asc ? "asc" : "desc"}
                onClick={() => sortDispatch(sortActions.toggle(header.sortingField!))}
              >
                <Typography fontWeight="fontWeightBold">{header.title}</Typography>
              </TableSortLabel>
            ) : (
              <Typography fontWeight="fontWeightBold">{header.title}</Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default BrowseTableHead;
