import { CircularProgress, CircularProgressProps } from "@mui/material";
import React from "react";
import "./Spinner.scss";

const Spinner: React.FC<CircularProgressProps> = (props) => {
  return (
    <div className="mid-spinner-container">
      <CircularProgress {...props} color="primary" />
    </div>
  );
};

export default Spinner;
