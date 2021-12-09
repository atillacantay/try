import * as yup from "yup";

export const registerValidationSchema = yup.object({
  name: yup.string().required(),
  dateOfBirth: yup.date().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
