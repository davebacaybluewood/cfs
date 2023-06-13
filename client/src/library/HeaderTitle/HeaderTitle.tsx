import React from "react";
import "./HeaderTitle.scss";

type HeaderTitleProps = {
  title: string;
  bigTitle: string;
  hasBorder?: boolean;
  description?: string;
};
const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
  return (
    <div className="header-title">
      <div className="title">{props.title}</div>
      <h1>{props.bigTitle}</h1>
      {props.description && <p>{props.description}</p>}
      {props.hasBorder && <div className="divider" />}
    </div>
  );
};

HeaderTitle.defaultProps = {
  hasBorder: true,
};

export default HeaderTitle;
