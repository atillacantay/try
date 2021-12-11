export interface RegisterFormData {
  name: string;
  gender: string;
  birth_date: Date;
  email: string;
  password: string;
  photos: File[];
}

export interface InitialUserData {
  name: string;
  gender: string;
  birth_date: Date;
  distance: number;
}

export interface FirebaseUserData {
  name: string;
  gender: string;
  birth_date: Date;
  photos: string[];
  location?: GeolocationCoordinates;
}

export interface LoginFormData {
  email: string;
  password: string;
}
