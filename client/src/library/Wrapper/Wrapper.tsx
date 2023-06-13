import classNames from "classnames";
import React from "react";
import "./Wrapper.scss";

interface WrapperProps extends React.HTMLProps<HTMLDivElement> {
  isVisible?: boolean;
  children: React.ReactElement | JSX.Element;
  className?: string;
}
const Wrapper: React.FC<WrapperProps> = (props) => {
  const wrapperClassnames = classNames("content-wrapper", props.className);

  if (!props.isVisible) {
    return <React.Fragment />;
  }

  return (
    <div className={wrapperClassnames} style={props.style}>
      {props.children}
    </div>
  );
};

Wrapper.defaultProps = {
  isVisible: true,
};

export default Wrapper;
