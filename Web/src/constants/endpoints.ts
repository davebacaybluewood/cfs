import agentEndpoints from "./endpoints/agents";
import appointmentEndpoints from "./endpoints/appointments";
import blogEndpoints from "./endpoints/blogs";
import contactEndpoints from "./endpoints/contacts";
import eventEndpoints from "./endpoints/events";
import inquiriesEndpoints from "./endpoints/inquiries";
import usersEndpoints from "./endpoints/users";
import webinarEndpoints from "./endpoints/webinars";

const URL_ENDPOINTS = {
  /** ENDPOINT: /api/contacts */
  ...contactEndpoints,

  /** ENDPOINT: /api/inquiries */
  ...inquiriesEndpoints,

  /** ENDPOINT: /api/agents */
  ...agentEndpoints,

  /** ENDPOINT: /api/users */
  ...usersEndpoints,

  /** ENDPOINT: /api/events */
  ...eventEndpoints,

  /** ENDPOINT: /api/webinars */
  ...webinarEndpoints,

  /** ENDPOINT: /api/appointments */
  ...appointmentEndpoints,

  /** ENDPOINT: /api/blogs */
  ...blogEndpoints,
};

const ENDPOINTS: Record<keyof typeof URL_ENDPOINTS, string> = URL_ENDPOINTS;
export default ENDPOINTS;
