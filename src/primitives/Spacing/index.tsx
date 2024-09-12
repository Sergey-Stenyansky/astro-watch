import { Box } from "@mui/material";

interface ComponentProps {
  h?: string | number;
  v?: string | number;
}

const Spacing = ({ h, v }: ComponentProps) => {
  return <Box sx={{ paddingTop: v, paddingLeft: h }} />;
};

export default Spacing;
