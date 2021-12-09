import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { register, signOut } from "firebase/authentication";
import React, { createContext, FC, useContext } from "react";
import { RegisterFormData } from "types/auth";

type ISuccess = boolean | undefined;

interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  registerLoading: boolean;
  loginLoading: boolean;
  registerSuccess?: boolean;
  loginSuccess?: boolean;
  getAuthIntance: () => void;
  registerUser: (registerFormData: RegisterFormData) => void;
  loginUser: (loginFormData: any) => void;
}

const authContextDefaultValues: AuthContext = {
  isAuthenticated: false,
  user: null,
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
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  const [registerLoading, setRegisterLoading] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState<ISuccess>();
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState<ISuccess>();

  const getAuthIntance = () => getAuth();

  React.useEffect(() => {
    onAuthStateChanged(getAuthIntance(), (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, []);

  const registerUser = async (registerFormData: RegisterFormData) => {
    setRegisterLoading(true);
    try {
      await register(registerFormData);
      setRegisterSuccess(true);
      setIsAuthenticated(true);
    } catch (error) {
    } finally {
      setRegisterLoading(false);
    }
  };

  const loginUser = async (loginFormData: any) => {
    setLoginLoading(true);
    try {
      setLoginSuccess(true);
    } catch (error) {
    } finally {
      setLoginLoading(false);
    }
  };

  const signOutUser = async (loginFormData: any) => {
    try {
      await signOut();
      setIsAuthenticated(false);
    } catch (error) {
    } finally {
    }
  };

  return {
    isAuthenticated,
    user,
    registerLoading,
    registerSuccess,
    loginLoading,
    loginSuccess,
    getAuthIntance,
    registerUser,
    loginUser,
    signOutUser,
  };
};
