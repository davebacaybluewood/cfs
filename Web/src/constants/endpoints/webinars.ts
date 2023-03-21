import endpointConnector from "helpers/endpointConnector";

const endpoints = {
  WEBINARS: "/",
  WEBINAR_SINGLE: "/:webinarId",
  AGENT_WEBINAR_SINGLE: "/single-agent-webinar/:webinarGuid/:agentGuid",
  AGENT_WEBINAR_UPDATE: "/api/agents/:webinarGuid/:agentId/webinar",
  AGENT_WEBINARS: "/api/agents/webinars/active",
  AGENT_WEBINARS_FILTERED: "/filtered/:status",
  AGENT_WEBINAR_FORM: "/:webinarId/:agentGuid/submit-webinar",
  WEBINAR_APPOINTMENT_AGENTS_COUNT: "/:agentId/agent-appointments-count",
  APPOINTMENT_AGENT_CALENDLY: "/:agentId/submit-appointment",
};

const parentUrl = "/api/webinars";

let webinarEndpoints: Record<keyof typeof endpoints, string> =
  endpointConnector(endpoints, parentUrl);

export default webinarEndpoints;
