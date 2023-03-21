import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { Formik } from "formik";
import Button from "library/Button/Button";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import * as Yup from "yup";

const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState(false);
  const initialValues = {
    emailAddress: "",
  };

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address field is required."),
  });

  return (
    <div className="reset-form">
      <Formik
        {...{ validationSchema, initialValues }}
        onSubmit={async ({ emailAddress }) => {
          axios
            .post(ENDPOINTS.CHECK_EMAIL, {
              emailAddress,
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              setError(true);
            });
        }}
      >
        {({ values, handleSubmit }) => {
          return (
            <div className="email-form">
              <h2>Reset Password</h2>
              <p>
                Enter the email associated with your account and we'll send an
                email with instructions to reset your password.
              </p>
              <FormikTextInput
                label="Email Address"
                variant="filled"
                fullWidth
                className="filled-input"
                name="emailAddress"
                isTextArea={false}
                type="text"
              />
              <pre>{JSON.stringify(error)}</pre>
              <Button variation="dark" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
