import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";
import "./Button.scss";
import classNames from "classnames";

type ButtonDefaultProps = ButtonProps & {
  children: string | JSX.Element | React.ReactNode;
  onClick?: () => void;
  className?: string;
  variation?: "dark" | "light" | "main";
};
const Button: React.FC<ButtonDefaultProps> = (props) => {
  const buttonClassnames = classNames("custom-button", props.className, {
    "custom-button-disabled": props.disabled,
    "custom-button-dark": props.variation === "dark",
    "custom-button-light": props.variation === "light",
  });
  return (
    <MUIButton {...props} className={buttonClassnames}>
      {props.children}
    </MUIButton>
  );
};

export default Button;
