import React, { useState } from "react";
import { Container } from "@mui/material";
import { InlineWidget } from "react-calendly";
import "./CalendlySection.scss";
import { useMediaQuery } from "react-responsive";
import ReCAPTCHA from "react-google-recaptcha";
import { CALENDLY } from "constants/constants";

const CalendlySection: React.FC = () => {
  const isCalendlyBreak = useMediaQuery({
    query: `(max-width: 1148px)`,
  });

  const [verified, setVerified] = useState(false);
  const recaptchaOnChangeHandler = (value) => {
    setVerified(typeof value === "string");
  };
  return (
    <div className="calendly-section">
      {!verified ? (
        <div className="recaptcha-container">
          <ReCAPTCHA
            sitekey="6LfeQtsmAAAAAAsHX2QKCI7YOe2_Y9yaSGOfaBlF"
            onChange={recaptchaOnChangeHandler}
          />
        </div>
      ) : null}
      <Container>
        <div className="calendly-section-captions">
          <h2>Got Questions? Talk to us!</h2>
          <p>OR DIRECT CALL TO +1 (702) 900-5666</p>
        </div>
        <InlineWidget
          url={CALENDLY.CONSULTATION}
          styles={{
            height: isCalendlyBreak ? "1000px" : "800px",
            marginTop: "-6rem",
            marginBottom: "-6rem",
          }}
        />
      </Container>
    </div>
  );
};

export default CalendlySection;
