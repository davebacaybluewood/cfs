import classNames from "classnames";
import React from "react";

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
  return (
    <React.Fragment>
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
                <div className={buttonClassName}>
                  <button>Agent Portal</button>
                </div>
              ) : (
                <a href={data.link}>{data.text}</a>
              )}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default NavLinksDesktop;
