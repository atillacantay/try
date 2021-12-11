import PasswordField from "components/commons/PasswordField";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const PasswordStep = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <PasswordField
      {...register("password")}
      variant="filled"
      placeholder={t("Password")}
      error={Boolean(errors.password)}
      helperText={errors.password?.message}
      fullWidth
    />
  );
};

export default PasswordStep;
