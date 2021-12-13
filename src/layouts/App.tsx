import { styled } from "@mui/system";
import Header from "components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const InnerLayout = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <InnerLayout>
        <Outlet />
      </InnerLayout>
    </React.Fragment>
  );
};

export default App;
