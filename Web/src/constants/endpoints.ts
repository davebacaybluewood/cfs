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
  BLOGS: "/api/blogs",
  BLOGS_SINGLE: "/api/blogs/:blogId",
};

export default ENDPOINTS;
