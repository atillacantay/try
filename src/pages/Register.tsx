import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import PasswordField from "components/mui/molecules/PasswordField";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RegisterFormData } from "types/auth";
import { registerValidationSchema } from "validations/registerValidationSchema";

const RegisterForm = styled("form")(({ theme }) => ({
  padding: theme.spacing(4),
}));

const defaultValues: RegisterFormData = {
  name: "",
  dateOfBirth: "",
  email: "",
  password: "",
};

const Register = () => {
  const { t } = useTranslation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = () => {
    // console.log(data);
  };

  return (
    <div>
      <IconButton component={Link} to="/">
        <ArrowBackIcon />
      </IconButton>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              {...register("name")}
              placeholder={t("Name")}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    {...field}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(errors.dateOfBirth)}
                        helperText={errors.dateOfBirth?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
              control={control}
              name="dateOfBirth"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("email")}
              type="email"
              placeholder={t("Email")}
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              {...register("password")}
              placeholder={t("Password")}
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              {t("Create account")}
            </Button>
          </Grid>
        </Grid>
      </RegisterForm>
    </div>
  );
};

export default Register;
