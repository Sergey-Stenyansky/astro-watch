import { centerContent } from "@/theme/commonStyles";
import { Backdrop, CircularProgress } from "@mui/material";

const spinnerOverlayStyles = { position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.2)" };

const SpinnerOverlay = () => (
  <Backdrop open sx={spinnerOverlayStyles}>
    <CircularProgress sx={centerContent} />
  </Backdrop>
);

export default SpinnerOverlay;
