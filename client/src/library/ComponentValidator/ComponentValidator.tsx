import React from "react";

type ComponentValidatorProps = {
  children: React.ReactNode;
  showNull: boolean;
};
const ComponentValidator: React.FC<ComponentValidatorProps> = (props) => {
  if (props.showNull) {
    return <React.Fragment />;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ComponentValidator;
