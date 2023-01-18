import { IMAGES, SOCIAL_LINKS } from "constants/constants";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <img src={IMAGES.COMPANY_LOGOS.MAIN} alt={IMAGES.COMPANY_LOGOS.MAIN} />
        <p>Comfort Life Enterprise LLC offers insurance products</p>
        <ul>
          <li>
            Headquarters: 3601 W. Sahara Ave STE 201, Las Vegas, NV 89102.
          </li>
          <li>Phone: (702) 900-5666</li>
        </ul>
        <ul className="social-icons">
          {/* <li>
            <a href="https://facebook.com" target="_blank">
              <FaFacebookF />
            </a>
          </li> */}
          <li>
            <a href={SOCIAL_LINKS.TWITTER} target="_blank">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.LINKEDIN} target="_blank">
              <FaLinkedinIn />
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank">
              <FaInstagram />
            </a>
          </li>
        </ul>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms and Conditions</li>
        </ul>
      </div>
      <div className="bottom-footer">
        Copyright © 2022 Comfort Life Financial. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
