import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import "./LinkCard.scss";

interface LinkCardProps {
  title: string;
  onClick: () => void;
}
const LinkCard: React.FC<LinkCardProps> = (props) => {
  return (
    <div className="link-card__container">
      <div className="card__title">
        <h4>{props.title}</h4>
      </div>
      <div className="card__btn">
        <button onClick={props.onClick}>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default LinkCard;
