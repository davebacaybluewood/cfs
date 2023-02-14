import paths from "constants/routes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listSingleAgent } from "redux/actions/agentActions";
import { RootState } from "store";
import { CrumbTypes } from "../../../Dashboard/types";
import Profile from "../../../Profile/Profile";
import "../../AgentProfile.scss";

const AgentProfile: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSingleAgent(id ?? "") as any);
  }, [dispatch, id]);

  const agentSelector = useSelector((state: RootState) => state.agentSingle);
  const { agent, loading, error } = agentSelector as any;

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Life Finance Admin",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Agents",
      url: paths.adminAgents,
      isActive: false,
    },
    {
      title: agent?.name,
      url: paths.adminAgents,
      isActive: true,
    },
  ];

  return (
    <Profile error={error} loading={loading} profile={agent} crumbs={crumbs} />
  );
};

export default AgentProfile;
