export interface RegisterFormData {
  name: string;
  gender: string;
  age: string;
  email: string;
  password: string;
  images: File[];
}

export interface FirebaseUserData {
  name: string;
  gender: string;
  age: string;
  images: string[];
}

export interface LoginFormData {
  email: string;
  password: string;
}
