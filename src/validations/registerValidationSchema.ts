import * as yup from "yup";

export const registerValidationSchema = [
  //validation for step1
  yup.object({
    name: yup.string().required(),
    gender: yup.string().required(),
    age: yup.number().required(),
  }),
  //validation for step2
  yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
  //validation for step3
  yup.object({
    images: yup.array<FileList>().min(1),
  }),
];
