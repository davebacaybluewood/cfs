export const BEARER = "Bearer";
export const BLANK_VALUE = "—";

export const ROLES = {
  ROLE_AGENT: "ROLE_AGENT",
  ROLE_MASTER_ADMIN: "ROLE_MASTER_ADMIN",
  ROLE_EDITOR: "ROLE_EDITOR",
};

export const AGENT_STATUSES = {
  ACTIVATED: "ACTIVATED",
  DECLINED: "DECLINED",
  PENDING: "PENDING",
  DEACTIVATED: "DEACTIVATED",
};

export const AGENT_SPECIALTIES = [
  "Wealth Builder",
  "Financial Freedom",
  "Long Term Care",
  "Legacy Builder",
];

export const APPOINTMENT_TYPES = {
  WEBINAR: "WEBINAR",
  PAW: "PAW",
};

export const APPOINTMENT_STATUSES = {
  CANCELLED: "CANCELLED",
  ACTIVE: "ACTIVE",
  ONGOING: "ONGOING",
};

export const NOTIFICATION_ENUMS = {
  WEBINARS: {
    WEBINAR_REQUEST: "WEBINAR_REQUEST",
    WEBINAR_DECLINED: "WEBINAR_DECLINED",
    WEBINAR_APPROVED: "WEBINAR_APPROVED",
  },
  APPOINTMENTS: {
    APPOINTMENT_CANCELLED: "APPOINTMENT_CANCELLED",
    APPOINTMENT_NEW: "APPOINTMENT_NEW",
  },
  BLOGS: {
    BLOGS_REQUEST: "BLOGS_REQUEST",
    BLOGS_DRAFT: "BLOGS_DRAFT",
    BLOGS_PUBLISHED: "BLOGS_PUBLISHED",
    BLOGS_DECLINED: "BLOGS_DECLINED",
  },
};

const POSITIONS = [
  {
    value: "ROLE_AGENT",
    label: "Agent",
  },
  {
    value: "ROLE_EDITOR",
    label: "Editor",
  },
  {
    value: "ROLE_CONTENT_CREATOR",
    label: "Content Creator",
  },
];

const AGENT_ROLES = [
  {
    value: "ROLE_TRAINING_ASSOCIATE",
    label: "Training Associate",
  },
  {
    value: "ROLE_ASSOCIATE",
    label: "Associate",
  },
  {
    value: "ROLE_SENIOR_ASSOCIATE",
    label: "Senior Associate",
  },
  {
    value: "ROLE_MARKETING_DIRECTOR",
    label: "Marketing Director",
  },
  {
    value: "ROLE_SENIOR_MARKETING_DIRECTOR",
    label: "Senior Marketing Director",
  },
  {
    value: "ROLE_EXECUTIVE_MARKETING_DIRECTOR",
    label: "Executive Marketing Director",
  },
  {
    value: "ROLE_SENIOR_EXECUTIVE_MARKETING",
    label: "Senior Executive Marketing",
  },
  {
    value: "ROLE_EXECUTIVE_VICE_PRESIDENT",
    label: "Executive Vice President",
  },
];
const EDITOR_ROLES = [
  {
    value: "ROLE_EDITOR_BLOGS",
    label: "Blogs",
  },
  {
    value: "ROLE_EDITOR_EMAIL_TEMPLATES",
    label: "Email Templates",
  },
];
const CONTENT_CREATOR_ROLES = [
  {
    value: "ROLE_CONTENT_CREATOR_BLOGS",
    label: "Blogs",
  },
  {
    value: "ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES",
    label: "Email Templates",
  },
];

const PROFILE_POSITIONS = {
  AGENT: {
    value: "POSITION_AGENT",
    label: "Agent",
  },
  EDITOR: {
    value: "POSITION_EDITOR",
    label: "Editor",
  },
  CONTENT_CREATOR: {
    value: "POSITION_CONTENT_CREATOR",
    label: "Content Creator",
  },
  MASTER_ADMIN: {
    value: "POSITION_MASTER_ADMIN",
    label: "Master Admin",
  },
};

export {
  CONTENT_CREATOR_ROLES,
  EDITOR_ROLES,
  AGENT_ROLES,
  POSITIONS,
  PROFILE_POSITIONS,
};
