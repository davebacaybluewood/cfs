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
        title="Stability and Resilience"
        description="Take advantage of CFS's strategic financial products. As an individual,
        life insurance is a crucial component of financial planning. Regardless
        of age, providing a safety net for unexpected events could impact their financial future."
        list={[
          "Track and control spending.",
          "Simple to use mobile app for drivers.",
          "24/7 US-based customer support.",
        ]}
        image="/assets/others/Business_1.png"
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
