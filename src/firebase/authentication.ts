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
 * @param {File[]} images
 */
export const register = async (registerFormData: RegisterFormData) => {
  const { email, password, images, ...rest } = registerFormData;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      await saveUserData(user, rest);
      saveUserImages(user, images);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

/**
 * Login user
 * @param {String} email
 * @param {String} password
 */
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

/**
 * Sign out user
 */
export const signOut = async () => {
  await signOutFB(auth).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};

export const getUserData = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  return docSnap.data() as FirebaseUserData;
};

const saveUserData = async (user: User, params: any) => {
  return await setDoc(doc(db, "users", user.uid), params);
};

export const getUserImages = async (user: User) => {
  const userImagesRef = doc(db, "users", user.uid, "images");
  const docSnap = await getDoc(userImagesRef);
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

const saveUserImages = (user: User, files: File[]) => {
  Promise.all(files.map((file) => saveUserImage(user, file)));
};

const saveUserImage = async (user: User, file: File) => {
  const newImageRef = storageRef(
    storage,
    `user_images/${user.uid}/${file.name}`
  );
  await uploadImage(newImageRef, file);
  const downloadUrl = await getDownloadURL(newImageRef);
  const userRef = doc(db, "users", user.uid);
  setDoc(userRef, { images: arrayUnion(downloadUrl) }, { merge: true });
};

const uploadImage = async (ref: StorageReference, file: File) => {
  await uploadBytes(ref, file);
};
