import React from "react";
import "./HeaderTitle.scss";

type HeaderTitleProps = {
  title: string;
  bigTitle: string;
  hasBorder?: boolean;
};
const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
  return (
    <div className="header-title">
      <h5>{props.title}</h5>
      <h2>{props.bigTitle}</h2>
      {props.hasBorder && <div className="divider" />}
    </div>
  );
};

HeaderTitle.defaultProps = {
  hasBorder: true,
};

export default HeaderTitle;
