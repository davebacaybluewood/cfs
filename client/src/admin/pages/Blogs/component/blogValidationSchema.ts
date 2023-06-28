import * as Yup from "yup";

const blogValidationSchema = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title Field is Required."),
    // author: Yup.string().required("Author Field is Required."),
    content: Yup.string().required("Content Field is Required."),
  });

  return validationSchema;
};

export default blogValidationSchema;
