import {
  FormControl,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { GENDERS } from "constants/user";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const GenderFilterStep = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="genderFilter"
      control={control}
      render={({ field }) => (
        <FormControl error={Boolean(errors.genderFilter)}>
          <ToggleButtonGroup color="primary" exclusive {...field}>
            {GENDERS.map((option) => (
              <ToggleButton key={option.key} value={option.key}>
                {t(option.label)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <FormHelperText>{errors.genderFilter?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default GenderFilterStep;
