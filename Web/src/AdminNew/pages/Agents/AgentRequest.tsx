import React from "react";
import AdminAgents from "./Agents";

const AgentRequest: React.FC = () => {
  return (
    <AdminAgents
      title="Agent Requests"
      subtitle="View all pending agent requests."
      showHeaderButtons={false}
    />
  );
};

export default AgentRequest;
