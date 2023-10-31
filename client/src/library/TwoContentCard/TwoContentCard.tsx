import React from "react";
import "./TwoContentCard.scss";

interface TwoContentCardProps {
  title: string;
  description: string;
  element?: JSX.Element | string;
}

const TwoContentCard: React.FC<TwoContentCardProps> = (props) => {
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

export default TwoContentCard;
