import React, { useEffect, useState } from "react";
import "pages/PortalRegistration/PortalRegistration.scss";
import LoginForm from "./components/LoginForm";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

type LoginValues = {
  emailAddress: string;
  password: string;
};

const PortalRegistration: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading: loginLoading, error, userInfo } = userLogin;
  const [checkEmail, setCheckEmail] = useState(false);
  const { change_password_status } = useParams();
  const [loading, setLoading] = useState(false);

  const initialValues: LoginValues = {
    emailAddress: "",
    password: "",
  };

  useEffect(() => {
    if (userInfo) {
      navigate(adminPathsNew.dashboard);
    }
  }, [navigate, userInfo]);

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address field is required."),
    password: Yup.string().required("Password field is required."),
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
        <div className="login-container">
          {/* <div className="image-holder">
            <img src={MAIN_IMAGES.MAIN_LOGO} alt={MAIN_IMAGES.MAIN_LOGO} />
          </div>
          <div className="login-captions">
            <h3>Welcome to CFS Portal</h3>
          </div> */}
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (values: LoginValues) => {
              try {
                setLoading(true);
                dispatch(login(values.emailAddress, values.password) as any);
                setLoading(false);
              } catch (error) {
                setLoading(false);
              }
            }}
            validationSchema={validationSchema}
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
                    <h2 style={{ fontWeight: "300", fontFamily: "Montserrat" }}>
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
        </div>
      </div>
    </div>
  );
};

export default PortalRegistration;
