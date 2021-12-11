import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const NameStep = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <TextField
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          variant="filled"
          placeholder={t("Name")}
          fullWidth
          {...field}
        />
      )}
    />
  );
};

export default NameStep;
