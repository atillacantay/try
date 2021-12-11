import { db, storage } from "firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFB,
  User,
} from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL as getDownloadURLFB,
  ref as storageRef,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import { FirebaseUserData, LoginFormData, RegisterFormData } from "types/auth";
import { convertToObject } from "utils/common";

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

/**
 * Get user data from Firestore
 * @param {User} user
 */
export const getUserData = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  return docSnap.data() as FirebaseUserData;
};

/**
 * Save user data in Firestore
 * @param {User} user
 * @param {any} params
 */
const saveUserData = async (user: User, params: any) => {
  return await setDoc(doc(db, "users", user.uid), params);
};

/**
 * Update user data in Firestore
 * @param {User} user
 * @param {any} params
 */
const updateUserData = async (user: User, params: any) => {
  return await updateDoc(doc(db, "users", user.uid), params);
};

/**
 * Save user location in Firestore
 * @param {User} user
 * @param {GeolocationCoordinates} location
 */
export const saveUserLocation = async (
  user: User,
  location: GeolocationCoordinates
) => {
  await updateUserData(user, { location: convertToObject(location) });
};

/**
 * Get user photos in Firestore
 * @param {User} user
 */
export const getUserPhotos = async (user: User) => {
  const userPhotosRef = doc(db, "users", user.uid, "photos");
  const docSnap = await getDoc(userPhotosRef);
  return docSnap.data() as string[];
};

/**
 * Save multiple user photos in Storage
 * @param {User} user
 * @param {File[]} files
 */
const saveUserPhotos = (user: User, files: File[]) => {
  Promise.all(files.map((file) => saveUserPhoto(user, file)));
};

/**
 * Save single user photo in Storage
 * @param {User} user
 * @param {File} file
 */
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

/**
 * Get download url of a file
 * @param {StorageReference} ref
 */
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

/**
 * Upload image as bytes in Storage
 * @param {StorageReference} ref
 * @param {File} file
 */
const uploadImage = async (ref: StorageReference, file: File) => {
  await uploadBytes(ref, file);
};
