import { ThemeProvider } from "@mui/material";
import React, { FC } from "react";
import getTheme from "theme";
import { AppTheme } from "types/theme";

interface ICustomThemeContext {
  currentTheme: AppTheme;
  setTheme: Function;
}

export const CustomThemeContext = React.createContext<ICustomThemeContext>({
  currentTheme: "light",
  setTheme: () => {},
});

const CustomThemeProvider: FC = ({ children }) => {
  const currentTheme = (localStorage.getItem("appTheme") || "dark") as AppTheme;
  const [themeName, _setThemeName] = React.useState<AppTheme>(currentTheme);
  const theme = getTheme(themeName);

  const setThemeName = () => {
    const name = themeName === "dark" ? "light" : "dark";
    localStorage.setItem("appTheme", name);
    _setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
