import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import adminPathsNew from "admin/constants/routes";
import { Alert } from "@mui/material";
import { MAIN_IMAGES } from "constants/constants";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import { login } from "redux/actions/userActions";
import { useDispatch } from "react-redux";
import LoginFormWithCode from "./components/LoginFormWithCode";
import { paths } from "constants/routes";
import agent from "admin/api/agent";
import {
  validationWithCodeSchema,
  validationWithValuesSchema,
} from "./validationSchema";
import PageCaptions from "./PageCaptions";
import "pages/PortalRegistration/PortalRegistration.scss";
import "./Login.scss";
import { USER_LOGIN_ACTION_TYPES } from "constants/redux-constants";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

type LoginWithValues = {
  emailAddress: string;
  password: string;
};

type LoginWithCode = {
  emailAddress: string;
  verificationCode: string;
};

const PortalRegistration: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState({
    isInvalid: false,
    text: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const urlLocation = useLocation();
  const { error, userInfo, loading: userLoading } = userLogin;

  const searchUrlForParameters = new URLSearchParams(urlLocation.search);
  const isVerificationParamter =
    searchUrlForParameters.get("verification_code");
  const forgotPassword = searchUrlForParameters.get("forgot_password");
  const isVerification = isVerificationParamter === "true";

  const initialWithValues: LoginWithValues = {
    emailAddress: "",
    password: "",
  };

  const initialWithCode: LoginWithCode = {
    emailAddress: "",
    verificationCode: "",
  };

  useEffect(() => {
    if (userInfo) {
      navigate(adminPathsNew.dashboard);
    }
  }, [navigate, userInfo]);

  /** Login with code variables */
  const [page, setPage] = useState(1);
  const [agentCode, setAgentCode] = useState("");

  const handleNextStep = (stepNumber: number) => {
    setPage(stepNumber);
  };

  return (
    <div className="portal-registration-container">
      <div className="left-col">
        <div className="captions">
          <PageCaptions />
        </div>
      </div>
      <div className="right-col-login">
        <div className="login-container" style={{ width: "100%" }}>
          {isVerification ? (
            <>
              <Formik
                initialValues={initialWithCode}
                enableReinitialize
                onSubmit={async (values: LoginWithCode) => {
                  if (page === 1) {
                    setLoading(true);
                    const res = await agent.Login.loginUsingEmail(
                      values.emailAddress
                    );

                    if (!res) {
                      setLoading(false);
                      setInvalid({
                        isInvalid: true,
                        text: "Invalid Email Address",
                      });
                    } else {
                      setInvalid({
                        isInvalid: false,
                        text: "",
                      });
                      handleNextStep(2);
                      setLoading(false);
                      setAgentCode(res.agent.agentCode);
                    }
                  } else if (page === 2) {
                    setLoading(true);
                    const res = await agent.Login.loginUsingCode(
                      values.emailAddress,
                      agentCode,
                      values.verificationCode
                    );

                    if (!res) {
                      setLoading(false);
                      setInvalid({
                        isInvalid: true,
                        text: "Invalid Verification Code",
                      });
                    } else {
                      setInvalid({
                        isInvalid: false,
                        text: "",
                      });
                      setLoading(false);

                      const storageData = res.user;
                      localStorage.setItem(
                        "userInfo",
                        JSON.stringify(storageData)
                      );
                      dispatch({
                        type: USER_LOGIN_ACTION_TYPES.USER_LOGIN_SUCCESS,
                        payload: storageData,
                      });
                    }
                  }
                }}
                validationSchema={validationWithCodeSchema}
              >
                {({ values, setFieldValue, errors, handleSubmit }) => {
                  const accountDetailsWithCodeValidity = errors.emailAddress
                    ? false
                    : true;

                  return (
                    <div className="portal-form">
                      {loading ? <Spinner variant="fixed" /> : null}
                      <div className="image-holder">
                        <img
                          src={MAIN_IMAGES.MAIN_LOGO}
                          alt={MAIN_IMAGES.MAIN_LOGO}
                        />
                      </div>
                      <div className="form-header">
                        <h2 style={{ fontFamily: "Montserrat" }}>Login</h2>
                        <h2
                          style={{
                            fontWeight: "300",
                            fontFamily: "Montserrat",
                          }}
                        >
                          Sigin to continue
                        </h2>

                        {invalid.isInvalid ? (
                          <Alert
                            variant="filled"
                            severity="error"
                            className="error-alert"
                          >
                            {invalid.text}
                          </Alert>
                        ) : null}
                      </div>
                      <LoginFormWithCode
                        email={values.emailAddress}
                        verificationCode={values.verificationCode}
                        isValid={accountDetailsWithCodeValidity}
                        onSubmit={async () => handleSubmit()}
                        setFieldValue={setFieldValue}
                        page={page}
                        handleNextStep={handleNextStep}
                      />
                    </div>
                  );
                }}
              </Formik>
              <div className="login-caption">
                <span>Login using password</span>
                <Link to={paths.login}>Log in</Link>
              </div>
            </>
          ) : forgotPassword ? (
            <ForgotPasswordForm />
          ) : (
            <>
              <Formik
                initialValues={initialWithValues}
                enableReinitialize
                onSubmit={async (values: LoginWithValues) => {
                  try {
                    setLoading(true);
                    dispatch(
                      login(values.emailAddress, values.password) as any
                    );
                    setLoading(false);
                  } catch (error) {
                    setLoading(false);
                  }
                }}
                validationSchema={validationWithValuesSchema}
              >
                {({ values, setFieldValue, errors, handleSubmit }) => {
                  const accountDetailsValidity =
                    errors.password || errors.emailAddress ? false : true;

                  return (
                    <div className="portal-form">
                      {loading ? <Spinner variant="fixed" /> : null}
                      <div className="image-holder">
                        <img
                          src={MAIN_IMAGES.MAIN_LOGO}
                          alt={MAIN_IMAGES.MAIN_LOGO}
                        />
                      </div>
                      <div className="form-header">
                        <h2 style={{ fontFamily: "Montserrat" }}>Login</h2>
                        <h2
                          style={{
                            fontWeight: "300",
                            fontFamily: "Montserrat",
                          }}
                        >
                          Sigin to continue
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
                      </div>
                      <LoginForm
                        email={values.emailAddress}
                        password={values.password}
                        isValid={accountDetailsValidity}
                        onSubmit={async () => handleSubmit()}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  );
                }}
              </Formik>
              <div className="login-caption inline-links">
                <Link
                  to="https://agent.comfortfinancialsolutions.com/Signup/Wizard/0"
                  target="_blank"
                >
                  Sign up as an Agent
                </Link>
                <div className="divider">|</div>
                <Link to="/portal-registration" target="_blank">
                  30 Days Free Trial
                </Link>
              </div>
              <div className="login-caption">
                <Link to={paths.login + "?verification_code=true"}>
                  Login using verification code
                </Link>
              </div>
              <div className="login-caption">
                <Link to={paths.login + "?forgot_password=true"}>
                  Forgot password?
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {userLoading ? <Spinner variant="fixed" /> : null}
    </div>
  );
};

export default PortalRegistration;
