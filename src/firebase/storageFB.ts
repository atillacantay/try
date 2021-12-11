import {
  getDownloadURL as getDownloadURLFB,
  StorageReference,
  uploadBytes,
} from "firebase/storage";

/**
 * Get download url of a file
 * @param {StorageReference} ref
 */
export const getDownloadURL = async (ref: StorageReference) => {
  try {
    return await getDownloadURLFB(ref);
  } catch (error: any) {
    throw Error(error.message);
  }
};

/**
 * Upload image as bytes in Storage
 * @param {StorageReference} ref
 * @param {File} file
 */
export const uploadImage = async (ref: StorageReference, file: File) => {
  await uploadBytes(ref, file);
};
