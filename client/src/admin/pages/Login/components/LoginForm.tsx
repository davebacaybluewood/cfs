import { Grid } from "@mui/material";
import { paths } from "constants/routes";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

interface AccountDetailsProps {
  email: string;
  password: string;
  isValid: boolean;
  onSubmit: (
    emailAddress: string | undefined,
    password: string | undefined,
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
const LoginForm: React.FC<AccountDetailsProps> = (props) => {
  const [verified, setVerified] = useState(false);

  const recaptchaOnChangeHandler = (value) => {
    setVerified(!!value);
  };
  return (
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
        <div className="recaptcha">
          <ReCAPTCHA
            sitekey="6LfeQtsmAAAAAAsHX2QKCI7YOe2_Y9yaSGOfaBlF"
            onChange={recaptchaOnChangeHandler}
          />
        </div>
        {/* <pre>{JSON.stringify(verified)}</pre>
        <pre>{JSON.stringify(props.isValid)}</pre> */}
        <button
          className="secondary-cfs-btn"
          onClick={() => {
            props.onSubmit(props.email, props.password, props.setFieldValue);
          }}
          disabled={!props.isValid || !verified}
        >
          Login
        </button>
        <div className="login-caption">
          <Link
            to={paths.portalRegistration}
            style={{
              borderBottom: "1px dotted #000",
            }}
          >
            Create an account
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
