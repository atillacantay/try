import { Container } from "@mui/material";
import Header from "components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default Main;
