import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <IconButton component={Link} to="/">
        <ArrowBackIcon />
      </IconButton>
      login
    </div>
  );
};

export default Login;
