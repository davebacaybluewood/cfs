import { Grid } from "@mui/material";
import React from "react";
import { FaMapMarkerAlt, FaPhone, FaRegEnvelope } from "react-icons/fa";
import SocialIcons from "../SocialIcons";
import { DEFAULT_IMAGE } from "admin/constants/constants";
import { ProfileData } from "admin/hooks/useFetchProfile";

type AgentProfileProps = {
  noContainer?: boolean;
  agent: ProfileData;
};
const AgentProfile: React.FC<AgentProfileProps> = (props) => {
  const { agent } = props;
  return (
    <div className="welcome-section">
      <Grid container spacing={2} alignItems="center">
        <Grid item md={props.noContainer ? 3 : 6}>
          <img
            src={props.agent.avatar ? props.agent.avatar : DEFAULT_IMAGE}
            className="agent-img"
          />
        </Grid>
        <Grid item md={props.noContainer ? 9 : 6}>
          <div className="agent-captions">
            {/* <h1>
              <span>{agent.title}</span>
            </h1> */}
            <h5>
              {!agent?.name
                ? agent.firstName + " " + agent?.lastName
                : !agent?.name}
            </h5>
            <p>{agent.bio}</p>

            <ul className="contacts">
              <li>
                <span>
                  <FaPhone />
                </span>
                {agent.phoneNumber}
              </li>
              <li>
                <span>
                  <FaRegEnvelope />
                </span>
                {agent.emailAddress}
              </li>
              {agent.address ? (
                <li>
                  <span>
                    <FaMapMarkerAlt />
                  </span>
                  {agent.address}
                </li>
              ) : null}
            </ul>

            <SocialIcons
              twitter={agent.twitter}
              facebook={agent.facebook}
              instagram={agent.instagram}
              linkedIn={agent.linkedIn}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AgentProfile;
