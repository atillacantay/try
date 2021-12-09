import { AppBar, Box, Toolbar } from "@mui/material";
import Auth from "./Auth";
import LocaleChanger from "./LocaleChanger";
import ThemeChanger from "./ThemeChanger";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeChanger />
          <LocaleChanger />
          <Auth />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
