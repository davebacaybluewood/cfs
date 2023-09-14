import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Subscribe.scss";
import { ValuesType } from "./models";
import {
  IsUserValid,
  sendEmailConfirmation,
  registerSubscriberAccount,
  IsEmailValid,
} from "../../api/subscriber";
import { Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikTextInput from "library/Formik/FormikInput";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";
import { paths } from "constants/routes";

const Subscribe = () => {
  const [initialValues, setInitialValues] = useState<ValuesType>({
    emailAddress: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    phoneNumber: "",
    firstName: "",
    confirmationUserCode: 0,
  });
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialValues); // Use formValues state
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generateConfirmationCode, setGenerateConfirmationCode] = useState(
    Math.floor(1000000 + Math.random() * 9000000)
  );

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name field is required."),
    lastName: Yup.string().required("Last Name field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
    emailAddress: Yup.string().required("Email Address field is required."),
    password: Yup.string().required("Password field is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null as any], "Passwords must match")
      .required("Confirm password field is required"),
  });

  const nextStep = () => {
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSendEmailConfirmation = async (
    values: string,
    confirmationCode: number
  ) => {
    try {
      // Call sendEmailConfirmation function with email and confirmationCode
      await sendEmailConfirmation(values, `${confirmationCode}`);
    } catch (error) {
      console.error("Error sending email confirmation:", error);
    }
  };

  return (
    <>
      <Grid className="subscriber-registration-container">
        <Grid className="left-col">
          <Grid className="captions">
            <h1 className="left-header">
              <React.Fragment>
                Welcome <br /> to CFS
              </React.Fragment>
              <p>
                Start your journey <br /> with us today.
              </p>
            </h1>
          </Grid>
        </Grid>
        <Grid className="right-col">
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values) => {
              console.log("Formik" + values);
            }}
          >
            {({ values, isValid }) => (
              <>
                <Grid>
                  <React.Fragment>
                    <Typography variant="h5" sx={{ paddingTop: "32px" }}>
                      {step === 1 ? "STEP 1" : "STEP 2"}
                    </Typography>
                    <Typography variant="h5">
                      {step === 1
                        ? "Subscriber Account Information"
                        : "Subscriber Email Verification"}
                    </Typography>
                  </React.Fragment>
                  <React.Fragment>
                    <Grid container spacing={2} sx={{ paddingTop: "16px" }}>
                      {step === 1 && (
                        <>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <label className="form-label">Email Address</label>
                            <FormikTextInput
                              name="emailAddress"
                              type="email"
                              variant="outlined"
                              placeholder="Enter your email address"
                              value={values.emailAddress} // Use formValues
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  emailAddress: e.target.value,
                                });
                              }}
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="form-field">
                              <label className="form-label">First Name</label>
                              <FormikTextInput
                                name="firstName"
                                value={values.firstName}
                                variant="outlined"
                                placeholder="Enter your first name"
                                onChange={(e) => {
                                  setFormValues({
                                    ...formValues,
                                    firstName: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="form-field">
                              <label className="form-label">Last Name</label>
                              <FormikTextInput
                                name="lastName"
                                value={values.lastName}
                                variant="outlined"
                                placeholder="Enter your last name"
                                onChange={(e) => {
                                  setFormValues({
                                    ...formValues,
                                    lastName: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className="form-field">
                              <label className="form-label">Phone Number</label>
                              <FormikTextInput
                                name="phoneNumber"
                                type="number"
                                value={values.phoneNumber}
                                variant="outlined"
                                placeholder="Enter your phone number"
                                onChange={(e) => {
                                  setFormValues({
                                    ...formValues,
                                    phoneNumber: e.target.value,
                                  });
                                }}
                                style={{ width: "100%" }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="form-field">
                              <label className="form-label">Password</label>
                              <FormikTextInput
                                name="password"
                                value={null}
                                type="password"
                                variant="outlined"
                                placeholder="Enter your password"
                                onChange={(e) => {
                                  setFormValues({
                                    ...formValues,
                                    password: e.target.value,
                                  });
                                }}
                                style={{ width: "100%" }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="form-field">
                              <label className="form-label">
                                Confirm Password
                              </label>
                              <FormikTextInput
                                name="confirmPassword"
                                type="password"
                                value={null}
                                variant="outlined"
                                placeholder="Confirm your password"
                                onChange={(e) => {
                                  setFormValues({
                                    ...formValues,
                                    confirmPassword: e.target.value,
                                  });
                                }}
                                style={{ width: "100%" }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <button
                              className="secondary-cfs-btn"
                              style={{ width: "100%", height: "5rem" }}
                              onClick={() => {
                                const newConfirmationCode = Math.floor(
                                  1000000 + Math.random() * 9000000
                                );
                                setGenerateConfirmationCode(
                                  newConfirmationCode
                                );
                                setLoading(true);
                                IsEmailValid(values.emailAddress)
                                  .then((validateEmail) => {
                                    if (validateEmail && isValid) {
                                      nextStep();
                                      setLoading(false);
                                      handleSendEmailConfirmation(
                                        values.emailAddress,
                                        newConfirmationCode
                                      );
                                    }
                                    if (!validateEmail) {
                                      setLoading(false);
                                      toast.error("Email is already in use");
                                    }
                                    if (!validateEmail && !isValid) {
                                      toast.error(
                                        "Please complete account information"
                                      );
                                    }
                                  })
                                  .catch((error) => {
                                    console.error(
                                      "Error validating Email:",
                                      error
                                    );
                                  });
                              }}
                              disabled={!isValid}
                            >
                              Continue with the registration
                            </button>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="form-field">
                              <div className="login-caption">
                                <span>Already have an account?</span>
                                <Link to={paths.login}>Log in</Link>
                              </div>
                            </div>
                          </Grid>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <label className="form-label">
                              Email Verification Code
                            </label>
                            <FormikTextInput
                              name="confirmationUserCode"
                              type="number"
                              variant="outlined"
                              placeholder="Enter verification code"
                              value={formValues.confirmationUserCode}
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  confirmationUserCode: parseInt(
                                    e.target.value,
                                    10
                                  ),
                                });
                              }}
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <button
                              className="secondary-cfs-btn"
                              style={{ width: "100%", height: "5rem" }}
                              onClick={() => {
                                prevStep();
                              }}
                            >
                              Back
                            </button>
                          </Grid>
                          <Grid item xs={12}>                            
                            <button
                            className="secondary-cfs-btn"
                            style={{ width: "100%", height: "5rem" }}
                            onClick={async () => {
                              console.log("value:  " + values.confirmationUserCode);
                              console.log("conf :  " + generateConfirmationCode);
                              if (
                                values.confirmationUserCode == generateConfirmationCode
                              ) {
                                setLoading(true);
                                try {
                                  const response =
                                    await registerSubscriberAccount({
                                      email: values.emailAddress,
                                      password: values.password,
                                      firstName: values.firstName,
                                      lastName: values.lastName,
                                      phoneNumber: values.phoneNumber,
                                    });

                                  navigate("/subscribe/success");
                                  setLoading(false);
                                } catch (error) {
                                  toast.error("Fatal Error: Contact Administrator")
                                  console.error(
                                    "Error registering subscriber account:",
                                    error
                                  );
                                }
                              } else {
                                toast.error(
                                  "Confirmation code does not match"
                                );
                              }
                            }}
                          >
                            Submit
                          </button>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="form-field">
                              <div className="login-caption">
                                <span>Already have an account?</span>
                                <Link to={paths.login}>Log in</Link>
                              </div>
                            </div>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </React.Fragment>
                </Grid>
              </>
            )}
          </Formik>
        </Grid>
      </Grid>
      {loading ? <Spinner variant="fixed" /> : null}
    </>
  );
};
export default Subscribe;
