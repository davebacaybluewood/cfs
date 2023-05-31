import Offer from "library/Offer/Offer";
import React from "react";
import "./Plan.scss";

const Plan: React.FC = () => {
  return (
    <div className="plan">
      <Offer
        title="Insert heading or engaging hook about the solution"
        description={
          <React.Fragment>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed
            do eiusmod tempor incididunt ut labore et dolore <br /> magna
            aliqua. Ut enim ad minim veniam, quis nostrud <br /> exercitation
            ullamco laboris nisi ut aliquip ex ea <br /> commodo consequat.
          </React.Fragment>
        }
        list={[
          "Track and control spending",
          "Simple to use mobile app for drivers",
          "24/7 US-based customer support",
        ]}
        button={{
          text: "Learn More",
        }}
        image="\assets\images\home\rectangle-image1.png"
      />
    </div>
  );
};

export default Plan;
