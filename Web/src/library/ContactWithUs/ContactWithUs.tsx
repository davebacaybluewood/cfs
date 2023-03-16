import React, { useState } from "react";
import "./ContactWithUs.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { PopupModal } from "react-calendly";
import { MAIN_CALENDLY_EVENT_LINK } from "constants/constants";

const ContactWithUs = () => {
  const [calendlyModal, setCalendlyModal] = useState(false);
  return (
    <React.Fragment>
      <div className="contact-with-us-wrapper">
        <div className="captions">
          <h5>Calendly Appointment</h5>
          <p>Powered by Calendly</p>
        </div>
        <div className="captions">
          <h2>Contact With Us!</h2>
        </div>
        <div>
          <button onClick={() => setCalendlyModal(true)}>
            BOOK APPOINTMENT <ArrowRightAltIcon />
          </button>
        </div>
      </div>
      <PopupModal
        url={MAIN_CALENDLY_EVENT_LINK}
        onModalClose={() => setCalendlyModal(false)}
        open={calendlyModal}
        rootElement={document.getElementById("root") as any}
      />
    </React.Fragment>
  );
};

export default ContactWithUs;
