import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik"; // Import useFormikContext
import * as Yup from "yup"; // Import Yup for validation
import {
  IsUserValid,
  sendEmailConfirmation,
  validateEmail,
} from "../../api/subscriber";
import "./Subscribe.scss";
import { ValuesType } from "./models";
import FormikTextInput from "library/Formik/FormikInput";
import { Grid } from "@mui/material";

const Subscribe = () => {
  const [step, setStep] = useState(1);
  let { agentId } = useParams();
  const [isValidUser, setIsValidUser] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [initialValues, setInitialValues] = useState<ValuesType>({
    emailAddress: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    phoneNumber: "",
    firstName: "",
  });

  useEffect(() => {
    // Check if the user is valid using the IsUserValid module
    if (agentId) {
      IsUserValid.validdateuser(agentId)
        .then((response) => {
          setIsValidUser(response);
          if (!response) {
            setShowErrorMessage(true);
          }
        })
        .catch((error) => {
          console.error("Error validating user:", error);
          setShowErrorMessage(true);
        });
    }
  }, [agentId]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name field is required."),
    lastName: Yup.string().required("Last Name field is required."),
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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="subscriber-registration-container">
      {showErrorMessage ? (
        "Problem with Agent"
      ) : (
        <>
          <div className="left-col">
            <div className="captions">
              <h1 className="left-header">
                <React.Fragment>
                  Welcome <br /> to CFS
                </React.Fragment>
              </h1>
            </div>
          </div>
          <div className="right-col">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={() => {
                console.log("Submitting");
              }}
            >
              <>
                {step === 1 ? (
                  <Grid>
                    <React.Fragment>
                      <h2>STEP 1</h2>
                      <h2>Subscriber Information</h2>
                    </React.Fragment>
                    <React.Fragment>
                      <Grid container spacing={2}>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                          <label className="form-label">Email Address</label>
                          <FormikTextInput
                            name="emailAddress"
                            value={initialValues.emailAddress}
                            variant="outlined"
                            placeholder="Enter your email address"
                          />
                          <label className="form-label">First Name</label>
                          <FormikTextInput
                            name="firstName"
                            value={initialValues.firstName}
                            variant="outlined"
                            placeholder="Enter your First name"
                          />
                          <label className="form-label">Last Name</label>
                          <FormikTextInput
                            name="lastName"
                            value={initialValues.lastName}
                            variant="outlined"
                            placeholder="Enter your Last name"
                          />
                          <label className="form-label">Phone Number</label>
                          <FormikTextInput
                            name="phoneNumber"
                            value={initialValues.phoneNumber}
                            variant="outlined"
                            placeholder="Enter your Phone Number"
                          />
                          <label className="form-label">Password</label>
                          <FormikTextInput
                            name="password"
                            value={initialValues.password}
                            variant="outlined"
                            placeholder="Enter your Password"
                          />
                          <label className="form-label">Confirm Password</label>
                          <FormikTextInput
                            name="confirmPassword"
                            value={initialValues.confirmPassword}
                            variant="outlined"
                            placeholder="Confirm Password"
                          />
                          <button
                            className="secondary-cfs-btn"
                            onClick={() => {
                              console.log("next");
                              nextStep();
                            }}
                            // disabled
                          >
                            Next
                          </button>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  </Grid>
                ) : step === 2 ? (
                  <Grid>
                    <React.Fragment>
                      <h2>STEP 2</h2>
                      <h2>Confirmation Code</h2>
                    </React.Fragment>
                    <React.Fragment>
                      <Grid container spacing={2}>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                          <label className="form-label">
                            Confirmation Code
                          </label>
                          <FormikTextInput
                            name="confirmationCode"
                            variant="outlined"
                            placeholder="Enter code sent via email"
                          />
                          <button
                            className="secondary-cfs-btn"
                            onClick={() => {
                              console.log("back");
                              prevStep();
                            }}
                            // disabled
                          >
                            Back
                          </button>
                          <button
                            className="secondary-cfs-btn"
                            onClick={() => {
                              console.log("back");
                            }}
                            // disabled
                          >
                            Submit
                          </button>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  </Grid>
                ) : (null)}
              </>
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};

export default Subscribe;
