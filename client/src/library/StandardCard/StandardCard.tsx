import Button from "library/Button/Button";
import React from "react";
import "./StandardCard.scss";

interface StandardProps {
  icon?: JSX.Element | string;
  title?: string;
  description?: string;
  button?: {
    text: string;
    onClick?: () => void;
  };
  children?: JSX.Element | React.ReactNode;
}
const StandardCard: React.FC<StandardProps> = (props) => {
  return (
    <div className="standard-card-container">
      <div className="card-icon">{props.icon}</div>
      <div className="card-title">
        <h3>{props.title}</h3>
      </div>
      <div className="card-description">
        <p>{props.description}</p>
      </div>
      {props.button?.text ? (
        <div className="card__btn">
          <Button variant="default" onClick={props.button.onClick}>
            {props.button?.text}
          </Button>
        </div>
      ) : null}
      <div>{props.children}</div>
    </div>
  );
};

export default StandardCard;
