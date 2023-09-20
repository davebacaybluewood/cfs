import React, { useEffect, useState } from "react";
import "pages/PortalRegistration/PortalRegistration.scss";
import LoginForm from "./components/LoginForm";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import adminPathsNew from "admin/constants/routes";
import { Alert } from "@mui/material";
import { MAIN_IMAGES } from "constants/constants";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import { login } from "redux/actions/userActions";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import "pages/PortalRegistration/PortalRegistration.scss";
import "./Login.scss";
import { Search } from "@mui/icons-material";
import LoginFormWithCode from "./components/LoginFormWithCode";
import { paths } from "constants/routes";

type LoginWithValues = {
  emailAddress: string;
  password: string;
};

type LoginWithCode = {
  emailAddress: string;
  verificationCode: string;
};

const PortalRegistration: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading: loginLoading, error, userInfo } = userLogin;
  const [checkEmail, setCheckEmail] = useState(false);
  const { change_password_status } = useParams();
  const [loading, setLoading] = useState(false);

  const urlLocation = useLocation();

  const searchUrlForParameters = new URLSearchParams(urlLocation.search);
  const isVerificationParamter =
    searchUrlForParameters.get("verification_code");
  const isVerification = isVerificationParamter === "true";

  console.log(isVerification);

  const initialWithValues: LoginWithValues = {
    emailAddress: "",
    password: "",
  };

  const initialWithCode: LoginWithCode = {
    emailAddress: "",
    verificationCode: ""
  };

  useEffect(() => {
    if (userInfo) {
      navigate(adminPathsNew.dashboard);
    }
  }, [navigate, userInfo]);

  const validationWithValuesSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address field is required."),
    password: Yup.string().required("Password field is required."),
  });

  const validationWithCodeSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address field is required."),    
  });

  return (
    <div className="portal-registration-container">
      <div className="left-col">
        <div className="captions">
          <h1>
            Welcome <br /> to CFS
          </h1>
          <p>
            Start your journey <br /> with us today.
          </p>
        </div>
      </div>
      <div className="right-col-login">
        <div className="login-container" style={{ width: "100%"}}>
          {isVerification ? (
            <>
              <Formik
                initialValues={initialWithCode}
                enableReinitialize
                onSubmit={async (values: LoginWithCode) => {
                  try {
                    setLoading(true);
                    // dispatch(
                    //   login(values.emailAddress, values.verificationCode) as any
                    // );
                    setLoading(false);
                  } catch (error) {
                    setLoading(false);
                  }
                }}
                validationSchema={validationWithCodeSchema}
              >
                {({
                  values,
                  setFieldValue,
                  touched,
                  errors,
                  handleSubmit,
                  isSubmitting,
                  setErrors,
                  setTouched,
                }) => {
                  const accountDetailsWithCodeValidity =
                   errors.emailAddress
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
                      <LoginFormWithCode
                        email={values.emailAddress}
                        verificationCode={values.verificationCode}
                        isValid={accountDetailsWithCodeValidity}
                        onSubmit={async () => handleSubmit()}
                        setFieldValue={setFieldValue}
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
          ) : (
            <>
              {/* <div className="image-holder">
                    <img src={MAIN_IMAGES.MAIN_LOGO} alt={MAIN_IMAGES.MAIN_LOGO} />
                  </div>
                  <div className="login-captions">
                    <h3>Welcome to CFS Portal</h3>
                  </div> */}
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
                {({
                  values,
                  setFieldValue,
                  touched,
                  errors,
                  handleSubmit,
                  isSubmitting,
                  setErrors,
                  setTouched,
                }) => {
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
              <div className="login-caption">
                <span>Login using verification code</span>
                <Link to={paths.login + "?verification_code=true"}>Log in</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortalRegistration;
