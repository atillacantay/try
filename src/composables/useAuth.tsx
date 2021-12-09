import { getAuth } from "firebase/auth";
import { register } from "firebase/authentication";
import React, { createContext, FC, useContext } from "react";
import { RegisterFormData } from "types/auth";

type ISuccess = boolean | undefined;

interface AuthContext {
  registerLoading: boolean;
  loginLoading: boolean;
  registerSuccess?: boolean;
  loginSuccess?: boolean;
  getAuthIntance: () => void;
  registerUser: (registerFormData: RegisterFormData) => void;
  loginUser: (loginFormData: any) => void;
}

const authContextDefaultValues: AuthContext = {
  registerLoading: false,
  loginLoading: false,
  getAuthIntance: () => {},
  registerUser: () => {},
  loginUser: () => {},
};

const authContext = createContext<AuthContext>(authContextDefaultValues);

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [registerLoading, setRegisterLoading] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState<ISuccess>();

  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState<ISuccess>();

  const getAuthIntance = () => getAuth();

  const registerUser = async (registerFormData: RegisterFormData) => {
    setRegisterLoading(true);
    try {
      await register(registerFormData);
      setRegisterSuccess(true);
    } catch (error) {
    } finally {
      setRegisterLoading(false);
    }
  };

  const loginUser = async (loginFormData: any) => {
    setLoginLoading(true);
    try {
    } catch (error) {
      setLoginSuccess(true);
    } finally {
      setLoginLoading(false);
    }
  };

  return {
    registerLoading,
    registerSuccess,
    loginLoading,
    loginSuccess,
    getAuthIntance,
    registerUser,
    loginUser,
  };
};
