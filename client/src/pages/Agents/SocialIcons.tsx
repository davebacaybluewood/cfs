import classNames from "classnames";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import React from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import "./SocialIcons.scss";

type SocialIconsProps = {
  twitter: string;
  instagram: string;
  linkedIn: string;
  facebook: string;
  className?: string;
  paw?: string;
};
const SocialIcons: React.FC<SocialIconsProps> = (props) => {
  const socialClassnames = classNames("social-icons", props.className);
  return (
    <ul className={socialClassnames}>
      <ComponentValidator showNull={!props.twitter}>
        <li>
          <div className="top-nav-icon">
            <a href={props.twitter} target="_blank">
              <FaTwitter />
            </a>
          </div>
        </li>
      </ComponentValidator>
      <ComponentValidator showNull={!props.facebook}>
        <li>
          <div className="top-nav-icon">
            <a href={props.facebook} target="_blank">
              <FaFacebook />
            </a>
          </div>
        </li>
      </ComponentValidator>
      <ComponentValidator showNull={!props.instagram}>
        <li>
          <div className="top-nav-icon">
            <a href={props.instagram} target="_blank">
              <FaInstagram />
            </a>
          </div>
        </li>
      </ComponentValidator>
      <ComponentValidator showNull={!props.linkedIn}>
        <li>
          <div className="top-nav-icon">
            <a href={props.linkedIn} target="_blank">
              <FaLinkedinIn />
            </a>
          </div>
        </li>
      </ComponentValidator>
      <ComponentValidator showNull={!props.paw}>
        <li>
          <div className="top-nav-icon">
            <a href={props.paw} target="_blank">
              <FaGlobe />
            </a>
          </div>
        </li>
      </ComponentValidator>
    </ul>
  );
};

export default SocialIcons;
