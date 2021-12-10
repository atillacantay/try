import { db, storage } from "firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFB,
  User,
} from "firebase/auth";
import { get, ref, set } from "firebase/database";
import {
  ref as storageRef,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
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
      await saveUserImages(user, registerFormData.photos);
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

const saveUserImages = (user: User, files: File[]) => {
  Promise.all(files.map((file) => saveUserImage(user, file)));
};

const saveUserImage = async (user: User, file: File) => {
  const ref = storageRef(storage, `photos/${user.uid}/${file.name}`);
  await uploadImage(ref, file);
};

const uploadImage = async (ref: StorageReference, file: File) => {
  await uploadBytes(ref, file);
};
