import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import React from "react";
import "./CardContent.scss";

type CardContentProps = {
  title: string;
  description: string;
  subtitle: string;
  thumbnail: string;
  otherProps?: React.HTMLProps<HTMLDivElement>;
  onClick?: () => void;
};
const CardContent: React.FC<CardContentProps> = (props) => {
  return (
    <div {...props.otherProps} className="simple-card-container">
      <img src={props.thumbnail} />
      <div className="card-captions">
        <h2>{props.title}</h2>
        <div className="card-content" id="card-content">
          {props.description?.replace(/<[^>]*>/g, "")}
        </div>
        <button onClick={props.onClick}>LEARN MORE</button>
        <ComponentValidator showNull={!props.otherProps?.children}>
          <div className="card-other-content">{props.otherProps?.children}</div>
        </ComponentValidator>
      </div>
    </div>
  );
};

export default CardContent;
