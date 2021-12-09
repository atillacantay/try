import GTranslateIcon from "@mui/icons-material/GTranslate";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import {
  changeLanguage,
  getCurrentLanguage,
  getLanguageLabel,
  getLanguageList,
} from "utils/i18n";

const LocaleChanger = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (language: string) => {
    localStorage.setItem("language", language);
    changeLanguage(language);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <GTranslateIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {getLanguageList().map((language) => (
          <MenuItem
            key={language}
            selected={language === getCurrentLanguage()}
            onClick={() => handleChange(language)}
          >
            {getLanguageLabel(language)}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};
export default LocaleChanger;
