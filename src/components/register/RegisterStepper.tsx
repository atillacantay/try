import { LoadingButton } from "@mui/lab";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { styled } from "@mui/material/styles";
import NameStep from "components/register/NameStep";
import { useAuth } from "composables/useAuth";
import * as React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RegisterFormData } from "types/auth";
import AgeStep from "./AgeStep";
import EmailStep from "./EmailStep";
import GenderStep from "./GenderStep";
import PasswordStep from "./PasswordStep";

const RegisterStepperRoot = styled("div")(({ theme }) => ({}));

const StepperExtended = styled(Stepper)(({ theme }) => ({
  overflowX: "auto",
}));

const RegisterForm = styled("form")(({ theme }) => ({
  padding: theme.spacing(4),
}));

const steps = [
  { key: "name", label: "Name" },
  { key: "gender", label: "Gender" },
  { key: "dateOfBirth", label: "Age" },
  { key: "email", label: "Email" },
  { key: "password", label: "Password" },
];

interface RegisterStepperProps {
  form: UseFormReturn<RegisterFormData, object>;
  onSubmit: (data: RegisterFormData) => void;
}

const RegisterStepper: React.FC<RegisterStepperProps> = ({
  form,
  onSubmit,
}) => {
  const { registerLoading } = useAuth();
  const { handleSubmit } = form;
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    const isValidated = await form.trigger(steps[activeStep].key as any);
    if (isValidated) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <RegisterStepperRoot sx={{ width: "100%" }}>
      <StepperExtended activeStep={activeStep}>
        {steps.map((step, index) => {
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
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && <NameStep />}
          {activeStep === 1 && <GenderStep />}
          {activeStep === 2 && <AgeStep />}
          {activeStep === 3 && <EmailStep />}
          {activeStep === 4 && <PasswordStep />}
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
