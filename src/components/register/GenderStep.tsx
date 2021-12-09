import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
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
        <FormControl error={Boolean(errors.gender)} fullWidth>
          <Select
            {...field}
            labelId="gender-select-label"
            id="gender-select"
            error={Boolean(errors.gender)}
            variant="filled"
          >
            {genders.map((gender) => (
              <MenuItem value={gender.key}>{t(gender.label)}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.gender?.message}</FormHelperText>
        </FormControl>
      )}
      control={control}
      name="gender"
    />
  );
};

export default GenderStep;
