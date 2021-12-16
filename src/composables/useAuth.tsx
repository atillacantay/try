import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { login, register, signOut } from "firebase/authentication";
import { getUserData } from "firebase/user";
import React, { createContext, FC, useContext } from "react";
import { LoginFormData, RegisterFormData } from "types/auth";
import { CustomUser } from "types/user";
import { history } from "utils/history";
import SnackbarUtils from "utils/SnackbarUtilsConfigurator";

type ISuccess = boolean | undefined;

interface AuthContext {
  loadingUserData: boolean;
  isAuthenticated: boolean;
  user: CustomUser | null;
  registerLoading: boolean;
  loginLoading: boolean;
  registerSuccess?: boolean;
  loginSuccess?: boolean;
  getAuthInstance: () => void;
  setUserLocalData: (user: User) => void;
  registerUser: (registerFormData: RegisterFormData) => void;
  loginUser: (loginFormData: LoginFormData) => void;
  signOutUser: () => void;
}

const authContextDefaultValues: AuthContext = {
  loadingUserData: false,
  isAuthenticated: false,
  user: null,
  registerLoading: false,
  loginLoading: false,
  getAuthInstance: () => { },
  setUserLocalData: () => { },
  registerUser: () => { },
  loginUser: () => { },
  signOutUser: () => { },
};

const authContext = createContext<AuthContext>(authContextDefaultValues);

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  if (auth.loadingUserData) return null;
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loadingUserData, setLoadingUserData] = React.useState(true);
  const [user, setUser] = React.useState<CustomUser | null>(null);

  const [registerLoading, setRegisterLoading] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState<ISuccess>();
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState<ISuccess>();

  const getAuthInstance = () => getAuth();

  React.useEffect(() => {
    setLoadingUserData(true);
    onAuthStateChanged(getAuthInstance(), async (user) => {
      if (user) {
        await setUserLocalData(user);
        setIsAuthenticated(true);
        setLoadingUserData(false);
        history.push("/app/recs");
      } else {
        resetAuth();
        setLoadingUserData(false);
        // history.push("/");
      }
    });
  }, []);

  const setUserLocalData = async (user: User) => {
    const userExtraData = await getUserData(user);
    setUser({ ...user, ...userExtraData });
  };

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
    loadingUserData,
    isAuthenticated,
    user,
    registerLoading,
    registerSuccess,
    loginLoading,
    loginSuccess,
    getAuthInstance,
    setUserLocalData,
    registerUser,
    loginUser,
    signOutUser,
  };
};
