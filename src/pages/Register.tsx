import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import RegisterStepper from "components/register/RegisterStepper";
import { useAuth } from "composables/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegisterFormData } from "types/auth";
import { registerValidationSchema } from "validations/registerValidationSchema";

const RegisterStepperWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

const defaultValues: RegisterFormData = {
  name: "",
  gender: "",
  age: "",
  email: "",
  password: "",
  images: [],
};

const Register = () => {
  const { registerUser } = useAuth();
  const form = useForm({
    defaultValues,
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <div>
      <IconButton component={Link} to="/">
        <ArrowBackIcon />
      </IconButton>
      <RegisterStepperWrapper>
        <RegisterStepper form={form} onSubmit={onSubmit} />
      </RegisterStepperWrapper>
    </div>
  );
};

export default Register;
