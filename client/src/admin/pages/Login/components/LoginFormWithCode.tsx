import { Grid } from "@mui/material";
import { paths } from "constants/routes";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

interface AccountDetailsProps {
  email: string;
  verificationCode: string;
  isValid: boolean;
  onSubmit: (
    emailAddress: string | undefined,
    verificationCode: string | undefined,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => Promise<void>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}
const LoginFormWithCode: React.FC<AccountDetailsProps> = (props) => {
  const [verified, setVerified] = useState(false);
  const [page, setPage] = useState(1);

  const recaptchaOnChangeHandler = (value: any) => {
    setVerified(!!value);
  };

  const handleNextStep = (whatStep: number) => {
    setPage(whatStep);
  };

  return (
    <>
      {page === 1 ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label className="form-label">Email Address</label>
              <FormikTextInput
                name="emailAddress"
                value={props.email}
                variant="outlined"
                placeholder="Enter your email address"
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
                onClick={() => handleNextStep(2)}
                disabled={!props.isValid || !verified}
              >
                Send Verification
              </button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label className="form-label">Verification Code</label>
              <FormikTextInput
                name="verificationCode"
                value={props.verificationCode}
                variant="outlined"
                placeholder="Enter your verification code"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>           
            <button
                className="secondary-cfs-btn"
                onClick={() => handleNextStep(1)}
                disabled={!props.isValid || !verified}
              >
                Go Back
              </button>
              <button
                className="secondary-cfs-btn"
                onClick={() => {
                  props.onSubmit(
                    props.email,
                    props.verificationCode,
                    props.setFieldValue
                  );
                }}
                disabled={!props.isValid || !verified}
              >
                Login
              </button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default LoginFormWithCode;
