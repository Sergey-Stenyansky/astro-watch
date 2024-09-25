import { Box, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { flexCenter, fullWidth } from "@/theme/commonStyles";

interface ComponentProps {
  title: string;
  colSpan?: number;
}

const placeholderStyles = [fullWidth, flexCenter, { height: 180 }];

const TablePlaceholder = ({ title, colSpan }: ComponentProps) => (
  <TableBody>
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Box sx={placeholderStyles}>
          <Typography variant="h5">{title}</Typography>
        </Box>
      </TableCell>
    </TableRow>
  </TableBody>
);

export default TablePlaceholder;
