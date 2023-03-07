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
  FaGlobeAmericas,
  FaExternalLinkAlt,
  FaLinkedin,
} from "react-icons/fa";
import Badge from "AdminNew/components/Badge/Badge";
import { CURRENT_DOMAIN } from "constants/constants";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import { AgentStatuses } from "AdminNew/pages/Agents/types";

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
  agentGuid: string;
  status: string;
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
              {props.languages?.map((language, index) => (
                <Badge content={language} variant="secondary" key={index} />
              ))}
            </span>
          </li>
          <li>
            <span className="list-label">
              <FaStar />
              Specialties:{" "}
            </span>
            <span className="list-value">
              {props.specialties?.map((specialty, index) => (
                <Badge content={specialty} variant="secondary" key={index} />
              ))}
            </span>
          </li>
        </ul>
      </div>
      <div className="about-info">
        <h2>Social Medias</h2>
        <ul>
          <ComponentValidator
            showNull={props.status !== AgentStatuses.ACTIVATED}
          >
            <li>
              <span className="list-label">
                <FaGlobeAmericas />
                Personal Website:{" "}
              </span>
              <span className="list-value">
                <a
                  href={`${CURRENT_DOMAIN}/agents/${props.agentGuid}`}
                  target="_blank"
                >
                  Visit Link <FaExternalLinkAlt />
                </a>{" "}
              </span>
            </li>
          </ComponentValidator>

          <li>
            <span className="list-label">
              <FaLinkedin />
              LinkedIn:{" "}
            </span>
            <span className="list-value">
              <a href={props.linkedIn} target="_blank">
                Visit Link <FaExternalLinkAlt />
              </a>
            </span>
          </li>
          <li>
            <span className="list-label">
              <FaFacebookF />
              Facebook:{" "}
            </span>
            <span className="list-value">
              <a href={props.facebook} target="_blank">
                Visit Link <FaExternalLinkAlt />
              </a>{" "}
            </span>
          </li>
          <li>
            <span className="list-label">
              <FaInstagram />
              Instagram:{" "}
            </span>
            <span className="list-value">
              <a href={props.instagram} target="_blank">
                Visit Link <FaExternalLinkAlt />
              </a>
            </span>
          </li>
          <li>
            <span className="list-label">
              <FaTwitter />
              Twitter:{" "}
            </span>
            <span className="list-value">
              <a href={props.twitter} target="_blank">
                Visit Link <FaExternalLinkAlt />
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutProfile;
