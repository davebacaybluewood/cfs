import React from "react";
import "./AboutProfile.scss";
import { AiOutlineUser } from "react-icons/ai";
import {
  FaRegLightbulb,
  FaRegAddressCard,
  FaRegCommentDots,
  FaRegMap,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaRegUser,
  FaFlag,
  FaStar,
} from "react-icons/fa";
import Badge from "AdminNew/components/Badge/Badge";

type AboutProfileProps = {
  specialties: string[];
  languages: string[];
  fulllName: string;
  position: string;
  contactNumber: string;
  emailAdress: string;
  address: string;
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
};
const AboutProfile: React.FC<AboutProfileProps> = (props) => {
  return (
    <div className="about-wrapper">
      <div className="about-info">
        <h2>About Me</h2>
        <ul>
          <li>
            <span className="list-label">
              <FaRegUser />
              Full name:{" "}
            </span>
            <span className="list-value">{props.fulllName} </span>
          </li>
          <li>
            <span className="list-label">
              <FaRegLightbulb />
              Position:{" "}
            </span>
            <span className="list-value">{props.position} </span>
          </li>
          <li>
            <span className="list-label">
              <FaRegAddressCard />
              Contact Number:{" "}
            </span>
            <span className="list-value">{props.contactNumber} </span>
          </li>
          <li>
            <span className="list-label">
              <FaRegCommentDots />
              Email Address:{" "}
            </span>
            <span className="list-value">{props.emailAdress} </span>
          </li>
          <li>
            <span className="list-label">
              <FaRegMap />
              Address:{" "}
            </span>
            <span className="list-value">{props.address} </span>
          </li>
          <li>
            <span className="list-label">
              <FaFlag />
              Languages:{" "}
            </span>
            <span className="list-value">
              {props.languages?.map((language) => (
                <Badge content={language} variant="secondary" />
              ))}
            </span>
          </li>
          <li>
            <span className="list-label">
              <FaStar />
              Specialties:{" "}
            </span>
            <span className="list-value">
              {props.specialties?.map((specialty) => (
                <Badge content={specialty} variant="secondary" />
              ))}
            </span>
          </li>
        </ul>
      </div>
      <div className="about-info">
        <h2>Social Medias</h2>
        <ul>
          <li>
            <span className="list-label">
              <FaFacebookF />
              LinkedIn:{" "}
            </span>
            <span className="list-value">{props.linkedIn}</span>
          </li>
          <li>
            <span className="list-label">
              <FaTwitter />
              Facebook:{" "}
            </span>
            <span className="list-value">{props.facebook} </span>
          </li>
          <li>
            <span className="list-label">
              <FaInstagram />
              Instagram:{" "}
            </span>
            <span className="list-value">{props.instagram} </span>
          </li>
          <li>
            <span className="list-label">
              <AiOutlineUser />
              Twitter:{" "}
            </span>
            <span className="list-value">{props.twitter} </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutProfile;
