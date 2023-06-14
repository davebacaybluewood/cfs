import classNames from "classnames";
import Button from "library/Button/Button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type LinkType = {
  link: string;
  text: string | JSX.Element;
  isButton?: boolean;
  isActive?: boolean;
  className?: string;
};
interface NavLinksDesktopProps {
  links: LinkType[];
}

const NavLinksDesktop: React.FC<NavLinksDesktopProps> = (props) => {
  const navigate = useNavigate();
  return (
    <ul>
      {props.links.map((data) => {
        const linkClassnames = classNames({
          "link-active": data.isActive,
        });
        const buttonClassName = classNames({
          navbar__buttton: data.isButton,
        });
        return (
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
        );
      })}
    </ul>
  );
};

export default NavLinksDesktop;
