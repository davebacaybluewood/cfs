const ENDPOINTS = {
  EVENTS: "/api/events",
  EVENT_SINGLE: "/api/events/:id",
  EVENT_INVITE: "/api/events/invites/:id",
  EVENT_INVITE_SUBMIT: "/api/events/submit-invite",

  /* Admin Side */
  USER_LOGIN: "/api/users/login",
  ADMIN_EVENT_INVITES: "/api/events/event-invites/all",
  CONTACTS: "/api/contacts",
  INQUIRIES: "/api/inquiries",
  INQUIRIES_SUBMIT: "/api/inquiries",
  ADD_EVENT: "/api/events/create-event",
  UPDATE_EVENT: "/api/events/update-event",
  EVENT_INVITE_BY_EVENT_ID: "/api/events/eventInviteCount/:id",
  USER_ADMIN_LIST: "/api/users",
  USER_ADMIN_BY_ID: "/api/users/:id",
  AGENTS: "/api/agents",
  AGENT_BY_ID: "/api/agents/:id",
  AGENT_UPDATE_STATUS: "/api/agents/agent-status/:agentId",
  ADMIN_PROFILE: "/api/users/profile",
  AGENT_COUNTS: "/api/agents/agent-counts/all",
  AGENT_TESTIMONIALS: "/api/agents/:agentId/testimonials",
  AGENT_TESTIMONIALS_STATUS: "/api/agents/:agentId/testimonials/update",
  WEBINARS: "/api/webinars",
  WEBINAR_SINGLE: "/api/webinars/:webinarId",
  AGENT_WEBINAR_SINGLE:
    "/api/webinars/single-agent-webinar/:webinarGuid/:agentGuid",
  AGENT_WEBINAR_UPDATE: "/api/agents/:webinarGuid/:agentId/webinar",
  AGENT_WEBINARS: "/api/agents/webinars/active",
  AGENT_WEBINARS_FILTERED: "/api/webinars/filtered/:status",
  AGENT_WEBINAR_FORM: "/api/webinars/:webinarId/:agentGuid/submit-webinar",
  APPOINTMENT_AGENTS: "/api/appointments",
  APPOINTMENT_AGENTS_SCHEDULED_APPOINTMENTS:
    "/api/appointments/:webinarGuid/:agentGuid",
  WEBINAR_APPOINTMENT_AGENTS_COUNT:
    "/api/webinars/:agentId/agent-appointments-count",
  APPOINTMENT_AGENT_CALENDLY: "/api/webinars/:agentId/submit-appointment",
  APPOINTMENT_SINGLE: "/api/appointments/:appointmentId",
  BLOGS: "/api/blogs",
  BLOGS_SINGLE: "/api/blogs/:blogId",
  CHECK_EMAIL: "/api/users/email-check/account",
  CHANGE_PASSWORD: "/api/users/change-password/account",
};

export default ENDPOINTS;
