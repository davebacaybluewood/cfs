import "./ContentCard.scss";
import React from "react";
import classNames from "classnames";

export interface ContentCardProps {
  header: string;
  firstTitle: string;
  secondTitle: string;
  description?: string;
  icons?: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
  isMobileMode: boolean;
}
const ContentCard: React.FC<ContentCardProps> = (props) => {
  const contentCardClassnames = classNames("content-card", {
    "content-card-mobile": props.isMobileMode,
  });
  return (
    <div className={contentCardClassnames}>
      <h5 className="header">{props.header}</h5>
      <div className="content-card-title">
        <h2>{props.firstTitle}</h2>
        <h3>{props.secondTitle}</h3>
      </div>
      {/* <div className="divider" /> */}
      {props.icons && (
        <React.Fragment>
          {props.icons?.map((icon, index) => (
            <div className="content-card-icons" key={index}>
              {icon.icon}
              <div>
                <h5>{icon.title}</h5>
                <p>{icon.description}</p>
              </div>
            </div>
          ))}
        </React.Fragment>
      )}
      {props.description && <p className="description">{props.description}</p>}
    </div>
  );
};

export default ContentCard;
