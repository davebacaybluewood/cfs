import React from "react";
import "./MerchandiseCard.scss";

interface MerchandiseCardProps {
  name: string;
  image: string;
  points: number;
  button: {
    onClick: () => void;
    text: string;
    display: boolean;
  };
  cardOnClick?: () => void;
  footer?: JSX.Element | React.ReactNode | undefined;
}
const MerchandiseCard: React.FC<MerchandiseCardProps> = (props) => {
  return (
    <div className="merchandise-card">
      <div className="merchandise-image">
        <img src={props.image} alt={props.image} />
      </div>
      <div className="merchandise-captions">
        <h2>{props.name}</h2>
        <p>{props.points} points</p>
        <button className="claim-btn" onClick={props.button.onClick}>
          {props.button.text}
        </button>
      </div>
    </div>
  );
};

export default MerchandiseCard;
