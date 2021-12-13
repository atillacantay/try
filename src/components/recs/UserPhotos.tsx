import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import { styled } from "@mui/system";
import React, { FC } from "react";

const UserPhoto = styled("img")(({ theme }) => ({
  width: "100%",
  height: "400px",
  objectFit: "cover",
}));

interface UserPhotosProps {
  photos: string[];
  alt: string;
}

const UserPhotos: FC<UserPhotosProps> = ({ photos, alt }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = photos.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <UserPhoto src={photos[activeStep]} alt={alt} />
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
};

export default UserPhotos;
