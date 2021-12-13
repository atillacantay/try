import { INITIAL_USER_DATA } from "constants/user";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFB,
} from "firebase/auth";
import { InitialUserData, LoginFormData, RegisterFormData } from "types/auth";
import { saveUserData, saveUserPhotos } from "./user";

export const auth = getAuth();

/**
 * Register user
 * @param {RegisterFormData} registerFormData
 */
export const register = async (registerFormData: RegisterFormData) => {
  const { email, password, photos, ...rest } = registerFormData;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  if (user) {
    const initialUserData: InitialUserData = {
      uid: user.uid,
      ...rest,
      ...INITIAL_USER_DATA,
    };
    await saveUserData(user, initialUserData);
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
