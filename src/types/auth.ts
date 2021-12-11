export interface RegisterFormData {
  name: string;
  gender: string;
  age: string;
  email: string;
  password: string;
  photos: File[];
}

export interface FirebaseUserData {
  name: string;
  gender: string;
  age: string;
  photos: string[];
}

export interface LoginFormData {
  email: string;
  password: string;
}
