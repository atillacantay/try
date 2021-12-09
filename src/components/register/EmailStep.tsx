import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const EmailStep = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      {...register("email")}
      type="email"
      fullWidth
      variant="filled"
      placeholder={t("Email")}
      error={Boolean(errors.email)}
      helperText={errors.email?.message}
    />
  );
};

export default EmailStep;
