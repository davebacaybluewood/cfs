import { Paper } from "@mui/material";
import classNames from "classnames";
import React from "react";
import "./Box.scss";

type BoxProps = {
  visibility?: boolean;
  children: React.ReactNode;
  className?: string;
  equalHeight?: boolean;
};
const Box: React.FC<BoxProps> = (props) => {
  const boxClassnames = classNames("box-wrapper", props.className);
  return <div className={boxClassnames}>{props.children}</div>;
};

Box.defaultProps = {
  visibility: true,
};

export default Box;
