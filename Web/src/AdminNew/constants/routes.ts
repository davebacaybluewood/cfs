const adminCfsRoute = "/cfs-a/";

const adminPathsNew = {
  index: adminCfsRoute + "",
  login: adminCfsRoute + "login",
  agents: adminCfsRoute + "agents",
  dashboard: adminCfsRoute + "dashboard",
  profile: adminCfsRoute + "profile",
  appointments: adminCfsRoute + "appointments",
  calendar: adminCfsRoute + "calendar",
  contacts: adminCfsRoute + "contacts",
  settings: adminCfsRoute + "settings",
  notifications: adminCfsRoute + "notifications",
  faqs: adminCfsRoute + "faqs",
  raiseSupport: adminCfsRoute + "raise-support",
  contactAdmin: adminCfsRoute + "contact-admin",
  adminAgents: adminCfsRoute + "agents",
  adminAgentProfile: adminCfsRoute + "agents/:id",
  adminAgentRequestProfile: adminCfsRoute + "agent-requests/:id",
  adminAgentForm: adminCfsRoute + "agents/form/:action",
  agentRequests: adminCfsRoute + "agent-requests",
  declinedAgents: adminCfsRoute + "declined-agents",
  inquiries: adminCfsRoute + "inquiries",
  newAdminEvents: adminCfsRoute + "events",
  newAdminEventsForm: adminCfsRoute + "events/:id",
  newAdminEventInvites: adminCfsRoute + "event-invites",
} as const;

export default adminPathsNew;
