import endpointConnector from "helpers/endpointConnector";

const endpoints = {
  AGENTS: "/",
  AGENT_BY_ID: "/:id",
  AGENT_UPDATE_STATUS: "/agent-status/:agentId",
  AGENT_COUNTS: "/agent-counts/all",
  AGENT_TESTIMONIALS: "/:agentId/testimonials",
  AGENT_TESTIMONIALS_STATUS: "/:agentId/testimonials/update",
};

const parentUrl = "/api/agents";

let agentEndpoints: Record<keyof typeof endpoints, string> = endpointConnector(
  endpoints,
  parentUrl
);

export default agentEndpoints;
