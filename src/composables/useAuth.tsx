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
  setUserLocalData: (user: User) => Promise<void>;
  registerUser: (registerFormData: RegisterFormData) => Promise<void>;
  loginUser: (loginFormData: LoginFormData) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const authContextDefaultValues: AuthContext = {
  loadingUserData: false,
  isAuthenticated: false,
  user: null,
  registerLoading: false,
  loginLoading: false,
  getAuthInstance: () => { },
  setUserLocalData: () => Promise.resolve(),
  registerUser: () => Promise.resolve(),
  loginUser: () => Promise.resolve(),
  signOutUser: () => Promise.resolve(),
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

  const getAuthInstance = React.useCallback(() => getAuth(), []);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuthInstance(), async (user) => {
      setLoadingUserData(true);
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
    return () => {
      unsubscribe();
    }
  }, [getAuthInstance]);

  const setUserLocalData = async (user: User) => {
    const customUserData = await getUserData(user);
    setUser({ ...user, ...customUserData });
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
      history.push('/');
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
