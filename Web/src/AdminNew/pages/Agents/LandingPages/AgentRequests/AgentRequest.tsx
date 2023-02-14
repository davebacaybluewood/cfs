import React from "react";
import AdminAgents from "../ActiveAgents/Agents";
import { AgentStatuses } from "../../types";

const AgentRequest: React.FC = () => {
  return (
    <AdminAgents
      title="Agent Requests"
      subtitle="View all pending agent requests."
      showHeaderButtons={false}
      agentStatus={AgentStatuses.PENDING}
    />
  );
};

export default AgentRequest;
