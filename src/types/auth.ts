export interface RegisterFormData {
  name: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

export interface FirebaseUserData {
  name: string;
  gender: string;
  dateOfBirth: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
