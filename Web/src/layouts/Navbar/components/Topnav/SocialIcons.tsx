import classNames from "classnames";
import { SOCIAL_LINKS } from "constants/constants";
import React from "react";
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

type SocialIconsProps = {
  className?: string;
};
const SocialIcons: React.FC<SocialIconsProps> = (props) => {
  const socialClassnames = classNames("right-icons", props.className);
  return (
    <ul className={socialClassnames}>
      <li className="icon-text">
        <span>Follow Our Socials</span>
      </li>
      {/* <li>
            <div className="top-nav-icon">
              <FaFacebookF />
            </div>
          </li> */}
      <li>
        <div className="top-nav-icon">
          <a href={SOCIAL_LINKS.TWITTER} target="_blank">
            <FaTwitter />
          </a>
        </div>
      </li>
      <li>
        <div className="top-nav-icon">
          <a href={SOCIAL_LINKS.LINKEDIN} target="_blank">
            <FaLinkedinIn />
          </a>
        </div>
      </li>
      <li>
        <div className="top-nav-icon">
          <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank">
            <FaInstagram />
          </a>
        </div>
      </li>
    </ul>
  );
};

export default SocialIcons;
