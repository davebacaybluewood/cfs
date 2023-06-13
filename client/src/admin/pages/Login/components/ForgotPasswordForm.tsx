import { Alert } from "@mui/material";
import Spinner from "admin/components/Spinner/Spinner";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { Formik } from "formik";
import Button from "library/Button/Button";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import * as Yup from "yup";

const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
          setLoading(true);
          axios
            .post(ENDPOINTS.CHECK_EMAIL, {
              emailAddress,
            })
            .then((data) => {
              console.log(data);
              setLoading(false);
              setSuccess(true);
            })
            .catch((error) => {
              setError(true);
              setLoading(false);
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
              <ComponentValidator showNull={!error}>
                <Alert variant="filled" severity="error" className="form-alert">
                  Invalid Email & Password
                </Alert>
              </ComponentValidator>
              <ComponentValidator showNull={!success}>
                <Alert
                  variant="filled"
                  severity="success"
                  className="form-alert success"
                >
                  Mail has been sent to your email address
                </Alert>
              </ComponentValidator>
              <FormikTextInput
                label="Email Address"
                variant="filled"
                fullWidth
                className="filled-input"
                name="emailAddress"
                isTextArea={false}
                type="text"
              />
              {loading ? (
                <Spinner />
              ) : (
                <ComponentValidator showNull={success}>
                  <Button variant="primary" onClick={() => handleSubmit()}>
                    Submit
                  </Button>
                </ComponentValidator>
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
