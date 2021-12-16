import { Location } from "./location";

export interface RegisterFormData {
  name: string;
  gender: string;
  birth_date: Date;
  email: string;
  genderFilter: string;
  password: string;
  photos: File[];
}

export interface InitialUserDataOnRegistration {
  uid: string;
  email: string;
  name: string;
  gender: string;
  birth_date: Date;
  genderFilter: string;
  distance: number;
}

export interface FirebaseUserData {
  uid: string;
  name: string;
  gender: string;
  birth_date: Date;
  genderFilter: string;
  photos: string[];
  location?: Location;
  distance: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}
