import React from "react";
import {
  FaCheckDouble,
  FaMapMarked,
  FaPhone,
  FaSwatchbook,
} from "react-icons/fa";
import "./ProfileHeader.scss";

type ProfileHeaderProps = {
  name: string;
  avatar: string;
  title: string;
  status: string;
  bio: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  calendlyLink: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  facebook: string;
  testimonials: string[];
};
const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  return (
    <div className="profile-header">
      <div className="profile-banner" />
      <div className="profile-content">
        <div className="profile-info">
          <img src={props.avatar} alt="profile-thumbnail" />
          <div className="profile-captions">
            <h2>{props.name}</h2>
            <ul>
              <li>
                <span>
                  <FaSwatchbook /> {props.title}
                </span>
              </li>
              <li>
                <span>
                  <FaMapMarked /> {props.address}
                </span>
              </li>
              <li>
                <span>
                  <FaPhone /> {props.phoneNumber}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-actions">
          <button>EDIT PROFILE</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
