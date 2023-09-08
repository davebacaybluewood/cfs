import adminPaths from "admin/constants/routes";

const paths = {
  ...adminPaths,

  /*Pages*/
  index: "/",
  home: "/home",
  family_protection: "/family-protection",
  individual_protection: "/individual-protection",
  join_our_team: "/join-our-team",
  contact_us: "/contact_us",
  about_us: "/about-us",
  solutions: "/solutions",
  resources: "/blogs",
  single_blog: "/blogs/:blogTitle",
  events: "/events",
  portal: "/portal",
  testimonialForm: "/testimonial-form/:userGuid",
  invalid: "/invalid",

  /* Contract */
  preLicensing: "/pre-licensing",
  anunity: "/annuity",

  /** Webinar */
  agent_with_id: "/agents/:id",
  agent_check_status: "/agents/status/:id",
  webinarForm: "/webinar/:videoId/:agentId",
  webinarAppointment: "/webinar/:videoId/:agentId/:submissionId",
  agentRegistration: "/portal-registration",
  agentRegistrationSuccess: "/portal-registration-success/:agentId",

  /** Page Success */
  pageSuccess: "/success-page/:pageId",

  /** Landing Pages */
  cfsPages: "/page/:pageId",
  cfsPagesWithAgent: "/page/:pageId/:agentGuid",
  portalRegistration: "/portal-registration",

  /** ADMIN PATHS */
  adminDashboard: "/portal/dashboard",
  adminInquiries: "/portal/inquiries",
  adminCalendar: "/portal/calendar",
  adminServices: "/portal/services",
  adminAccounts: "/portal/admin-accounts",
  adminAccountsForm: "/portal/admin-accounts/:id",
  adminEvents: "/portal/events",
  adminEventsForm: "/portal/events/:id",
  adminGraphs: "/portal/graphs",
  adminContacts: "/portal/contacts",
  adminEventInvites: "/portal/event-invites",

  /** Subscribe Page */
  subscribeSubscriber: "/subscribe/",
};

export { paths };
