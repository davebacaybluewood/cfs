import React from "react";
import { useParams } from "react-router-dom";
import { CrumbTypes } from "../../../Dashboard/types";
import Profile from "../../../Profile/Profile";
import "../../AgentProfile.scss";
import { paths } from "constants/routes";
import useFetchUserProfile from "admin/hooks/useFetchProfile";

const AgentProfile: React.FC = () => {
  const { id } = useParams();

  const { profile, loading } = useFetchUserProfile(id ?? "");

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Agents",
      url: paths.adminAgents,
      isActive: false,
    },
    {
      title: loading
        ? ""
        : !profile?.name
        ? profile?.firstName + " " + profile?.lastName
        : profile?.name,
      url: paths.adminAgents,
      isActive: true,
    },
  ];

  return (
    <Profile
      error={false}
      loading={loading}
      profile={profile}
      crumbs={crumbs}
      headerConfigs={{ isProfileView: false }}
    />
  );
};

export default AgentProfile;
