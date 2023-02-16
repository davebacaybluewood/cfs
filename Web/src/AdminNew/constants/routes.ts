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
} as const;

export default adminPathsNew;
