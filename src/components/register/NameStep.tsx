import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const NameStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      {...register("name")}
      error={Boolean(errors.name)}
      helperText={errors.name?.message}
      variant="filled"
      fullWidth
    />
  );
};

export default NameStep;
