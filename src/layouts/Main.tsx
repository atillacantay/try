import { Container } from "@mui/material";
import { FC } from "react";

const Main: FC = ({ children }) => {

  return (
    <Container maxWidth="md">
      {children}
    </Container>
  );
}

export default Main;
