import { Grid } from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface AccountDetailsProps {
  email: string;
  verificationCode: string;
  isValid: boolean;
  page: number;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  handleNextStep: (stepNumber: number) => void;
}
const LoginFormWithCode: React.FC<AccountDetailsProps> = (props) => {
  const [verified, setVerified] = useState(false);

  const recaptchaOnChangeHandler = (value: any) => {
    setVerified(!!value);
  };

  return props.page === 1 ? (
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
          onClick={() => props.onSubmit()}
          disabled={!props.isValid || !verified}
        >
          Send Verification
        </button>
      </Grid>
    </Grid>
  ) : (
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
          disabled={!props.isValid || !verified}
          onClick={() => props.onSubmit()}
        >
          Login
        </button>
      </Grid>
    </Grid>
  );
};

export default LoginFormWithCode;
