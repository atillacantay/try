import { Container } from "@mui/material";
import Header from "components/Header";
import React, { FC } from "react";

const Main: FC = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="md">{children}</Container>
    </React.Fragment>
  );
};

export default Main;
