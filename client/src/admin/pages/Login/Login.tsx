import adminPathsNew from "admin/constants/routes";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChangePassword from "./components/ChangePassword";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import LoginForm from "./components/LoginForm";
import "./Login.scss";
import { MAIN_IMAGES } from "constants/constants";

const Login = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [checkEmail, setCheckEmail] = useState(false);
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
          <img src={MAIN_IMAGES.MAIN_LOGO} alt="company-logo" />
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
            <ChangePassword />
          </ComponentValidator>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
