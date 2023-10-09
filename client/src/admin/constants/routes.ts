const adminCfsRoute = "/portal/"

const adminPaths = {
  index: adminCfsRoute + "",
  login: adminCfsRoute + "login",
  forgotPassword: adminCfsRoute + "forgot-password",
  loginWithParams: adminCfsRoute + "login/:change_password_status",
  agents: adminCfsRoute + "agents",
  dashboard: adminCfsRoute + "dashboard",
  profile: adminCfsRoute + "profile",
  profileForm: adminCfsRoute + "profile/form",
  licensing: adminCfsRoute + "licensing",
  contracting: adminCfsRoute + "contracting",
  emailMarketing: adminCfsRoute + "email-marketing",
  profileFormWithProfileId: adminCfsRoute + "profile/form/:userGuid",
  profileFormAdd: adminCfsRoute + "form/add-user",
  appointments: adminCfsRoute + "appointments/",
  typeAppointments: adminCfsRoute + "appointments/:typeId",
  agentAppointments: adminCfsRoute + "appointments/:agentId/:typeId",
  scheduledAppointments:
    adminCfsRoute + "appointments/:agentGuid/:typeId/:webinarGuid",
  appointmentInformation:
    adminCfsRoute + "scheduled-appointment/:appointmentId",
  calendar: adminCfsRoute + "calendar",
  contacts: adminCfsRoute + "contacts",
  settings: adminCfsRoute + "settings",
  profileSettings: adminCfsRoute + "profile-settings/:userGuid",
  notifications: adminCfsRoute + "notifications",
  adminBlogs: adminCfsRoute + "blogs",
  adminBlogsFileMaintenance: adminCfsRoute + "blogs/file-maintenance",
  adminViewBlogs: adminCfsRoute + "blogs/view/:blogTitle",
  adminBlogForm: adminCfsRoute + "blogs/form/:id",
  adminBlogUsers: adminCfsRoute + "editors",
  faqs: adminCfsRoute + "faqs",
  raiseSupport: adminCfsRoute + "raise-support",
  raiseSupportTicket: adminCfsRoute + "raise-support/:id",
  contactAdmin: adminCfsRoute + "contact-admin",
  adminAgents: adminCfsRoute + "agents",
  agentRequests: adminCfsRoute + "agent-requests",
  deactivatedAgents: adminCfsRoute + "deactivated-agents",
  declinedAgents: adminCfsRoute + "declined-agents",
  adminAgentProfile: adminCfsRoute + "agents/:id",
  adminAgentRequestProfile: adminCfsRoute + "agent-requests/:id",
  adminDeclinedAgentProfile: adminCfsRoute + "declined-agents/:id",
  adminDeactivatedAgentProfile: adminCfsRoute + "deactivated-agents/:id",
  adminAgentForm: adminCfsRoute + "agents/form/:action",
  inquiries: adminCfsRoute + "inquiries",
  newAdminEvents: adminCfsRoute + "events",
  newAdminEventsForm: adminCfsRoute + "events/:id",
  newAdminEventInvites: adminCfsRoute + "event-invites",
  webinar: adminCfsRoute + "webinar",
  cfsWebinars: adminCfsRoute + "cfs-webinars",
  activatedWebinars: adminCfsRoute + "cfs-webinars/activated",
  requestedWebinars: adminCfsRoute + "cfs-webinars/requested",
  viewSingleDynamicWebinar: adminCfsRoute + "cfs-webinars/view/:webinarId",
  allAgentWebinars: adminCfsRoute + "cfs-webinars/all/:status",
  webinarSingle: adminCfsRoute + "webinar/:webinarId",
  webinarAdminForm: adminCfsRoute + "webinar-form/:id",
  homeMetatags: adminCfsRoute + "home-metatags",
  landingPage: adminCfsRoute + "landing-page",
  landingPageInfo: adminCfsRoute + "landing-page/accounts/:pageId",
  users: adminCfsRoute + "users",
  // commissionSimulation: adminCfsRoute + "commission-simulation",
  mailingList: adminCfsRoute + "mailing-list",
  mailLibrary: adminCfsRoute + "email-library",
  mailLibraryForm: adminCfsRoute + "email-library-form",
  mySubscribers: adminCfsRoute + "subscribers",
  merchandises: adminCfsRoute + "merchandises",
  merchandiseForm: adminCfsRoute + "merchandises/form",
  rewardsHistory: adminCfsRoute + "rewards/history",
  shareableEmails: adminCfsRoute + "shareable-emails",
  orderHistory: adminCfsRoute + "merchandises/order-history",
} as const;

export default adminPaths
