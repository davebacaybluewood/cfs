import classNames from "classnames";
import React from "react";
import "./Badge.scss";

type BadgeProps = {
  content: string;
  variant: "primary" | "secondary";
};
const Badge: React.FC<BadgeProps> = (props) => {
  const badgeClassname = classNames({
    "badge-container": true,
    secondary: props.variant === "secondary",
    primary: props.variant === "primary",
  });

  return <div className={badgeClassname}>{props.content}</div>;
};

export default Badge;
