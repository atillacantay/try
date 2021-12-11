import { styled } from "@mui/system";
import React from "react";
import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";

const AccountDetails = styled("div")(({ theme }) => ({
  "& div": {
    marginBottom: theme.spacing(1),
  },
}));

const AccountDetailsStep = () => {
  return (
    <AccountDetails>
      <EmailStep />
      <PasswordStep />
    </AccountDetails>
  );
};

export default AccountDetailsStep;
