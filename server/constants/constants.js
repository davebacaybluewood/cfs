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
  UNSUBSCRIBED: "UNSUBSCRIBED",
  ARCHIVED: "ARCHIVED",
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

export const EVENT_STATUSES = {
  CANCELLED: {
    text: "Cancelled",
    value: "CANCELLED",
  },
  ACTIVE: {
    text: "Active",
    value: "ACTIVE",
  },
  COMING_SOON: {
    text: "Coming Soon",
    value: "COMING_SOON",
  },
  ONGOING: {
    text: "Ongoing",
    value: "ONGOING",
  },
  COMPLETED: {
    text: "Comleted",
    value: "COMPLETED",
  },
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

const SUBSCRIBER_ROLES = [
  {
    value: "ROLE_SUBSCRIBER",
    label: "Subscriber",
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

const FREE_30DAYS_TRIAL_ROLES = [
  {
    value: "ROLE_FREE_30DAYS_TRIAL",
    label: "Free 30days Trial ",
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
  SUBSCRIBER: {
    value: "POSITION_SUBSCRIBER",
    label: "Subscriber",
  },
  MASTER_ADMIN: {
    value: "POSITION_MASTER_ADMIN",
    label: "Master Admin",
  },
  FREE_30DAYS_TRIAL: {
    value: "POSITION_FREE_30DAYS_TRIAL",
    label: "Free 30 days trial",
  },
};

const POINTS_TYPE = {
  PERSONAL_ACCOUNT_REGISTRATION: {
    NAME: "PERSONAL_ACCOUNT_REGISTRATION",
    POINTS: 100,
  },
  SUBSCRIBER_REGISTRATION_SUCCESS: {
    NAME: "SUBSCRIBER_REGISTRATION_SUCCESS",
    POINTS: 100,
  },
  FREE_TRIAL_REGISTRATION_SUCCESS: {
    NAME: "FREE_TRIAL_REGISTRATION_SUCCESS",
    POINTS: 100,
  },
};

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dfm2vczpy/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688418199/cfs-image_rkkknx.jpg?_s=public-apps";

const TICKET_STATUS = {
  RESOLVED: "RESOLVED",
  PENDING: "PENDING",
};

export const API_RES_OK = (msg) => {
  return {
    message: msg,
    status: "SUCCESS",
  };
};

export const API_RES_FAIL = (msg = null) => {
  return {
    error: "invalid_request",
    description: msg ?? "Error occured",
  };
};

export const status = {
  ACTIVATED: "ACTIVATED",
  DEACTIVATED: "DEACTIVATED",
  DECLINED: "DECLINED",
  PENDING: "PENDING",
  UNSUBSCRIBED: "UNSUBSCRIBED",
  ARCHIVED: "ARCHIVED",
};

export {
  CONTENT_CREATOR_ROLES,
  EDITOR_ROLES,
  AGENT_ROLES,
  POSITIONS,
  PROFILE_POSITIONS,
  SUBSCRIBER_ROLES,
  DEFAULT_IMAGE,
  POINTS_TYPE,
  TICKET_STATUS,
  FREE_30DAYS_TRIAL_ROLES,
};
