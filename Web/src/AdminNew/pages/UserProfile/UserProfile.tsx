import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { UserContext } from "AdminNew/context/UserProvider";
import paths from "constants/routes";
import React, { useContext, useEffect, useState } from "react";
import useFetchAgent from "../Agents/hooks/useFetchAgent";
import { AgentStatuses } from "../Agents/types";
import { CrumbTypes } from "../Dashboard/types";
import HeaderButtons from "../Profile/components/ProfileHeader/HeaderButtons";
import Profile from "../Profile/Profile";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Profile",
    url: paths.profile,
    isActive: true,
  },
];

const UserProfile: React.FC = () => {
  const agentStorage = localStorage.getItem("userInfo");
  const { userGuid } = JSON.parse(agentStorage ?? "");

  const { agent: agentData, loading } = useFetchAgent(userGuid ?? "");

  return (
    <Profile
      crumbs={crumbs}
      error={false}
      loading={loading}
      profile={agentData}
      headerConfigs={{ isProfileView: true }}
    />
  );
};

export default UserProfile;
