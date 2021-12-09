import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, IconButton } from "@mui/material";
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
    <Button
      onClick={() => navigate("/login")}
      variant="outlined"
      endIcon={<LoginIcon />}
      sx={{ ml: 2 }}
    >
      {t("Login")}
    </Button>
  );
};
export default Auth;
