import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "composables/useAuth";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RegisterFormData } from "types/auth";
import { registerValidationSchema } from "validations/registerValidationSchema";
import AccountDetailsStep from "./AccountDetails/AccountDetailsStep";
import PersonalDetailsStep from "./PersonalDetails/PersonalDetailsStep";
import PhotoStep from "./PhotoStep";

const RegisterStepperRoot = styled("div")(({ theme }) => ({}));

const StepperExtended = styled(Stepper)(({ theme }) => ({
  overflowX: "auto",
}));

const RegisterForm = styled("form")(({ theme }) => ({
  padding: theme.spacing(4),
}));

const defaultValues: RegisterFormData = {
  name: "",
  gender: "",
  birth_date: new Date(0),
  email: "",
  password: "",
  photos: [],
};

const steps = [
  { key: "personalDetails", label: "Personal Details" },
  { key: "accountDetails", label: "Account Details" },
  { key: "photos", label: "Photos" },
];

interface RegisterStepperProps {}

const RegisterStepper: React.FC<RegisterStepperProps> = () => {
  const { registerLoading, registerUser } = useAuth();
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = React.useState(0);

  const currentValidationSchema = registerValidationSchema[activeStep];
  const form = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
  });

  const handleNext = async () => {
    const isStepValid = await form.trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const onSubmit = (data: RegisterFormData) => registerUser(data);

  return (
    <RegisterStepperRoot sx={{ width: "100%" }}>
      <StepperExtended activeStep={activeStep}>
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={step.key} {...stepProps}>
              <StepLabel {...labelProps}>{t(step.label)}</StepLabel>
            </Step>
          );
        })}
      </StepperExtended>
      <FormProvider {...form}>
        <RegisterForm onSubmit={form.handleSubmit(onSubmit)}>
          {activeStep === 0 && <PersonalDetailsStep />}
          {activeStep === 1 && <AccountDetailsStep />}
          {activeStep === 2 && <PhotoStep />}
          {activeStep !== steps.length && (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {t("Back")}
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === steps.length - 1 ? (
                  <LoadingButton
                    type="submit"
                    loading={registerLoading}
                    variant="contained"
                  >
                    {t("Register")}
                  </LoadingButton>
                ) : (
                  <Button onClick={handleNext}>{t("Next")}</Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </RegisterForm>
      </FormProvider>
    </RegisterStepperRoot>
  );
};

export default RegisterStepper;
