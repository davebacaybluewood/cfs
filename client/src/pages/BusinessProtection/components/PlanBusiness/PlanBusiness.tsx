import Offer from "library/Offer/Offer";
import React from "react";
import "./PlanBusiness.scss";
import { CALENDLY } from "constants/constants";
import { PopupModal } from "react-calendly";

const PlanBusiness: React.FC = () => {
  const [openCalendlyModal, setOpenCalendlyModal] = React.useState(false);
  return (
    <div className="plan__container">
      <Offer
        title="Protect Your Business Today"
        description="Your business is the result of your passion and hard work. Don't leave its future to chance. Choose Comfort Financial Solutions for comprehensive coverage, tailored solutions, and personalized service. Safeguard your business with confidence, navigate challenges, and seize opportunities in today's competitive landscape."
        list={[
          "Track and control spending.",
          "Simple to use mobile app for drivers.",
          "24/7 US-based customer support.",
        ]}
        image="/assets/others/choose-business.jpg"
        button={{
          text: "Get Insured Now",
          onClick: () => setOpenCalendlyModal(true),
        }}
      />
      <PopupModal
        url={CALENDLY.CONSULTATION}
        onModalClose={() => setOpenCalendlyModal(false)}
        open={openCalendlyModal}
        rootElement={document.getElementById("root") as any}
      />
    </div>
  );
};

export default PlanBusiness;
