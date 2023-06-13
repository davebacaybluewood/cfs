import * as Yup from "yup";

const profileValidationSchema = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name field is required."),
    lastName: Yup.string().required("Last name field is required."),
    bio: Yup.string().required("Bio field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
    state: Yup.string().required("State field is required."),
    licenseNumber: Yup.string().required("License number field is required."),
  });

  return validationSchema;
};

export default profileValidationSchema;
