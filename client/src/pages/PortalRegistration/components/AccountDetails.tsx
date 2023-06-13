import { Grid } from "@mui/material";
import { paths } from "constants/routes";
import FormikTextInput from "library/Formik/FormikInput";
import React from "react";
import { Link } from "react-router-dom";

interface AccountDetailsProps {
  email: string;
  password: string;
  confirmPassword: string;
  changeStage: (newStage: number) => void;
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
const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
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
            props.onSubmit(props.email, props.password, props.setFieldValue);
          }}
          disabled={props.isValid}
        >
          Continue with your registration
        </button>
        <div className="login-caption">
          <span>Already have an account?</span>
          <Link to={paths.login}>Log in</Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default AccountDetails;
