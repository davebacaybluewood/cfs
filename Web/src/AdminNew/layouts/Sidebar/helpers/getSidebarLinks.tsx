import { OUTSOURCE_LINKS, ROLES } from "AdminNew/constants/constants";
import adminPathsNew from "AdminNew/constants/routes";
import paths from "constants/routes";
import React from "react";
import {
  FaTachometerAlt,
  FaBookReader,
  FaRegCalendarAlt,
  FaUserSecret,
  FaCogs,
  FaRegCalendarCheck,
  FaGlobe,
  FaConciergeBell,
  FaQuestion,
  FaBell,
  FaPhoneAlt,
  FaUser,
  FaQuestionCircle,
  FaSplotch,
  FaThumbsUp,
  FaUserPlus,
  FaUserTimes,
} from "react-icons/fa";

export interface ISidebarLinks {
  linkText: string;
  link?: string;
  isActive?: boolean;
  icon: React.ReactNode;
  role: string[];
  isSubMenu?: boolean;
  subLinks?: {
    linkText?: string;
    link?: string;
    icon?: React.ReactNode;
  }[];
}

const getSidebarLinks = (role: string) => {
  const currentPage = document.location.href.split("/")[4];

  const sidebarLinks: ISidebarLinks[] = [
    {
      linkText: "Dashboard",
      link: paths.dashboard,
      isActive: currentPage === adminPathsNew.dashboard.split("/")[2],
      icon: <FaTachometerAlt />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Profile",
      link: paths.profile,
      isActive: currentPage === adminPathsNew.profile.split("/")[2],
      icon: <FaUser />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Appointments",
      link: paths.appointments,
      isActive: currentPage === adminPathsNew.appointments.split("/")[2],
      icon: <FaRegCalendarCheck />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Calendar",
      link: paths.calendar,
      isActive: currentPage === adminPathsNew.calendar.split("/")[2],
      icon: <FaRegCalendarAlt />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Contacts",
      link: paths.contacts,
      isActive: currentPage === adminPathsNew.contacts.split("/")[2],
      icon: <FaBookReader />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Settings",
      link: paths.settings,
      isActive: currentPage === adminPathsNew.settings.split("/")[2],
      icon: <FaCogs />,
      role: [ROLES.ROLE_AGENT],
    },
    {
      linkText: "Notifications",
      link: paths.notifications,
      isActive: currentPage === adminPathsNew.notifications.split("/")[2],
      icon: <FaBell />,
      role: [ROLES.ROLE_AGENT],
    },
    {
      linkText: "Agents Submenu",
      isActive: currentPage === adminPathsNew.agents.split("/")[2],
      icon: <FaUserSecret />,
      role: [ROLES.ROLE_MASTER_ADMIN],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Activated Agents",
          icon: <FaUserSecret />,
          link: paths.agents,
        },
        {
          linkText: "Agent Requests",
          icon: <FaUserSecret />,
          link: paths.agents,
        },
        {
          linkText: "Declined Agents",
          icon: <FaUserSecret />,
          link: paths.agents,
        },
      ],
    },
    {
      linkText: "Agents",
      link: paths.agentRequests,
      isActive: currentPage === adminPathsNew.agentRequests.split("/")[2],
      icon: <FaUserSecret />,
      role: [ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Agent Requests",
      link: paths.agentRequests,
      isActive: currentPage === adminPathsNew.agentRequests.split("/")[2],
      icon: <FaUserPlus />,
      role: [ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Declined Agents",
      link: paths.declinedAgents,
      isActive: currentPage === adminPathsNew.declinedAgents.split("/")[2],
      icon: <FaUserTimes />,
      role: [ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Inquiries",
      link: paths.inquiries,
      isActive: currentPage === adminPathsNew.inquiries.split("/")[2],
      icon: <FaQuestionCircle />,
      role: [ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Events",
      link: paths.newAdminEvents,
      isActive: currentPage === adminPathsNew.newAdminEvents.split("/")[2],
      icon: <FaSplotch />,
      role: [ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Event Invites",
      link: paths.newAdminEventInvites,
      isActive:
        currentPage === adminPathsNew.newAdminEventInvites.split("/")[2],
      icon: <FaThumbsUp />,
      role: [ROLES.ROLE_MASTER_ADMIN],
    },
  ];

  const sidebarMainLinks = sidebarLinks.filter((link: ISidebarLinks) =>
    link.role.includes(role)
  );

  const otherLinks = [
    {
      linkText: "FAQs",
      link: paths.faqs,
      isActive: currentPage === adminPathsNew.faqs.split("/")[2],
      icon: <FaQuestion />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Raise Support",
      link: paths.raiseSupport,
      isActive: currentPage === adminPathsNew.raiseSupport.split("/")[2],
      icon: <FaConciergeBell />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Contact Admin",
      link: paths.contactAdmin,
      isActive: currentPage === adminPathsNew.contactAdmin.split("/")[2],
      icon: <FaPhoneAlt />,
      role: [ROLES.ROLE_AGENT],
    },
    {
      linkText: "Agency Rocket",
      link: OUTSOURCE_LINKS.AGENCY_ROCKET,
      isActive: false,
      icon: <FaGlobe />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
    },
    {
      linkText: "Back Office",
      link: OUTSOURCE_LINKS.BACK_OFFICE,
      isActive: false,
      icon: <FaGlobe />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
    },
  ];

  const sidebarOtherLinks = otherLinks.filter((link: ISidebarLinks) =>
    link.role.includes(role)
  );
  return {
    sidebarMainLinks,
    sidebarOtherLinks,
  };
};

export default getSidebarLinks;
