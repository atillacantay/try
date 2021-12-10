import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getUserData, login, register, signOut } from "firebase/authentication";
import React, { createContext, FC, useContext } from "react";
import { FirebaseUserData, LoginFormData, RegisterFormData } from "types/auth";
import { history } from "utils/history";

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
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<(User & FirebaseUserData) | null>(
    null
  );

  const [registerLoading, setRegisterLoading] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState<ISuccess>();
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState<ISuccess>();

  const getAuthInstance = () => getAuth();

  React.useEffect(() => {
    onAuthStateChanged(getAuthInstance(), async (user) => {
      if (user) {
        const userExtraData = await getUserData(user);
        setUser({ ...user, ...userExtraData });
        setIsAuthenticated(true);
      } else {
        resetAuth();
      }
    });
  }, []);

  const registerUser = async (registerFormData: RegisterFormData) => {
    setRegisterLoading(true);
    try {
      await register(registerFormData);
      setRegisterSuccess(true);
      history.push("/");
    } catch (error) {
    } finally {
      setRegisterLoading(false);
    }
  };

  const loginUser = async (loginFormData: LoginFormData) => {
    setLoginLoading(true);
    try {
      await login(loginFormData);
      setLoginSuccess(true);
      history.push("/");
    } catch (error) {
    } finally {
      setLoginLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut();
      resetAuth();
    } catch (error) {
    } finally {
    }
  };

  const resetAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
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
