import { FC } from "react";
import "./NoInformationToDisplay.scss";
import classnames from "classnames";
import { Alert, AlertTitle } from "@mui/material";
import React from "react";

type NoInformationToDisplayProps = {
  message?: string | JSX.Element;
  showNoInfo?: boolean;
  children?: string | JSX.Element;
  variant?: "primary" | "secondary";
  icon?: JSX.Element | null;
  title?: string;
};

const NoInformationToDisplay: FC<NoInformationToDisplayProps> = (props) => {
  const { message, title, showNoInfo, children, variant, icon } = props;

  const noInfoClassnames = classnames("no-info-to-display", variant, {
    "has-icon": icon,
  });
  if (showNoInfo) {
    return (
      <Alert severity="error" className="error-container">
        <AlertTitle>{title || "Error Occured"}</AlertTitle>
        <span>
          {message || (
            <React.Fragment>
              There something wrong! —
              <strong>Please coordinate with the support.</strong>
            </React.Fragment>
          )}
        </span>
      </Alert>
    );
  } else {
    return <>{children}</>;
  }
};

NoInformationToDisplay.defaultProps = {
  variant: "primary",
  icon: null,
};

export default NoInformationToDisplay;
