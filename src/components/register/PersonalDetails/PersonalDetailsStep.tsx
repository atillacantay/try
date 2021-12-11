import { styled } from "@mui/system";
import React from "react";
import AgeStep from "./AgeStep";
import GenderStep from "./GenderStep";
import NameStep from "./NameStep";

const PersonalDetails = styled("div")(({ theme }) => ({
  ".MuiFormControl-root": {
    marginBottom: theme.spacing(2),
  },
}));

const PersonalDetailsStep = () => {
  return (
    <PersonalDetails>
      <NameStep />
      <GenderStep />
      <AgeStep />
    </PersonalDetails>
  );
};

export default PersonalDetailsStep;
