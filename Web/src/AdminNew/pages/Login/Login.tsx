import adminPathsNew from "AdminNew/constants/routes";
import { IMAGES } from "constants/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import LoginForm from "./components/LoginForm";
import "./Login.scss";

type LoginValues = {
  emailAddress: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

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
          {/* <LoginForm error={error} loading={loading} /> */}
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
