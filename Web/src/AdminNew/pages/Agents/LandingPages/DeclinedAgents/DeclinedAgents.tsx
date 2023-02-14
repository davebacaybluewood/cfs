import React from "react";
import AdminAgents from "../ActiveAgents/Agents";
import { AgentStatuses } from "../../types";

const DeclinedAgents: React.FC = () => {
  return (
    <AdminAgents
      title="Declined Agents"
      subtitle="View all pending declined agent accounts."
      showHeaderButtons={false}
      agentStatus={AgentStatuses.DECLINED}
    />
  );
};

export default DeclinedAgents;
