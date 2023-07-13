import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

/**
 * ** All Portal Profile Positions
 * This is the main constant for profile positions
 */
export const PROFILE_POSITIONS = {
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

/**
 * ** All Portal Profile Roles
 * This is the main constant for profile roles
 */
export const PROFILE_ROLES = {
  AGENT: {
    ROLE_TRAINING_ASSOCIATE: {
      value: "ROLE_TRAINING_ASSOCIATE",
      label: "Training Associate",
    },
    ROLE_ASSOCIATE: {
      value: "ROLE_ASSOCIATE",
      label: "Associate",
    },
    ROLE_SENIOR_ASSOCIATE: {
      value: "ROLE_SENIOR_ASSOCIATE",
      label: "Senior Associate",
    },
    ROLE_MARKETING_DIRECTOR: {
      value: "ROLE_MARKETING_DIRECTOR",
      label: "Marketing Director",
    },
    ROLE_SENIOR_MARKETING_DIRECTOR: {
      value: "ROLE_SENIOR_MARKETING_DIRECTOR",
      label: "Senior Marketing Director",
    },
    ROLE_EXECUTIVE_MARKETING_DIRECTOR: {
      value: "ROLE_EXECUTIVE_MARKETING_DIRECTOR",
      label: "Executive Marketing Director",
    },
    ROLE_SENIOR_EXECUTIVE_MARKETING: {
      value: "ROLE_SENIOR_EXECUTIVE_MARKETING",
      label: "Senior Executive Marketing Director",
    },
    ROLE_EXECUTIVE_VICE_PRESIDENT: {
      value: "ROLE_EXECUTIVE_VICE_PRESIDENT",
      label: "Executive Vice President",
    },
  },
  EDITOR_ROLES: {
    ROLE_EDITOR_BLOGS: {
      value: "ROLE_EDITOR_BLOGS",
      label: "Blogs",
    },
    ROLE_EDITOR_EMAIL_TEMPLATES: {
      value: "ROLE_EDITOR_EMAIL_TEMPLATES",
      label: "Email Templates",
    },
  },
  CONTENT_CREATOR_ROLES: {
    ROLE_CONTENT_CREATOR_BLOGS: {
      value: "ROLE_CONTENT_CREATOR_BLOGS",
      label: "Blogs",
    },
    ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES: {
      value: "ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES",
      label: "Email Templates",
    },
  },
  MASTER_ADMIN: {
    ROLE_MASTER_ADMIN: {
      value: "ROLE_MASTER_ADMIN",
      label: "Master Admin",
    },
  },
};
const POSITIONS = [
  {
    value: PROFILE_POSITIONS.AGENT.value,
    label: PROFILE_POSITIONS.AGENT.label,
  },
  {
    value: PROFILE_POSITIONS.EDITOR.value,
    label: PROFILE_POSITIONS.EDITOR.label,
  },
  {
    value: PROFILE_POSITIONS.CONTENT_CREATOR.value,
    label: PROFILE_POSITIONS.CONTENT_CREATOR.label,
  },
  {
    value: PROFILE_POSITIONS.MASTER_ADMIN.value,
    label: PROFILE_POSITIONS.MASTER_ADMIN.label,
  },
];

const AGENT_ROLES = [
  {
    value: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.label,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.label,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.label,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.label,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.label,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.label,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.label,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.label,
  },
];
const EDITOR_ROLES = [
  {
    value: PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
    label: PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.label,
  },
  {
    value: PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
    label: PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.label,
  },
];
const CONTENT_CREATOR_ROLES = [
  {
    value: PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
    label: PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.label,
  },
  {
    value:
      PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
        .value,
    label:
      PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
        .label,
  },
];

const ADMIN_ROLES = [
  {
    value: PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
    label: PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.label,
  },
];

const USER_FAQ = [
  {
    title: "What is CFS Portal?",
    id: "panel1",
    description: (
      <React.Fragment>
        <h3>
          The CFS Portal is a one-stop dashboard with all the tools needed to
          increase your sales and productivity.
        </h3>
        <p>
          Currently, the CFS Portal offers access to, but is not limited to, the
          following CFS systems:
        </p>
        <ul>
          <li>
            <AiFillCheckCircle /> CFS Appointment System
          </li>
          <li>
            <AiFillCheckCircle /> CFS Webpage Builder
          </li>
          <li>
            <AiFillCheckCircle /> CFS Webinar
          </li>
          <li>
            <AiFillCheckCircle /> CFS Blog Editor
          </li>
          <li>
            <AiFillCheckCircle /> CFS Social Media Content
          </li>
        </ul>
      </React.Fragment>
    ),
  },
  {
    title: "How long is the approval process for newly registered accounts?",
    id: "panel2",
    description:
      "The approval process takes 3-5 working days for newly registered accounts.",
  },
  {
    title: "How can I login to the CFS Portal?",
    id: "panel3",
    description: `You may access the login portal using this ${(
      <a target="_blank" href="gocfs.pro/portal-login">
        Link
      </a>
    )} or copy and paste gocfs.pro/portal-login into your browser.`,
  },
];

export {
  CONTENT_CREATOR_ROLES,
  EDITOR_ROLES,
  AGENT_ROLES,
  POSITIONS,
  ADMIN_ROLES,
  USER_FAQ,
};
