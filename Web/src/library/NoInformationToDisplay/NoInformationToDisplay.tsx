import { FC } from "react";
import InfoIcon from "@mui/icons-material/Info";
import "./NoInformationToDisplay.scss";
import classnames from "classnames";

type NoInformationToDisplayProps = {
  message?: string | JSX.Element;
  showNoInfo?: boolean;
  children?: string | JSX.Element;
  variant?: "primary" | "secondary";
  icon?: JSX.Element | null;
};

const NoInformationToDisplay: FC<NoInformationToDisplayProps> = (props) => {
  const { message, showNoInfo, children, variant, icon } = props;

  const noInfoClassnames = classnames("no-info-to-display", variant, {
    "has-icon": icon,
  });
  if (showNoInfo) {
    return (
      <div className={noInfoClassnames}>
        {icon && icon}
        <div className="no-info-to-display-content">
          <InfoIcon className="info-icon" />
          <span className="no-info-to-display-text">
            {message || "No information to display."}
          </span>
        </div>
      </div>
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
