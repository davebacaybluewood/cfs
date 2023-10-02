import { Formik } from "formik";
import React, { useState } from "react";
import {
  validationForgotPassword,
  validationWithCodeSchema,
} from "../validationSchema";
import Spinner from "library/Spinner/Spinner";
import { MAIN_IMAGES } from "constants/constants";
import { Alert, Grid } from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import agent from "admin/api/agent";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { paths } from "constants/routes";

const ForgotPasswordForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const urlLocation = useLocation();
  const navigate = useNavigate();
  const initialValues = {
    emailAddress: "",
  };
  const initialValuesWithPassword = {
    password: "",
    confirmPassword: "",
  };

  const searchUrlForParameters = new URLSearchParams(urlLocation.search);
  const passwordId = searchUrlForParameters.get("passwordId");

  if (passwordId) {
    return (
      <Formik
        initialValues={initialValuesWithPassword}
        enableReinitialize
        onSubmit={async (data) => {
          setLoading(true);
          const res = await agent.Profile.changePassword(
            passwordId,
            data.password,
            data.confirmPassword
          );

          if (res) {
            setLoading(false);
            toast.info(`Change Password Success`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate(paths.login);
          } else {
            setLoading(false);
            setError(true);
          }
        }}
        validationSchema={validationForgotPassword}
      >
        {({ values, setFieldValue, errors, handleSubmit }) => {
          return (
            <div className="portal-form">
              {loading ? <Spinner variant="fixed" /> : null}
              <div className="image-holder">
                <img src={MAIN_IMAGES.MAIN_LOGO} alt={MAIN_IMAGES.MAIN_LOGO} />
              </div>
              <div className="form-header">
                <h2 style={{ fontFamily: "Montserrat" }}>Forgot Password</h2>
                <h2
                  style={{
                    fontWeight: "300",
                    fontFamily: "Montserrat",
                    fontSize: 13,
                  }}
                >
                  Enter your new password
                </h2>

                {error ? (
                  <Alert
                    variant="filled"
                    severity="error"
                    className="error-alert"
                  >
                    Invalid
                  </Alert>
                ) : null}

                <Grid container spacing={2} style={{ marginTop: 10 }}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <label className="form-label">Password</label>
                    <FormikTextInput
                      name="password"
                      type="password"
                      value={values.password}
                      variant="outlined"
                      placeholder="Enter your new password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <label className="form-label">Confirm Password</label>
                    <FormikTextInput
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      variant="outlined"
                      placeholder="Enter your new password again"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <button
                      className="secondary-cfs-btn"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Login
                    </button>
                  </Grid>
                </Grid>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (data) => {
        setLoading(true);
        const res = await agent.Profile.forgotPassword(data.emailAddress);

        if (res) {
          setLoading(false);
        }
      }}
      validationSchema={validationWithCodeSchema}
    >
      {({ values, setFieldValue, errors, handleSubmit }) => {
        return (
          <div className="portal-form">
            {loading ? <Spinner variant="fixed" /> : null}
            <div className="image-holder">
              <img src={MAIN_IMAGES.MAIN_LOGO} alt={MAIN_IMAGES.MAIN_LOGO} />
            </div>
            <div className="form-header">
              <h2 style={{ fontFamily: "Montserrat" }}>Forgot Password</h2>
              <h2
                style={{
                  fontWeight: "300",
                  fontFamily: "Montserrat",
                  fontSize: 13,
                }}
              >
                Enter your email address
              </h2>

              {error ? (
                <Alert
                  variant="filled"
                  severity="error"
                  className="error-alert"
                >
                  Invalid Email & Password
                </Alert>
              ) : null}

              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <label className="form-label">Email Address</label>
                  <FormikTextInput
                    name="emailAddress"
                    value={values.emailAddress}
                    variant="outlined"
                    placeholder="Enter your email address"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <button
                    className="secondary-cfs-btn"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Login
                  </button>
                </Grid>
              </Grid>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ForgotPasswordForm;
