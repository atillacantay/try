import { MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const AgeStep = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const createAgeArray = () =>
    Array.from({ length: 100 - 18 }, (_, i) => 18 + i);

  return (
    <Controller
      render={({ field }) => (
        <TextField
          id="age-select"
          select
          label={t("Age")}
          fullWidth
          variant="filled"
          error={Boolean(errors.age)}
          helperText={errors.age?.message}
          SelectProps={{
            MenuProps: MenuProps,
          }}
          {...field}
        >
          {createAgeArray().map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )}
      control={control}
      name="age"
    />
  );
};

export default AgeStep;
