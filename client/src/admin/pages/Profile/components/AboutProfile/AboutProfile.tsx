import React from "react";
import "./AboutProfile.scss";
import {
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
  FaAddressCard,
  FaMapMarker,
  FaDiscord,
} from "react-icons/fa";
import Badge from "admin/components/Badge/Badge";
import { CURRENT_DOMAIN } from "constants/constants";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import { AgentStatuses } from "admin/pages/Agents/types";
import { RolesAndPositionType } from "admin/hooks/useFetchProfile";
import { PROFILE_POSITIONS } from "pages/PortalRegistration/constants";
import { paths } from "constants/routes";

type AboutProfileProps = {
  specialties: string[];
  languages: string[];
  fulllName: string;
  roles: RolesAndPositionType[] | undefined;
  position: RolesAndPositionType[] | undefined;
  contactNumber: string;
  emailAdress: string;
  address: string;
  linkedIn: string;
  facebook: string;
  twitter: string;
  weChat: string;
  discordId: string;
  instagram: string;
  agentGuid: string;
  status: string;
  licenseNumber: string;
  state: string;
};
const AboutProfile: React.FC<AboutProfileProps> = (props) => {
  const isAgent = props.position?.some((f) => {
    return f.value === PROFILE_POSITIONS.AGENT.value;
  });
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
              <FaAddressCard />
              License Number:{" "}
            </span>
            <span className="list-value">{props.licenseNumber} </span>
          </li>
          {props.state ? (
            <li>
              <span className="list-label">
                <FaMapMarker />
                State:{" "}
              </span>
              <span className="list-value">{props.state} </span>
            </li>
          ) : null}
          {props.address ? (
            <li>
              <span className="list-label">
                <FaRegMap />
                Address:{" "}
              </span>
              <span className="list-value">{props.address} </span>
            </li>
          ) : null}
          {props.languages?.length ? (
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
          ) : null}
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
            showNull={props.status !== AgentStatuses.ACTIVATED || !isAgent}
          >
            <li>
              <span className="list-label">
                <FaGlobeAmericas />
                Personal Website:{" "}
              </span>
              <span className="list-value">
                <a
                  href={`${paths.myWebPage}/`.replace(":user", props.agentGuid)}
                  target="_blank"
                >
                  Visit Link <FaExternalLinkAlt />
                </a>{" "}
              </span>
            </li>
          </ComponentValidator>

          {props.linkedIn ? (
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
          ) : null}
          {props.facebook ? (
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
          ) : null}
          {props.instagram ? (
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
          ) : null}
          {props.twitter ? (
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
          ) : null}
          {props.weChat ? (
            <li>
              <span className="list-label">
                <FaRegCommentDots />
                WeChat:{" "}
              </span>
              <span className="list-value">
                <a href={props.weChat} target="_blank">
                  Visit Link <FaExternalLinkAlt />
                </a>
              </span>
            </li>
          ) : null}
          {props.discordId ? (
            <li>
              <span className="list-label">
                <FaDiscord />
                Discord ID:{" "}
              </span>
              <span className="list-value">{props.discordId}</span>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default AboutProfile;
