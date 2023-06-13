import classNames from "classnames";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import React from "react";
import "./Title.scss";

type TitleProps = {
  title: string;
  subtitle: string;
  visibility?: boolean;
  className?: string;
  link?: string;
  children?: React.ReactNode;
};
const Title: React.FC<TitleProps> = (props) => {
  const titleClassnames = classNames("title-with-subtitle", props.className);

  return (
    <div className={titleClassnames}>
      <div className="title-captions">
        <h2>{props.title}</h2>
        <p>{props.subtitle}</p>
      </div>
      <ComponentValidator showNull={!props.children}>
        <div>{props.children}</div>
      </ComponentValidator>
    </div>
  );
};

Title.defaultProps = {
  visibility: true,
};

export default Title;
