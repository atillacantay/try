import * as yup from "yup";

export const registerValidationSchema = yup.object({
  name: yup.string().required(),
  gender: yup.string().required(),
  dateOfBirth: yup.number().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  photos: yup.array<FileList>().min(1),
});
