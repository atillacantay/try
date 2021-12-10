export interface RegisterFormData {
  name: string;
  gender: string;
  age: number;
  email: string;
  password: string;
  images: File[];
}

export interface FirebaseUserData {
  name: string;
  gender: string;
  age: number;
  images: string[];
}

export interface LoginFormData {
  email: string;
  password: string;
}
