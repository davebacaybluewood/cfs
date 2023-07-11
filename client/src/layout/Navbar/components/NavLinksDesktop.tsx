import classNames from "classnames";
import Button from "library/Button/Button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import "./NavLinksDesktop.scss";

type SubLinksType = {
  link: string;
  text: string | JSX.Element;
  isActive?: boolean;
  className?: string;
};
type LinkType = {
  link: string;
  text: string | JSX.Element;
  isButton?: boolean;
  isActive?: boolean;
  className?: string;
  sublinks?: SubLinksType[];
  hasSublinks?: boolean;
};
interface NavLinksDesktopProps {
  links: LinkType[];
}

const NavLinksDesktop: React.FC<NavLinksDesktopProps> = (props) => {
  const navigate = useNavigate();
  return (
    <ul className="navlinks">
      {props.links.map((data) => {
        const linkClassnames = classNames({
          "link-active": data.isActive,
        });
        const buttonClassName = classNames({
          navbar__buttton: data.isButton,
        });
        return (
          <React.Fragment>
            {!data?.hasSublinks ? (
              <li className={linkClassnames} key={data.text?.toString()}>
                {data.isButton === true ? (
                  <Button
                    className={buttonClassName}
                    variant="danger"
                    onClick={() => navigate(data.link)}
                  >
                    Agent Portal
                  </Button>
                ) : (
                  <Link to={data.link} className={data.className}>
                    {data.text}
                  </Link>
                )}
              </li>
            ) : (
              <li className={linkClassnames} key={data.text?.toString()}>
                <div className="dropdown">
                  <button
                    className="dropbtn"
                    onClick={() => navigate(paths.solutions)}
                  >
                    Solution
                    <i className="fa fa-caret-down"></i>
                  </button>
                  <div className="dropdown-content">
                    <Link to={paths.individual_protection}>
                      Individual Protection
                    </Link>
                    <Link to={paths.family_protection}>Family Protection</Link>
                    <Link to={paths.join_our_team}>Join CFS</Link>
                  </div>
                </div>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default NavLinksDesktop;
