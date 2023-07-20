import classNames from "classnames";
import React from "react";

interface IPortalContent {
  title: string;
  description: string;
  linkProps: {
    link: string;
    text: string;
  };
  bgFadedPosition: "left" | "right";
}
const PortalContent: React.FC<IPortalContent> = (props) => {
  const cardClassnames = classNames("overlay", {
    "overlay-right": props.bgFadedPosition === "right",
    "overlay-left": props.bgFadedPosition === "left",
  });
  return (
    <div className="portal-card">
      <div className={cardClassnames}></div>
      <div className="content">
        <h5>{props.title}</h5>
        <p>{props.description}</p>
        <a
          href={props.linkProps.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.linkProps.text}
        </a>
      </div>
    </div>
  );
};

export default PortalContent;
