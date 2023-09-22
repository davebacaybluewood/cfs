import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name field is required."),
  lastName: Yup.string().required("Last name field is required."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Address field is required."),
  password: Yup.string()
    .required("Password field is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 characters, one Uppercase, one lowercase, one number and one special case character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null as any], "Passwords must match")
    .required("Confirm password field is required"),
  confirmationUserCode: Yup.number().required(
    "Enter verification code sent to email"
  ),
});

export default validationSchema;
