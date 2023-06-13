import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name field is required."),
  lastName: Yup.string().required("Last name field is required."),
  state: Yup.string().required("State field is required."),
  position: Yup.array()
    .min(1, "Position field is required.")
    .required("Position field is required."),
  roles: Yup.array()
    .min(1, "Position field is required.")
    .required("Position field is required."),
  bio: Yup.string().required("Bio field is required."),
  phoneNumber: Yup.string().required("Phone Number field is required."),
  emailAddress: Yup.string().required("Email Address field is required."),
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

export default validationSchema;
