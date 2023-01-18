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
};

export default ENDPOINTS;
