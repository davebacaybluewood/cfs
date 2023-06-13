import React from "react";

interface AgentCardProps {
  name: string;
  thumbnail: string;
  userGuid: string;
  numberOfVisits: string;
  title: string;
}
const AgentCard: React.FC<AgentCardProps> = (props) => {
  return <div>AgentCard</div>;
};

export default AgentCard;
