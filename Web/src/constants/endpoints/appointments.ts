import endpointConnector from "helpers/endpointConnector";

const endpoints = {
  APPOINTMENT_AGENTS: "/",
  APPOINTMENT_AGENTS_SCHEDULED_APPOINTMENTS: "/:webinarGuid/:agentGuid",
  APPOINTMENT_SINGLE: "/:appointmentId",
};

const parentUrl = "/api/appointments";

let appointmentEndpoints: Record<keyof typeof endpoints, string> =
  endpointConnector(endpoints, parentUrl);

export default appointmentEndpoints;
