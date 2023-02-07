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
} as const;

export default adminPathsNew;
