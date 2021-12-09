import { AppBar, Box, Toolbar } from "@mui/material";
import LocaleChanger from "./LocaleChanger";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <LocaleChanger />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
