import { Grid } from "@mui/material";
import { paths } from "constants/routes";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import SuccessPage from "pages/PortalRegistration/components/SuccessPage";
import { SUBSCRIBER_INFO } from "pages/PortalRegistration/constants/successpg";
import agent from "admin/api/agent";

interface SubscribeAccountDetailsProps {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isValid: boolean;
  confirmationUserCode: string;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isSubRegLandingPage?: boolean;
}
const SubscribeAccountDetails: React.FC<SubscribeAccountDetailsProps> = (
  props
) => {
  const [verified, setVerified] = useState(false);
  const search = useLocation().search;
  const recruiterUserGuid = new URLSearchParams(search).get("userGuid");

  const recaptchaOnChangeHandler = (value: any) => {
    setVerified(!!value);
  };

  const [agentInfo, setAgentInfo] = useState<any>({});

  useEffect(() => {
    const getAgentInfo = async () => {
      const res = await agent.Agents.agentInformation(recruiterUserGuid ?? "");

      setAgentInfo(res);
    };

    if (recruiterUserGuid) getAgentInfo();
  }, [recruiterUserGuid]);

  return (
    <React.Fragment>
      {props.currentPage === 1 ? (
        <Grid
          container
          spacing={2}
          maxWidth={props.isSubRegLandingPage ? 500 : 1000}
          padding={props.isSubRegLandingPage ? 3 : 0}
          className={
            props.isSubRegLandingPage ? "sub-reg-landing-page-form" : ""
          }
        >
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
              onClick={() => props.onSubmit()}
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
      ) : props.currentPage === 2 ? (
        <Grid
          container
          spacing={2}
          maxWidth={props.isSubRegLandingPage ? 500 : 1000}
          padding={props.isSubRegLandingPage ? 3 : 0}
          className={
            props.isSubRegLandingPage ? "sub-reg-landing-page-form" : ""
          }
        >
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
              onClick={() => props.onSubmit()}
              disabled={!props.isValid || !verified}
            >
              Register
            </button>
            <button
              onClick={() => {
                props.setCurrentPage(1);
              }}
            >
              Go Back
            </button>
            <div className="login-caption">
              <span>Already have an account?</span>
              <Link to={paths.login}>Log in</Link>
            </div>
          </Grid>
        </Grid>
      ) : props.currentPage === 3 ? (
        // <SuccessPage isSubRegLandingPage={props.isSubRegLandingPage} />
        <SuccessPage
          agentInfo={agentInfo}
          bannerImg={SUBSCRIBER_INFO.bannerImg}
          mainMsg={SUBSCRIBER_INFO.mainMsg}
        />
      ) : null}
    </React.Fragment>
  );
};

export default SubscribeAccountDetails;
