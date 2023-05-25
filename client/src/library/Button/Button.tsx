import React from "react";

import "./Button.scss";
import classNames from "classnames";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary" | "danger" | "default";
}
const Button: React.FC<ButtonProps> = (props) => {
  const buttonClassnames = classNames("cfs-btn", {
    "cfs-btn-danger": props.variant === "danger",
    "cfs-btn-primary": props.variant === "primary",
    "cfs-btn-secondary": props.variant === "secondary",
    "cfs-btn-default": props.variant === "default",
  });

  return (
    <div className={buttonClassnames}>
      <button {...props}>{props.children}</button>
    </div>
  );
};

export default Button;
