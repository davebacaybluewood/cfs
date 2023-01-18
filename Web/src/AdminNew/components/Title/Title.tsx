import classNames from "classnames";
import paths from "constants/routes";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Title.scss";

type TitleProps = {
  title: string;
  subtitle: string;
  visibility?: boolean;
  className?: string;
  link?: string;
};
const Title: React.FC<TitleProps> = (props) => {
  const titleClassnames = classNames("title-with-subtitle", props.className);

  return (
    <div className={titleClassnames}>
      <div className="title-captions">
        <h2>{props.title}</h2>
        <p>{props.subtitle}</p>
      </div>
      <ComponentValidator showNull={!props.link}>
        <Link to={paths.about} className="title-link">
          <FaAngleDoubleRight />
        </Link>
      </ComponentValidator>
    </div>
  );
};

Title.defaultProps = {
  visibility: true,
};

export default Title;
