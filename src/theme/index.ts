import { AppTheme } from "types/theme";
import dark from "./dark";
import light from "./light";

const themes = {
  light,
  dark,
};

export default function getTheme(theme: AppTheme) {
  return themes[theme];
}
