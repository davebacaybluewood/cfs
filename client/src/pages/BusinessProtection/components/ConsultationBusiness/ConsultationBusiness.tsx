import Consultation from "library/Consultation/Consultation";
import React from "react";
import "./ConsultationBusiness.scss";

const ConsultationBusiness: React.FC = () => {
  return (
    <div className="consultation__container">
      <Consultation
        title="Why choose CFS?"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        button={{
          text: "Free Consultation",
        }}
        image="\assets\images\home\rectangle-image1.png"
      />
    </div>
  );
};

export default ConsultationBusiness;
