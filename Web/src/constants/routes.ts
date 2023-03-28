import adminPathsNew from "AdminNew/constants/routes";

const paths = {
  ...adminPathsNew,
  index: "/",
  home: "/home",
  solutions: "/solutions",
  solutions_with_id: "/solutions/:id",
  portal: "/portal",
  contact: "/contact",
  about: "/about",
  invalid: "/invalid",
  events: "/events",
  blogs: "/blogs",
  blogsSingle: "/blogs/:blogTitle",
  event_invites: "/events/invites/:id",
  media: "/media",
  media_with_id: "/media/:id",
  agent_with_id: "/agents/:id",
  agent_check_status: "/agents/status/:id",
  webinarForm: "/webinar/:videoId/:agentId",
  webinarAppointment: "/webinar/:videoId/:agentId/:submissionId",
  agentRegistration: "/agent-registration",
  agentRegistrationSuccess: "/agent-registration-success/:agentId",

  /** ADMIN PATHS */
  login: "/admin/login",
  adminDashboard: "/admin/dashboard",
  adminInquiries: "/admin/inquiries",
  adminCalendar: "/admin/calendar",
  adminServices: "/admin/services",
  adminAccounts: "/admin/admin-accounts",
  adminAccountsForm: "/admin/admin-accounts/:id",
  adminEvents: "/admin/events",
  adminEventsForm: "/admin/events/:id",
  adminGraphs: "/admin/graphs",
  adminContacts: "/admin/contacts",
  adminEventInvites: "/admin/event-invites",
} as const;

export default paths;
