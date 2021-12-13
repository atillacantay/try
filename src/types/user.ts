import { User } from "firebase/auth";
import { FirebaseUserData } from "./auth";

export type CustomUser = User & FirebaseUserData;
