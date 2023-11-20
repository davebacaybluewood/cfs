import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Alert,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { MAIN_IMAGES, AGENT_MISSION_IMAGES } from "constants/constants";
import { login } from "redux/actions/userActions";
import { useDispatch } from "react-redux";
import { paths } from "constants/routes";
import { USER_LOGIN_ACTION_TYPES } from "constants/redux-constants";
import { AccountCircle, Lock } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import "./AALogin.scss";

type LoginWithValues = {
  emailAddress: string;
  password: string;
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

const AALogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    emailAddress: false,
    password: false,
  });

  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const urlLocation = useLocation();
  const { error, userInfo } = userLogin;

  const searchUrlForParameters = new URLSearchParams(urlLocation.search);
  const isVerificationParamter =
    searchUrlForParameters.get("verification_code");
  const forgotPassword = searchUrlForParameters.get("forgot_password");
  const isVerification = isVerificationParamter === "true";

  const initialWithValues: LoginWithValues = {
    emailAddress: "",
    password: "",
  };

  const [values, setValues] = useState<LoginWithValues>(initialWithValues);

  useEffect(() => {
    if (userInfo) {
      const storageData = userInfo;
      localStorage.setItem("eventAgentUserInfo", JSON.stringify(storageData));
      dispatch({
        type: USER_LOGIN_ACTION_TYPES.USER_LOGIN_SUCCESS,
        payload: storageData,
      });
      navigate(paths.missions);
    }
  }, [navigate, userInfo]);

  const handleLogin = async () => {
    try {
      if (!verified) {
        return;
      }

      setLoading(true);
      dispatch(login(values.emailAddress, values.password) as any);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFieldBlur = (field: keyof LoginWithValues) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const recaptchaOnChangeHandler = (value) => {
    setVerified(!!value);
  };

  return (
    <div className="aa-login-container">
      <div className="login-container">
        {!isVerification ? (
          <>
            {forgotPassword === "true" ? (
              "FORGOT PASSWORD"
            ) : (
              <div>
                {loading && <CircularProgress className="loading-spinner" />}
                <div className="image-container">
                  {/* <div className="image-overlay">
                    
                  </div> */}
                  <img
                    src={AGENT_MISSION_IMAGES.USER}
                    alt="Second Image"
                    className="buttom-image"
                  />
                  <img
                    src={MAIN_IMAGES.MAIN_LOGO}
                    alt="First Image"
                    className="top-image"
                  />
                </div>
                <div className="form-header">
                  {error && (
                    <Alert
                      variant="filled"
                      severity="error"
                      className="error-alert"
                    >
                      Invalid Email & Password
                    </Alert>
                  )}
                </div>

                <TextField
                  className="text-field-container"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  value={values.emailAddress}
                  onChange={(e) =>
                    setValues({ ...values, emailAddress: e.target.value })
                  }
                  onBlur={() => handleFieldBlur("emailAddress")}
                  error={
                    touchedFields.emailAddress &&
                    !isValidEmail(values.emailAddress)
                  }
                  helperText={
                    touchedFields.emailAddress &&
                    !isValidEmail(values.emailAddress)
                      ? "Please enter a valid email address"
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className="text-field-icon"
                        position="start"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AccountCircle
                          style={{ fontSize: "24px", padding: "0" }}
                        />
                      </InputAdornment>
                    ),
                    style: { fontSize: "14px", margin: "1px" },
                  }}
                />

                <TextField
                  className="text-field-container"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  onBlur={() => handleFieldBlur("password")}
                  error={
                    touchedFields.password && !isValidPassword(values.password)
                  }
                  helperText={
                    touchedFields.password && !isValidPassword(values.password)
                      ? "Password must be at least 8 characters"
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className="text-field-icon"
                        position="start"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Lock style={{ fontSize: "24px", padding: "0" }} />
                      </InputAdornment>
                    ),
                    style: { fontSize: "14px", margin: "1px" },
                  }}
                />

                <div className="recaptcha">
                  <ReCAPTCHA
                    sitekey="6LfeQtsmAAAAAAsHX2QKCI7YOe2_Y9yaSGOfaBlF"
                    onChange={recaptchaOnChangeHandler}
                  />
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  disabled={
                    !isValidEmail(values.emailAddress) ||
                    !isValidPassword(values.password) ||
                    !verified
                  }
                >
                  Login
                </Button>
              </div>
            )}

            <div className="login-caption">
              <Link to={paths.aaLogin + "?forgot_password=true"}>
                Forgot password?
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AALogin;
