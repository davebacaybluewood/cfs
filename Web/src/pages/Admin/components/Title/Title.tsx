import { Button } from "@mui/material";
import React from "react";
import "./Title.scss";

type TitleProps = {
  title: string;
  subtitle?: string;
  button?: {
    show?: boolean;
    text?: string;
    onClick: () => void;
  };
};
const Title: React.FC<TitleProps> = (props) => {
  return (
    <div className="admin-title-container">
      <div>
        <h1>{props.title}</h1>
        <p>{props.subtitle}</p>
      </div>
      {props.button?.show ? (
        <div>
          <Button variant="contained" onClick={() => props.button?.onClick()}>
            {props.button?.text}
          </Button>
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};

Title.defaultProps = {
  button: {
    text: "ADD",
    show: false,
    onClick: () => console.log("clicked"),
  },
};
export default Title;
