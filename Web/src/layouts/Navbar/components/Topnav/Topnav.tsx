import { Container } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import "./Topnav.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { SOCIAL_LINKS } from "constants/constants";

const Topnav = () => {
  return (
    <div className="top-nav">
      <Container className="top-nav-container">
        <ul className="left-icons">
          <li>
            <div className="top-nav-icon">
              <CallIcon />
            </div>
            <span>+1 (626) 722-1611</span>
          </li>
          <li>
            <div className="top-nav-icon">
              <EmailIcon />
            </div>
            <span>support@gocfs.pro</span>
          </li>
          <li>
            <div className="top-nav-icon">
              <LocationOnIcon />
            </div>
            <span>Las Vegas, NV</span>
          </li>
        </ul>
        <ul className="right-icons">
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
      </Container>
    </div>
  );
};

export default Topnav;
