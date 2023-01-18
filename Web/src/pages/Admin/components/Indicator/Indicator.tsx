import React from "react";
import { FaHammer } from "react-icons/fa";
import "./Indicator.scss";

const Indicator = () => {
  return (
    <div className="indicator-container">
      <div className="icon-holder">
        <FaHammer />
      </div>
      <div className="caption-holder">
        <h2>Phase 2 Development</h2>
        <p>Currently working on this page.</p>
      </div>
    </div>
  );
};

export default Indicator;
