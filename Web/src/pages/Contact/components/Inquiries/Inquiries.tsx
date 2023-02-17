import { CONTACT_LIST, IMAGES, SOCIAL_LINKS } from "constants/constants";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import "./Inquiries.scss";

const Inquiries = () => {
  return (
    <div className="inquiries">
      <div className="inquiries-get-in-touch">
        <h5>Stay in touch</h5>
        <p>
          Stay in touch and keep up-to-date with all our latest news, events and
          campaigns.
        </p>
      </div>
      <div className="inquiries-contact-list">
        <h5>Contact Points</h5>
        <ul>
          {CONTACT_LIST.map((contact, index) => (
            <li key={index}>
              <span className="contact-list">
                <span className="contact-name">
                  {contact.icon}
                  {contact.NAME}:
                  <span className="contact-value">{contact.VALUE}</span>
                </span>
              </span>
            </li>
          ))}
        </ul>
        <ul className="right-icons">
          <li>
            <a href={SOCIAL_LINKS.TWITTER} target="_blank">
              <div className="top-nav-icon">
                <FaTwitter />
              </div>
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.LINKEDIN} target="_blank">
              <div className="top-nav-icon">
                <FaLinkedinIn />
              </div>
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank">
              <div className="top-nav-icon">
                <FaInstagram />
              </div>
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.FACEBOOK} target="_blank">
              <div className="top-nav-icon">
                <FaFacebookF />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Inquiries;
