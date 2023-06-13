import React from "react";
import AdminAgents from "../ActiveAgents/Agents";
import { AgentStatuses } from "../../types";

const DeactivatedAgents: React.FC = () => {
  return (
    <AdminAgents
      title="Deactivated Agents"
      subtitle="View all pending deactivated agent accounts."
      showHeaderButtons={false}
      agentStatus={AgentStatuses.DEACTIVATED}
    />
  );
};

export default DeactivatedAgents;
