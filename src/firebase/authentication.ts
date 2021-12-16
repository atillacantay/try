import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFB
} from "firebase/auth";
import { LoginFormData, RegisterFormData } from "types/auth";
import { getInitialUserData } from "utils/user";
import { saveUserData, saveUserPhotos } from "./user";

export const auth = getAuth();

/**
 * Register user
 * @param {RegisterFormData} registerFormData
 */
export const register = async (registerFormData: RegisterFormData) => {
  const { email, password, photos } = registerFormData;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  if (user) {
    const initialUserDataOnRegistration = getInitialUserData(user, registerFormData);
    await saveUserData(user, initialUserDataOnRegistration);
    saveUserPhotos(user, photos);
  }
};

/**
 * Login user
 * @param {LoginFormData} loginFormData
 */
export const login = async (loginFormData: LoginFormData) => {
  await signInWithEmailAndPassword(
    auth,
    loginFormData.email,
    loginFormData.password
  );
};

/**
 * Sign out user
 */
export const signOut = async () => {
  await signOutFB(auth);
};
