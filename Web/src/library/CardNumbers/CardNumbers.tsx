import React from "react";
import "./CardNumbers.scss";

interface ICardNumbers {
  createdAt: string;
  title: string;
  description: string;
  image: string;
}
const CardNumbers: React.FC<ICardNumbers> = (props) => {
  return (
    <div
      className="card-number"
      style={{ backgroundImage: `url("/assets/others/event-1.png")` }}
    >
      <div className="captions">
        <h5>{props.title}</h5>
        <p>{props.description}</p>
      </div>
      <div className="date">{props.createdAt.toString()}</div>
      {/*<img src={props.image} alt="Event" /> */}
    </div>
  );
};

export default CardNumbers;
