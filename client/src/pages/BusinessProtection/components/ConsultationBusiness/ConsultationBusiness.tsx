import Consultation from "library/Consultation/Consultation";
import React from "react";
import "./ConsultationBusiness.scss";

const ConsultationBusiness: React.FC = () => {
  return (
    <div className="consultation__container">
      <Consultation
        title="Why choose CFS?"
        description1="Secure your financial future with our end-to-end solutions. From debt management to capital growth and retirement planning, we provide personalized strategies to fit your needs. Earn valuable benefits with our financial solutions. Get a free consultation today to start your journey toward financial security.
        Ensuring Personal Financial
        Stability and Resilience
        Take advantage of CFS's strategic financial products. As an individual,
        life insurance is a crucial component of financial planning. Regardless
        of age, providing a safety net for unexpected events could impact their financial future."
        description2="Ensuring Personal Financial
        Stability and Resilience
        Take advantage of CFS's strategic financial products. As an individual,
        life insurance is a crucial component of financial planning. Regardless
        of age, providing a safety net for unexpected events could impact their financial future."
        button={{
          text: "Free Consultation",
        }}
        image="/assets/others/Business_2.png"
      />
    </div>
  );
};

export default ConsultationBusiness;
