import Spinner from "AdminNew/components/Spinner/Spinner";
import adminPathsNew from "AdminNew/constants/routes";
import { IMAGES } from "constants/constants";
import url_params from "helpers/url_params";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ChangePassword from "./components/ChangePassword";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import LoginForm from "./components/LoginForm";
import "./Login.scss";

type LoginValues = {
  emailAddress: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [checkEmail, setCheckEmail] = useState(false);
  const [forgotSuccessful, setForgotSuccessful] = useState(false);
  const { change_password_status } = useParams();

  useEffect(() => {
    if (userInfo) {
      navigate(adminPathsNew.dashboard);
    }
  }, [navigate, userInfo]);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="img-holder">
          <img
            src="https://res.cloudinary.com/dfm2vczpy/image/upload/v1679348278/other-assets/pexels-william-fortunato-6393342-min_1_obclpk.jpg"
            alt="login-img"
          />
        </div>
        <div className="form-wrapper">
          <img src={IMAGES.COMPANY_LOGOS.NEW} alt="company-logo" />
          <ComponentValidator showNull={checkEmail || !!change_password_status}>
            <LoginForm
              error={error}
              loading={loading}
              setCheckEmail={setCheckEmail}
            />
          </ComponentValidator>
          <ComponentValidator showNull={!checkEmail}>
            <ForgotPasswordForm />
          </ComponentValidator>
          <ComponentValidator showNull={!change_password_status}>
            <ChangePassword setForgotSuccessful={setForgotSuccessful} />
          </ComponentValidator>
        </div>
      </div>
    </div>
  );
};

export default Login;
