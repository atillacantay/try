import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getUserData, login, register, signOut } from "firebase/authentication";
import React, { createContext, FC, useContext } from "react";
import { FirebaseUserData, LoginFormData, RegisterFormData } from "types/auth";
import { history } from "utils/history";
import SnackbarUtils from "utils/SnackbarUtilsConfigurator";

type ISuccess = boolean | undefined;

interface AuthContext {
  isAuthenticated: boolean;
  user: (User & FirebaseUserData) | null;
  registerLoading: boolean;
  loginLoading: boolean;
  registerSuccess?: boolean;
  loginSuccess?: boolean;
  getAuthInstance: () => void;
  registerUser: (registerFormData: RegisterFormData) => void;
  loginUser: (loginFormData: LoginFormData) => void;
  signOutUser: () => void;
}

const authContextDefaultValues: AuthContext = {
  isAuthenticated: false,
  user: null,
  registerLoading: false,
  loginLoading: false,
  getAuthInstance: () => {},
  registerUser: () => {},
  loginUser: () => {},
  signOutUser: () => {},
};

const authContext = createContext<AuthContext>(authContextDefaultValues);

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  if (auth.loadingUser) return null;
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loadingUser, setLoadingUser] = React.useState(false);
  const [user, setUser] = React.useState<(User & FirebaseUserData) | null>(
    null
  );

  const [registerLoading, setRegisterLoading] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState<ISuccess>();
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState<ISuccess>();

  const getAuthInstance = () => getAuth();

  React.useEffect(() => {
    setLoadingUser(true);
    onAuthStateChanged(getAuthInstance(), async (user) => {
      if (user) {
        const userExtraData = await getUserData(user);
        setUser({ ...user, ...userExtraData });
        setIsAuthenticated(true);
        setLoadingUser(false);
        history.push("/app/recs");
      } else {
        resetAuth();
        setLoadingUser(false);
        history.push("/");
      }
    });
  }, []);

  const registerUser = async (registerFormData: RegisterFormData) => {
    setRegisterLoading(true);
    try {
      await register(registerFormData);
      setRegisterSuccess(true);
    } catch (error: any) {
      SnackbarUtils.error(error.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const loginUser = async (loginFormData: LoginFormData) => {
    setLoginLoading(true);
    try {
      await login(loginFormData);
      setLoginSuccess(true);
    } catch (error: any) {
      SnackbarUtils.error(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut();
    } catch (error: any) {
      SnackbarUtils.error(error.message);
    } finally {
    }
  };

  const resetAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    loadingUser,
    isAuthenticated,
    user,
    registerLoading,
    registerSuccess,
    loginLoading,
    loginSuccess,
    getAuthInstance,
    registerUser,
    loginUser,
    signOutUser,
  };
};
