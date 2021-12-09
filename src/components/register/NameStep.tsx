import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const NameStep = () => {
  const { t } = useTranslation();
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
      placeholder={t("Name")}
      fullWidth
    />
  );
};

export default NameStep;
