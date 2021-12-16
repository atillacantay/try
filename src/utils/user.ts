import { CONSTANT_INITIAL_USER_DATA } from "constants/user";
import { User } from "firebase/auth";
import { InitialUserDataOnRegistration, RegisterFormData } from "types/auth";

export const getInitialUserData = (user: User, registerFormData: RegisterFormData): InitialUserDataOnRegistration => {
  const { email, name, gender, birth_date, genderFilter } = registerFormData;
  return {
    uid: user.uid,
    email,
    name,
    gender,
    birth_date,
    genderFilter,
    ...CONSTANT_INITIAL_USER_DATA,
  }
}