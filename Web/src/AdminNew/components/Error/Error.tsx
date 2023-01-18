import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import "./Error.scss";

const Error: React.FC = () => {
  return (
    <Alert severity="error" className="error-container">
      <AlertTitle>Error Occured</AlertTitle>
      <span>
        There something wrong! —
        <strong>Please coordinate with the support.</strong>
      </span>
    </Alert>
  );
};

export default Error;
