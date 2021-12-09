import { TextField } from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";

const EmailStep = () => {
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
      error={Boolean(errors.email)}
      helperText={errors.email?.message}
    />
  );
};

export default EmailStep;
