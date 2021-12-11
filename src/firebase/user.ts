import { db, storage } from "firebase";
import { User } from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref as storageRef } from "firebase/storage";
import { FirebaseUserData } from "types/auth";
import { getDetailedLocationObject } from "utils/location";
import { getDownloadURL, uploadImage } from "./storageFB";

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
export const saveUserData = async (user: User, params: any) => {
  return await setDoc(doc(db, "users", user.uid), params);
};

/**
 * Update user data in Firestore
 * @param {User} user
 * @param {any} params
 */
export const updateUserData = async (user: User, params: any) => {
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
  // await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.REACT_APP_FIREBASE_API_KEY}`
  // );
  // TODO: Remove these comments when it's time.
  const detailedLocationObject = getDetailedLocationObject();
  await updateUserData(user, { location: detailedLocationObject });
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
export const saveUserPhotos = (user: User, files: File[]) => {
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
