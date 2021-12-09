import { analytics, db } from "firebase";
import {
  AnalyticsCallOptions,
  CustomParams,
  setUserProperties as setUserPropertiesFB,
} from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut as signOutFB,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { RegisterFormData } from "types/auth";

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
      console.log(user);
      await writeUserData(user.uid, rest);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const login = (loginFormData: any) => {
  createUserWithEmailAndPassword(
    auth,
    loginFormData.email,
    loginFormData.password
  )
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
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

export const setUserProperties = (
  properties: CustomParams,
  options?: AnalyticsCallOptions | undefined
) => {
  setUserPropertiesFB(analytics, properties, options);
};

const writeUserData = async (userId: string, params: any) => {
  await set(ref(db, "users/" + userId), params);
};
