import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button component={Link} to="/register" variant="contained" color="primary">
        {t('hey')}
      </Button>
    </div>
  );
}

export default Landing;
