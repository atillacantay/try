import { useAuth } from "composables/useAuth";
import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  authenticationPath?: string;
}

const RequireAuth: FC<RequireAuthProps> = ({
  children,
  authenticationPath = "/login",
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={authenticationPath} state={{ from: location }} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default RequireAuth;
