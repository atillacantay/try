import { MenuItem, TextField } from "@mui/material";
import { GENDERS } from "constants/user";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const GenderStep = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name="gender"
      render={({ field }) => (
        <TextField
          id="gender-select"
          select
          label={t("Gender")}
          fullWidth
          variant="filled"
          error={Boolean(errors.gender)}
          helperText={errors.gender?.message}
          {...field}
        >
          {GENDERS.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {t(option.label)}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default GenderStep;
