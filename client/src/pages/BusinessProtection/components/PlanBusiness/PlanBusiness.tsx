import Offer from "library/Offer/Offer";
import React from "react";
import "./PlanBusiness.scss";

const PlanBusiness: React.FC = () => {
  return (
    <div className="plan__container">
      <Offer
        title="Insert heading or engaging hook about the solution"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        list={[
          "Track and control spending",
          "Simple to use mobile app for drivers",
          "24/7 US-based customer support",
        ]}
        image="/assets/images/home/rectangle-image1.png"
        button={{
          text: "Learn More",
        }}
      />
    </div>
  );
};

export default PlanBusiness;
