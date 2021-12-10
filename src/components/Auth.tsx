import LogoutIcon from "@mui/icons-material/Logout";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { useAuth } from "composables/useAuth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { t } = useTranslation();
  const { isAuthenticated, signOutUser } = useAuth();
  const navigate = useNavigate();

  return isAuthenticated ? (
    <IconButton size="small" sx={{ ml: 2 }} onClick={signOutUser}>
      <LogoutIcon />
    </IconButton>
  ) : (
    <ButtonGroup
      variant="contained"
      aria-label="login register button group"
      sx={{ ml: 2 }}
    >
      <Button onClick={() => navigate("/login")}>{t("Login")}</Button>
      <Button onClick={() => navigate("/register")}>{t("Register")}</Button>
    </ButtonGroup>
  );
};
export default Auth;
