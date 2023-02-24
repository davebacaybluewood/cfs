import paths from "constants/routes";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listSingleAgent } from "redux/actions/agentActions";
import { RootState } from "store";
import { CrumbTypes } from "../../../Dashboard/types";
import Profile from "../../../Profile/Profile";
import "../../AgentProfile.scss";

const DeactivatedAgentProfile: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSingleAgent(id ?? "") as any);
  }, [dispatch, id]);

  const agentSelector = useSelector((state: RootState) => state.agentSingle);
  const { agent, loading, error } = agentSelector as any;

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Deactivated Agents",
      url: paths.adminAgents,
      isActive: false,
    },
    {
      title: agent?.name,
      url: paths.adminAgents,
      isActive: true,
    },
  ];

  if (error) {
    return (
      <NoInformationToDisplay
        showNoInfo={error}
        message="There's no agent available."
        title="No information to display."
      />
    );
  }

  return (
    <Profile error={error} loading={loading} profile={agent} crumbs={crumbs} />
  );
};

export default DeactivatedAgentProfile;
