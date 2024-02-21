import React from "react";
import { FaHammer } from "react-icons/fa";
import "./Indicator.scss";
import { Button } from "@mui/material";

interface IndicatorProps {
  header?: string;
  description?: string;
  buttonConfigs?: {
    text: string;
    onClick: () => void;
  };
}
const Indicator: React.FC<IndicatorProps> = (props) => {
  return (
    <div className="indicator-wrapper">
      <div className="indicator-container">
        <div className="icon-holder">
          <FaHammer />
        </div>
        <div className="caption-holder">
          <h2>{props.header || "Currently working on this page."}</h2>
        </div>
      </div>
      {props.buttonConfigs ? (
        <div className="indicator-actions">
          <Button onClick={props.buttonConfigs?.onClick}>
            {props.buttonConfigs?.text}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Indicator;
