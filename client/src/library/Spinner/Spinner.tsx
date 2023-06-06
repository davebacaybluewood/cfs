import { CircularProgress } from "@mui/material";
import React from "react";
import "./Spinner.scss";

interface SpinnerProps {
  variant: "relative" | "fixed";
}
const Spinner: React.FC<SpinnerProps> = (props) => {
  const fixedSpinner = (
    <div className="fixed-spinner">
      <CircularProgress />
    </div>
  );

  const relativeSpinner = (
    <div className="relative-spinner">
      <CircularProgress />
    </div>
  );
  return props.variant === "fixed" ? fixedSpinner : relativeSpinner;
};

export default Spinner;
