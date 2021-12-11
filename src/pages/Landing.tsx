import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const LandingContainer = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));

const Landing = () => {
  const { t } = useTranslation();

  return <LandingContainer>{t("Landing Page")}</LandingContainer>;
};

export default Landing;
