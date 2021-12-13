import { styled } from "@mui/system";
import BirthDateStep from "./BirthDateStep";
import GenderFilterStep from "./GenderFilterStep";
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
      <BirthDateStep />
      <GenderFilterStep />
    </PersonalDetails>
  );
};

export default PersonalDetailsStep;
