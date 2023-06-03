import React from "react";
import "./Card.scss";

interface CardProps {
  image: string;
  cardTitle: string;
  subtitle: string;
}
const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="card-wrapper">
      <div className="card-image">
        <img src={props.image} alt="Card" />
      </div>
      <div className="card-content-container">
        <div className="card-title">
          <h4>{props.cardTitle}</h4>
        </div>
        <div className="subtitle">{props.subtitle}</div>
      </div>
    </div>
  );
};

export default Card;
