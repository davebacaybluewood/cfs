import classNames from "classnames";
import React from "react";
import "./LabeledValue.scss";

interface ILabeledValue {
  title: string;
  subTitle?: string;
  isVisible?: boolean;
  variant?: "light" | "bold";
  icon?: React.ReactNode;
}

const LabeledValue: React.FC<ILabeledValue> = (props) => {
  const labelValueClassnames = classNames("label-value", {
    "label-value-bold": props.variant === "bold",
    "label-value-light": props.variant === "light",
    "label-value-icon": props.icon,
  });
  if (props.isVisible) {
    return (
      <div className={labelValueClassnames}>
        {props.icon ? (
          <React.Fragment>
            <div className="icon">{props.icon}</div>
            <div className="caption">
              <h5>{props.title}</h5>
              <p>{props.subTitle}</p>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h5>{props.title}</h5>
            <p>{props.subTitle}</p>
          </React.Fragment>
        )}
      </div>
    );
  }

  return <React.Fragment />;
};

LabeledValue.defaultProps = {
  isVisible: true,
  variant: "light",
};

export default LabeledValue;
