import { styled } from "@mui/system";
import React from "react";
import AgeStep from "./AgeStep";
import GenderStep from "./GenderStep";
import NameStep from "./NameStep";

const PersonalDetails = styled("div")(({ theme }) => ({
  "& div": {
    marginBottom: theme.spacing(1),
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
