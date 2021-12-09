import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { CustomThemeContext } from "providers/CustomThemeProvider";
import * as React from "react";

const ThemeChanger = () => {
  const { currentTheme, setTheme } = React.useContext(CustomThemeContext);

  const handleChange = () => {
    setTheme();
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleChange} size="small" sx={{ ml: 2 }}>
        {currentTheme === "dark" ? <LightModeIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </React.Fragment>
  );
};
export default ThemeChanger;
