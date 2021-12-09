import { MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const genders = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];

const GenderStep = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
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
          {genders.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {t(option.label)}
            </MenuItem>
          ))}
        </TextField>
      )}
      control={control}
      name="gender"
    />
  );
};

export default GenderStep;
