import Offer from "library/Offer/Offer";
import React from "react";
import "./Plan.scss";
import { CALENDLY } from "constants/constants";
import { PopupModal } from "react-calendly";

const Plan: React.FC = () => {
  const [openCalendlyModal, setOpenCalendlyModal] = React.useState(false);

  return (
    <div className="plan">
      <Offer
        title="Protect Your Family's Future with Confidence"
        description={
          <React.Fragment>
            Our family is everything. The love, laughter, and shared moments
            create a lifetime of cherished memories. But have you ever stopped
            to consider what would happen to them if something unexpected were
            to occur? At CFS, we specialize in family life insurance, providing
            you with the ultimate peace of mind and ensuring your loved ones'
            financial security, no matter what life may bring.
          </React.Fragment>
        }
        list={[
          "Track and control spending.",
          "Simple to use mobile app for drivers.",
          "24/7 US-based customer support.",
        ]}
        button={{
          text: "Free Consultation",
          onClick: () => setOpenCalendlyModal(true),
        }}
        image="/assets/others/Family_1.png"
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

export default Plan;
