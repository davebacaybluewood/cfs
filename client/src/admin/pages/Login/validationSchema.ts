import * as Yup from "yup";

const validationWithValuesSchema = Yup.object({
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email address field is required."),
  password: Yup.string().required("Password field is required."),
});

const validationWithCodeSchema = Yup.object({
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email address field is required."),
});

export { validationWithValuesSchema, validationWithCodeSchema };
