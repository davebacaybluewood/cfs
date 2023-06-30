import { AgentStatuses } from "admin/pages/Agents/types";
import React from "react";
import { FaMapMarked, FaPhone } from "react-icons/fa";
import HeaderButtons, { HeaderButtonConfigs } from "./HeaderButtons";
import "./ProfileHeader.scss";
import { TestimonialData } from "admin/hooks/useFetchProfile";

type ProfileHeaderProps = {
  _id: string;
  userGuid: string;
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
  testimonials: TestimonialData[] | undefined;
  headerConfigs?: HeaderButtonConfigs;
  licenseNumber?: string;
  firstName?: string;
  lastName?: string;
  state?: string;
  position: string;
};
const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  return (
    <div className="profile-header">
      <div className="profile-banner" />
      <div className="profile-content">
        <div className="profile-info">
          <img
            src={props.avatar ? props.avatar : "/assets/others/no-image.png"}
            alt="profile-thumbnail"
          />
          <div className="profile-captions">
            <h2>
              {props.firstName
                ? props.firstName + " " + props.lastName
                : props.name}
            </h2>
            <ul>
              {props.address ? (
                <li>
                  <span>
                    <FaMapMarked /> {props.address}
                  </span>
                </li>
              ) : null}
              <li>
                <span>
                  <FaPhone /> {props.phoneNumber}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <HeaderButtons
          status={props.status as AgentStatuses}
          id={props._id}
          headerConfigs={props.headerConfigs}
          userGuid={props.userGuid}
          userInfo={{
            email: props.emailAddress,
            licenseNumber: props.licenseNumber ?? "",
            name: props.firstName + " " + props.lastName,
            phoneNumber: props.phoneNumber,
            state: props.state ?? "",
            position: props.position,
          }}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
