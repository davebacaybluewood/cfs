import { Grid } from "@mui/material";
import { paths } from "constants/routes";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
  sendEmailConfirmation,
  registerSubscriberAccount,
  IsEmailValid,
} from "../../api/subscriber";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";

interface SubscribeAccountDetailsProps {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isValid: boolean;
  confirmationUserCode: number;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}
const SubscribeAccountDetails: React.FC<SubscribeAccountDetailsProps> = (
  props
) => {
  const [verified, setVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generateConfirmationCode, setGenerateConfirmationCode] = useState(
    Math.floor(1000000 + Math.random() * 9000000)
  );

  const navigate = useNavigate();

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

  const recaptchaOnChangeHandler = (value: any) => {
    setVerified(!!value);
  };

  return (
    <>
      {currentPage === 1 ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label className="form-label">Email Address</label>
              <FormikTextInput
                name="email"
                value={props.email}
                variant="outlined"
                placeholder="Enter your email address"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <label className="form-label">First Name</label>
              <FormikTextInput
                name="firstName"
                value={props.firstName}
                variant="outlined"
                placeholder="Enter your first name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <label className="form-label">Last Name</label>
              <FormikTextInput
                name="lastName"
                value={props.lastName}
                variant="outlined"
                placeholder="Enter your last name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label className="form-label">Phone Number</label>
              <FormikTextInput
                name="phoneNumber"
                value={props.phoneNumber}
                variant="outlined"
                placeholder="Enter your phone number"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label className="form-label">Password</label>
              <FormikTextInput
                name="password"
                value={props.password}
                variant="outlined"
                type="password"
                placeholder="Enter your password"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label className="form-label">Confirm Password</label>
              <FormikTextInput
                name="confirmPassword"
                value={props.confirmPassword}
                variant="outlined"
                type="password"
                placeholder="Retype your password"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <button
                className="secondary-cfs-btn"
                onClick={() => {
                  setLoading(true);
                  const newConfirmationCode = Math.floor(
                    1000000 + Math.random() * 9000000
                  );
                  setGenerateConfirmationCode(newConfirmationCode);
                  setLoading(true);
                  IsEmailValid(props.email)
                    .then((validateEmail) => {
                      if (validateEmail) {
                        setCurrentPage(2);
                        setLoading(false);
                        handleSendEmailConfirmation(
                          props.email,
                          newConfirmationCode
                        );
                      }
                      if (!validateEmail) {
                        setLoading(false);
                        toast.error("Email is already in use");
                      }
                      if (!validateEmail) {
                        toast.error("Please complete account information");
                      }
                    })
                    .catch((error) => {
                      console.error("Error validating Email:", error);
                    });
                  setLoading(false);
                }}
                disabled={!props.isValid}
              >
                Continue with your registration
              </button>
              <div className="login-caption">
                <span>Already have an account?</span>
                <Link to={paths.login}>Log in</Link>
              </div>
            </Grid>
          </Grid>
        </>
      ) : currentPage === 2 ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label className="form-label">Verification Code</label>
              <FormikTextInput
                name="confirmationUserCode"
                value={props.confirmationUserCode}
                variant="outlined"
                placeholder="Enter your verfication code"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className="recaptcha">
                <ReCAPTCHA
                  sitekey="6LfeQtsmAAAAAAsHX2QKCI7YOe2_Y9yaSGOfaBlF"
                  onChange={recaptchaOnChangeHandler}
                />
              </div>
              <button
                className="secondary-cfs-btn"
                onClick={() => {
                  setCurrentPage(1);
                }}
              >
                Go Back
              </button>
              <button
                className="secondary-cfs-btn"
                onClick={async () => {                  
                  if (props.confirmationUserCode == generateConfirmationCode) {
                    setLoading(true);
                    try {
                      const response = await registerSubscriberAccount({
                        email: props.email,
                        password: props.password,
                        firstName: props.firstName,
                        lastName: props.lastName,
                        phoneNumber: props.phoneNumber,
                      });
                      navigate("/subscribe/success");
                      setLoading(false);
                    } catch (error) {
                      toast.error("Fatal Error: Contact Administrator");
                      console.error(
                        "Error registering subscriber account:",
                        error
                      );
                    }
                  } else {
                    toast.error("Confirmation code does not match");
                  }
                }}
                disabled={!props.isValid || !verified}
              >
                Register
              </button>
              <div className="login-caption">
                <span>Already have an account?</span>
                <Link to={paths.login}>Log in</Link>
              </div>
            </Grid>
          </Grid>
        </>
      ) : null}
      {loading ? <Spinner variant="fixed" /> : null}
    </>
  );
};

export default SubscribeAccountDetails;
