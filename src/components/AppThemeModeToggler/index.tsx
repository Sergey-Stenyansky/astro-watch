import { IconButton } from "@mui/material";

import InternalIcon from "@/primitives/InternalIcon";
import { useAppTheme } from "@/theme/context";

import { yellow, indigo } from "@mui/material/colors";

const AppThemeModeToggler = () => {
  const { mode, toggleMode } = useAppTheme();
  return (
    <IconButton onClick={toggleMode as any} data-test-id="theme-toggler">
      {mode === "light" ? (
        <InternalIcon icon="dark_mode" htmlColor={indigo.A200} />
      ) : (
        <InternalIcon icon="light_mode" htmlColor={yellow[300]} />
      )}
    </IconButton>
  );
};

export default AppThemeModeToggler;
