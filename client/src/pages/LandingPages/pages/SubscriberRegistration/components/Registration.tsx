import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Registration = (props) => {
  const [verified, setVerified] = useState(false);
  const recaptchaOnChangeHandler = (value: any) => {
    setVerified(!!value);
  };

  return (
    <div id="subscriber-registration">
      <div className="header">
        <h2>REGISTER ACCOUNT</h2>
      </div>
      <h3>Be a Subscriber For Free</h3>
      <form>
        <label htmlFor="emailAddress">Email Address</label>
        <input type="text" id="emailAddress" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" />
        <div className="recaptcha">
          <ReCAPTCHA
            sitekey="6LfeQtsmAAAAAAsHX2QKCI7YOe2_Y9yaSGOfaBlF"
            onChange={recaptchaOnChangeHandler}
          />
        </div>
        <button type="button">Next</button>
      </form>
    </div>
  );
};

export default Registration;
