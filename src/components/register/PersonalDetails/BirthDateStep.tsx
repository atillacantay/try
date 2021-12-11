import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import { TextField } from "@mui/material";
import moment from "moment";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const BirthDateStep = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name="birth_date"
      render={({ field }) => (
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label={t("Birth Date")}
            maxDate={moment(Date.now()).subtract(18, "years")}
            inputFormat={"DD/MM/YYYY"}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                fullWidth
                error={Boolean(errors.birth_date)}
                helperText={errors.birth_date?.message}
              />
            )}
            {...field}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default BirthDateStep;
