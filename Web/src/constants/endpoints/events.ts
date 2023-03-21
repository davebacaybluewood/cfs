import endpointConnector from "helpers/endpointConnector";

const endpoints = {
  EVENTS: "/",
  EVENT_SINGLE: "/:id",
  EVENT_INVITE: "/invites/:id",
  ADMIN_EVENT_INVITES: "/event-invites/all",
  EVENT_INVITE_SUBMIT: "/submit-invite",
  ADD_EVENT: "/create-event",
  UPDATE_EVENT: "/update-event",
  EVENT_INVITE_BY_EVENT_ID: "/eventInviteCount/:id",
};

const parentUrl = "/api/events";

let eventEndpoints: Record<keyof typeof endpoints, string> = endpointConnector(
  endpoints,
  parentUrl
);

export default eventEndpoints;
