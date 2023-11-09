import React from "react";
import "./MissionCard.scss";

interface MissionCardProps {
  title: string;
  description: string;
  element?: JSX.Element | string;
}

const MissionCard: React.FC<MissionCardProps> = (props) => {
  return (
    <div className="two-content-container">
      <div className="two-content-container-captions">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <div>{props.element}</div>
      </div>
    </div>
  );
};

export default MissionCard;
