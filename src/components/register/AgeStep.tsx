import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import moment from "moment";
import { Controller, useFormContext } from "react-hook-form";

const AgeStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            {...field}
            views={["year"]}
            maxDate={moment().subtract(18, "years").toDate()}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="filled"
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
  );
};

export default AgeStep;
