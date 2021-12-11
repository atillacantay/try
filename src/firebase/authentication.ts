import { db, storage } from "firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFB,
  User,
} from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import {
  getDownloadURL as getDownloadURLFB,
  ref as storageRef,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import { FirebaseUserData, LoginFormData, RegisterFormData } from "types/auth";

export const auth = getAuth();

/**
 * Register user
 * @param {String} name
 * @param {String} gender
 * @param {String} age
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
    await saveUserData(user, rest);
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

export const getUserData = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  return docSnap.data() as FirebaseUserData;
};

const saveUserData = async (user: User, params: any) => {
  return await setDoc(doc(db, "users", user.uid), params);
};

export const getUserPhotos = async (user: User) => {
  const userPhotosRef = doc(db, "users", user.uid, "photos");
  const docSnap = await getDoc(userPhotosRef);
  return docSnap.data() as string[];
};

const getDownloadURL = async (ref: StorageReference) => {
  return await getDownloadURLFB(ref)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          return "";
        default:
          return "";
      }
    });
};

const saveUserPhotos = (user: User, files: File[]) => {
  Promise.all(files.map((file) => saveUserPhoto(user, file)));
};

const saveUserPhoto = async (user: User, file: File) => {
  const newPhotoRef = storageRef(
    storage,
    `user_photos/${user.uid}/${file.name}`
  );
  await uploadImage(newPhotoRef, file);
  const downloadUrl = await getDownloadURL(newPhotoRef);
  const userRef = doc(db, "users", user.uid);
  setDoc(userRef, { photos: arrayUnion(downloadUrl) }, { merge: true });
};

const uploadImage = async (ref: StorageReference, file: File) => {
  await uploadBytes(ref, file);
};
