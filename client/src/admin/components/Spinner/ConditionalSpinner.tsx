import { CircularProgress } from "@mui/material";
import React from "react";

interface ConditionalSpinnerProps {
  isLoading: boolean;
  children: React.ReactNode;
}
const ConditionalSpinner: React.FC<ConditionalSpinnerProps> = (props) => {
  if (props.isLoading) {
    return (
      <div className="conditional-spinner">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ConditionalSpinner;
