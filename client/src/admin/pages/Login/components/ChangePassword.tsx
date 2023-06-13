import { Alert, Grid } from "@mui/material";
import Spinner from "admin/components/Spinner/Spinner";
import adminPathsNew from "admin/constants/routes";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { Formik } from "formik";
import url_params from "helpers/url_params";
import Button from "library/Button/Button";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ChangePassword: React.FC = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const passwordId = url_params.passwordId;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
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

  return (
    <div className="reset-form">
      <Formik
        {...{ validationSchema, initialValues }}
        onSubmit={async ({ confirmPassword, password }) => {
          setLoading(true);
          axios
            .post(ENDPOINTS.CHANGE_PASSWORD, {
              password,
              confirmPassword,
              passwordId,
            })
            .then((data) => {
              navigate(adminPathsNew.login);
              setLoading(false);
              toast.info(`Update Success`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
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
              <h2>Change Password</h2>
              <p>
                Change the password that you desired and both fields must be a
                similar.
              </p>
              <ComponentValidator showNull={!error}>
                <Alert variant="filled" severity="error" className="form-alert">
                  Error Occured
                </Alert>
              </ComponentValidator>
              <Grid container spacing={2} marginBottom={2}>
                <Grid item sm={12} md={12} lg={12}>
                  <FormikTextInput
                    label="Password"
                    variant="filled"
                    fullWidth
                    className="filled-input"
                    name="password"
                    isTextArea={false}
                    type="password"
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <FormikTextInput
                    label="Confirm Password"
                    variant="filled"
                    fullWidth
                    className="filled-input"
                    name="confirmPassword"
                    isTextArea={false}
                    type="password"
                  />
                </Grid>
              </Grid>
              {loading ? (
                <Spinner />
              ) : (
                <Button variant="primary" onClick={() => handleSubmit()}>
                  Submit
                </Button>
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default ChangePassword;
