import React from "react";
import "./BigBadge.scss";

export interface BigBadgeProps {
  title: string;
  color?: string;
  value1: number;
  label1: string;
  value2?: number;
  label2?: string;
}
const BigBadge: React.FC<BigBadgeProps> = (props) => {
  return (
    <div className="big-badge">
      <div className="badge-header">
        <div
          className="badge"
          style={{
            backgroundColor: props.color,
            width: "30px",
            height: "30px",
          }}
        ></div>
        <span>{props.title}</span>
      </div>
      <div className="badge-details">
        <div className="badge-label">
          <h3>{props.label1}</h3>
        </div>
        <div className="badle-value">
          <h4>${props.value1}</h4>
        </div>
        <React.Fragment>
          <div className="badge-label">
            <h3>{props.label2}</h3>
          </div>
          <div className="badle-value">
            <h4>${props.value2}</h4>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default BigBadge;
