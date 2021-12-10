import { db } from "firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFB,
  User,
} from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { FirebaseUserData, LoginFormData, RegisterFormData } from "types/auth";

export const auth = getAuth();

export const register = async (registerFormData: RegisterFormData) => {
  const { email, password, ...rest } = registerFormData;
  await createUserWithEmailAndPassword(
    auth,
    registerFormData.email,
    registerFormData.password
  )
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      await writeUserData(user, rest);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const login = async (loginFormData: LoginFormData) => {
  return await signInWithEmailAndPassword(
    auth,
    loginFormData.email,
    loginFormData.password
  )
    .then(async (userCredential) => {
      // Signed in
      // const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const signOut = async () => {
  await signOutFB(auth).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};

export const getUserData = async (user: User) => {
  return (await get(ref(db, "users/" + user.uid))).val() as FirebaseUserData;
};

const writeUserData = async (user: User, params: any) => {
  await set(ref(db, "users/" + user.uid), params);
};
