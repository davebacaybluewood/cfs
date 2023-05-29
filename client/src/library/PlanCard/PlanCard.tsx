import { Typography } from "@mui/material";
import Button from "library/Button/Button";
import React from "react";

import "./PlanCard.scss";
import { AiOutlineCheck } from "react-icons/ai";
import classNames from "classnames";

export interface PlanCardProps {
  title: string;
  subtitle: string;
  description: string;
  lists: string[];
  button: {
    text: string;
    onClick?: () => void;
  };
  colorVariant: string;
}
const PlanCard: React.FC<PlanCardProps> = (props) => {
  const cardClassnames = classNames({
    "light-card": props.colorVariant === "light",
    "dark-card": props.colorVariant === "dark",
    "plan-card-container": true,
  });
  return (
    <div className={cardClassnames}>
      <div className="card__title">
        <Typography variant="h3">{props.title}</Typography>
      </div>
      <div className="subtitle">
        <Typography variant="h4">{props.subtitle}</Typography>
      </div>
      <div className="captions">
        <Typography>{props.description}</Typography>
      </div>
      <div className="list">
        <ul>
          {props.lists.map((list) => {
            return (
              <li>
                {" "}
                <AiOutlineCheck /> {list}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="button__container">
        <Button variant="default">{props.button.text}</Button>
      </div>
    </div>
  );
};

export default PlanCard;
