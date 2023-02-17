import * as Yup from "yup";

const agentRegisterValidationSchema = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Fullname field is required."),
    position: Yup.string().required("Position field is required."),
    bio: Yup.string().required("Bio field is required."),
    avatar: Yup.string().required("avatar field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
    languages: Yup.array()
      .min(1, "At least one language.")
      .required("At least one language."),
    emailAddress: Yup.string().required("Email Address field is required."),
    address: Yup.string().required("Address field is required."),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Your password is too short."),
    confirmPassword: Yup.string()
      .required("Confirm Password field is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return validationSchema;
};

export default agentRegisterValidationSchema;
