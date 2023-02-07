import { Button } from "@mui/material";
import { AgentStatuses } from "AdminNew/pages/Agents/types";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import paths from "constants/routes";
import getUserToken from "helpers/getUserToken";
import React, { useState } from "react";
import {
  FaCheckDouble,
  FaMapMarked,
  FaPhone,
  FaSwatchbook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProfileHeader.scss";

type ProfileHeaderProps = {
  _id: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const approveHandler = (agentId: string) => {
    axios
      .put(
        ENDPOINTS.AGENT_UPDATE_STATUS.replace(":agentId", agentId),
        {
          status: AgentStatuses.ACTIVATED,
        },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      )
      .then(() => {
        navigate(paths.agents);
      })
      .catch((error) => {
        alert(getUserToken());
      });
  };

  const declineHandler = (agentId: string) => {};
  const pendingButtons = (
    <React.Fragment>
      <button onClick={() => declineHandler(props._id)}>Decline</button>
      <button onClick={() => approveHandler(props._id)}>Approve</button>
    </React.Fragment>
  );

  const activeButtons = (
    <button
      onClick={() => navigate(paths.adminAgentForm.replace(":action", "add"))}
    >
      Deactivate This Account
    </button>
  );
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
          {props.status !== AgentStatuses.ACTIVATED
            ? pendingButtons
            : activeButtons}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
