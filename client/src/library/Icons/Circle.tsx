import classNames from "classnames";
import React from "react";
import "./Circle.scss";

type CircleProps = {
  variant?: "success" | "warning" | "danger";
  children?: React.ReactNode;
};
const Circle: React.FC<CircleProps> = (props) => {
  const circleClassnames = classNames("circle-icon-comp", {
    success: props.variant === "success",
    warning: props.variant === "warning",
    danger: props.variant === "danger",
  });
  return (
    <div className={circleClassnames}>
      <div className="identifier-icon"></div>
      <span>{props.children}</span>
    </div>
  );
};

Circle.defaultProps = {
  variant: "success",
};
export default Circle;
