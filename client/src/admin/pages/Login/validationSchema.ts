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

const validationForgotPassword = Yup.object({
  password: Yup.string()
    .required("Password field is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 characters, one Uppercase, one lowercase, one number and one special case character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null as any], "Passwords must match")
    .required("Confirm password field is required"),
});

export {
  validationWithValuesSchema,
  validationWithCodeSchema,
  validationForgotPassword,
};
