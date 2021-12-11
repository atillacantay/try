import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import RegisterStepper from "components/register/RegisterStepper";
import { Link } from "react-router-dom";

const RegisterStepperWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

const Register = () => {
  return (
    <div>
      <IconButton component={Link} to="/">
        <ArrowBackIcon />
      </IconButton>
      <RegisterStepperWrapper>
        <RegisterStepper />
      </RegisterStepperWrapper>
    </div>
  );
};

export default Register;
