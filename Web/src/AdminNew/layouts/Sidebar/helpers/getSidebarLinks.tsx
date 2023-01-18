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
} from "react-icons/fa";

export interface ISidebarLinks {
  linkText: string;
  link: string;
  isActive?: boolean;
  icon: React.ReactNode;
  role: string[];
}

const getSidebarLinks = (role: string) => {
  const currentPage = document.location.href.split("/")[4];

  const sidebarLinks: ISidebarLinks[] = [
    {
      linkText: "Dashboard",
      link: paths.dashboard,
      isActive: currentPage === adminPathsNew.dashboard.split("/")[2],
      icon: <FaTachometerAlt />,
      role: [ROLES.ROLE_AGENT],
    },
    {
      linkText: "Profile",
      link: paths.profile,
      isActive: currentPage === adminPathsNew.profile.split("/")[2],
      icon: <FaUserSecret />,
      role: [ROLES.ROLE_AGENT],
    },
    {
      linkText: "Appointments",
      link: paths.appointments,
      isActive: currentPage === adminPathsNew.appointments.split("/")[2],
      icon: <FaRegCalendarCheck />,
      role: [ROLES.ROLE_AGENT],
    },
    {
      linkText: "Calendar",
      link: paths.calendar,
      isActive: currentPage === adminPathsNew.calendar.split("/")[2],
      icon: <FaRegCalendarAlt />,
      role: [ROLES.ROLE_AGENT],
    },
    {
      linkText: "Contacts",
      link: paths.contacts,
      isActive: currentPage === adminPathsNew.contacts.split("/")[2],
      icon: <FaBookReader />,
      role: [ROLES.ROLE_AGENT],
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
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN],
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
  return {
    sidebarMainLinks,
    otherLinks,
  };
};

export default getSidebarLinks;
