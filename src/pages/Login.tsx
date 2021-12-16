import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadingButton } from "@mui/lab";
import { IconButton, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import PasswordField from "components/commons/PasswordField";
import { useAuth } from "composables/useAuth";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LoginFormData } from "types/auth";
import { loginValidationSchema } from "validations/loginValidationSchema";

const LoginForm = styled("form")(({ theme }) => ({
  padding: theme.spacing(4),
}));

const defaultValues: LoginFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const { t } = useTranslation();
  const { loginUser, loginLoading } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginUser(data);
  };

  return (
    <div>
      <IconButton component={Link} to="/">
        <ArrowBackIcon />
      </IconButton>
      <div>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            variant="filled"
            placeholder={t("Email")}
            fullWidth
          />
          <Box mb={4} />
          <PasswordField
            {...register("password")}
            variant="filled"
            placeholder={t("Password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            fullWidth
          />
          <Box mb={4} />
          <LoadingButton
            type="submit"
            loading={loginLoading}
            variant="contained"
          >
            {t("Login")}
          </LoadingButton>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
