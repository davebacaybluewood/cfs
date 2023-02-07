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
} from "react-icons/fa";

const AboutProfile: React.FC = () => {
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
            <span className="list-value">Dave Spencer Bacay </span>
          </li>
          <li>
            <span className="list-label">
              <FaRegLightbulb />
              Position:{" "}
            </span>
            <span className="list-value">Financial Agent </span>
          </li>
          <li>
            <span className="list-label">
              <FaRegAddressCard />
              Contact Number:{" "}
            </span>
            <span className="list-value">+639063276417 </span>
          </li>
          <li>
            <span className="list-label">
              <FaRegCommentDots />
              Email Address:{" "}
            </span>
            <span className="list-value">spencerbacay@testdata.com </span>
          </li>
          <li>
            <span className="list-label">
              <FaRegMap />
              Address:{" "}
            </span>
            <span className="list-value">Dasma, Philippines </span>
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
            <span className="list-value">Dave Spencer Bacay </span>
          </li>
          <li>
            <span className="list-label">
              <FaTwitter />
              Facebook:{" "}
            </span>
            <span className="list-value">https://instagram.com </span>
          </li>
          <li>
            <span className="list-label">
              <FaInstagram />
              Instagram:{" "}
            </span>
            <span className="list-value">https://instagram.com </span>
          </li>
          <li>
            <span className="list-label">
              <AiOutlineUser />
              Twitter:{" "}
            </span>
            <span className="list-value">https://instagram.com </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutProfile;
