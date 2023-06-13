import React from "react";
import "./Badge.scss";
import classNames from "classnames";

interface BadgeProps extends React.HTMLProps<HTMLDivElement> {
  variant?: "primary" | "secondary" | "danger";
  isBordered?: boolean;
}

const Badge: React.FC<BadgeProps> = (props) => {
  const badgeClassnames = classNames("cfs-badge", {
    "primary-badge": props.variant === "primary",
    "danger-badge": props.variant === "danger",
    "secondary-badge": props.variant === "secondary",
    "border-badge-primary": props.isBordered && props.variant === "primary",
    "border-badge-danger": props.isBordered && props.variant === "danger",
    "border-badge-secondary": props.isBordered && props.variant === "secondary",
  });

  return (
    <div className={badgeClassnames} {...props}>
      <span>{props.children}</span>
    </div>
  );
};

Badge.defaultProps = {
  variant: "primary",
};

export default Badge;
