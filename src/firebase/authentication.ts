import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFB,
} from "firebase/auth";
import { InitialUserData, LoginFormData, RegisterFormData } from "types/auth";
import { saveUserData, saveUserPhotos } from "./user";

export const INITIAL_DATA = {
  USER: {
    DISTANCE: 80,
  },
};

export const auth = getAuth();

/**
 * Register user
 * @param {String} name
 * @param {String} gender
 * @param {String} birth_date
 * @param {String} email
 * @param {File[]} photos
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
      ...rest,
      distance: INITIAL_DATA.USER.DISTANCE,
    };
    await saveUserData(user, initialUserData);
    saveUserPhotos(user, photos);
  }
};

/**
 * Login user
 * @param {String} email
 * @param {String} password
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
