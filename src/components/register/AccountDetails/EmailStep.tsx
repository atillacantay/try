import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const EmailStep = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <TextField
          type="email"
          fullWidth
          variant="filled"
          placeholder={t("Email")}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...field}
        />
      )}
    />
  );
};

export default EmailStep;
