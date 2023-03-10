import { OUTSOURCE_LINKS, ROLES } from "AdminNew/constants/constants";
import adminPathsNew from "AdminNew/constants/routes";
import { UserContext } from "AdminNew/context/UserProvider";
import ENDPOINTS from "constants/endpoints";
import paths from "constants/routes";
import getUserToken from "helpers/getUserToken";
import React, { useContext, useEffect, useState } from "react";
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
  FaFileAlt,
  FaNewspaper,
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
    isActive?: boolean;
    badge?: string;
  }[];
}

type AgentStatistics = {
  loading: boolean;
  error: null;
  agentCount?: {
    activeAgents: number;
    deactivatedAgents: number;
    declinedAgents: number;
    pendingAgents: number;
  };
};
const useSidebarLinks = (role: string) => {
  const [data, setData] = useState<AgentStatistics>({
    loading: false,
    error: null,
    agentCount: {
      activeAgents: 0,
      deactivatedAgents: 0,
      declinedAgents: 0,
      pendingAgents: 0,
    },
  });

  useEffect(() => {
    setData({
      loading: true,
      error: null,
      agentCount: {
        activeAgents: 0,
        deactivatedAgents: 0,
        declinedAgents: 0,
        pendingAgents: 0,
      },
    });
    if (role === ROLES.ROLE_MASTER_ADMIN) {
      fetch(ENDPOINTS.AGENT_COUNTS, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData({ loading: false, error: null, agentCount: data });
        })
        .catch((error) => {
          setData({
            loading: false,
            error,
            agentCount: {
              activeAgents: 0,
              deactivatedAgents: 0,
              declinedAgents: 0,
              pendingAgents: 0,
            },
          });
        });
    }
  }, [role]);

  const { agentCount } = data;

  const currentPage = document.location.href.split("/")[4];
  const userContext = useContext<any>(UserContext);
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
      isSubMenu: role === ROLES.ROLE_MASTER_ADMIN || role === ROLES.ROLE_AGENT,
      subLinks: [
        // {
        //   linkText: "Webinar Appointments",
        //   icon: <FaUserSecret />,
        //   link:
        //     role === ROLES.ROLE_MASTER_ADMIN
        //       ? paths.typeAppointments.replace(":typeId", "webinar")
        //       : adminPathsNew.agentAppointments
        //           .replace(":agentId", userContext.user.userGuid)
        //           .replace(":typeId", "webinar"),
        //   isActive:
        //     currentPage === adminPathsNew.typeAppointments.split("/")[2],
        // },
        {
          linkText: "PAW Appointments",
          icon: <FaUserSecret />,
          link:
            role === ROLES.ROLE_MASTER_ADMIN
              ? paths.typeAppointments.replace(":typeId", "paw")
              : adminPathsNew.agentAppointments
                  .replace(":agentId", userContext.user.userGuid)
                  .replace(":typeId", "paw"),
          isActive:
            currentPage === adminPathsNew.typeAppointments.split("/")[2],
        },
      ],
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
      linkText: "Blogs",
      isActive:
        currentPage === adminPathsNew.adminBlogs.split("/")[2] ||
        currentPage === adminPathsNew.adminBlogsFileMaintenance.split("/")[2],
      icon: <FaBell />,
      role: [ROLES.ROLE_EDITOR],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "All Blogs",
          icon: <FaFileAlt />,
          link: paths.adminBlogs,
          isActive: currentPage === adminPathsNew.adminBlogs.split("/")[2],
        },
        {
          linkText: "File Maintenance",
          icon: <FaFileAlt />,
          link: paths.adminBlogsFileMaintenance,
          isActive:
            currentPage ===
            adminPathsNew.adminBlogsFileMaintenance.split("/")[2],
        },
      ],
    },
    {
      linkText: "Agents Submenu",
      isActive:
        currentPage === adminPathsNew.agents.split("/")[2] ||
        currentPage === adminPathsNew.agentRequests.split("/")[2] ||
        currentPage === adminPathsNew.deactivatedAgents.split("/")[2] ||
        currentPage === adminPathsNew.declinedAgents.split("/")[2],
      icon: <FaUserSecret />,
      role: [ROLES.ROLE_MASTER_ADMIN],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Activated Agents",
          icon: <FaUserSecret />,
          link: paths.agents,
          isActive: currentPage === adminPathsNew.agents.split("/")[2],
          badge: agentCount?.activeAgents?.toString(),
        },
        {
          linkText: "Agent Requests",
          icon: <FaUserSecret />,
          link: paths.agentRequests,
          isActive: currentPage === adminPathsNew.agentRequests.split("/")[2],
          badge: agentCount?.pendingAgents?.toString(),
        },
        {
          linkText: "Declined Agents",
          icon: <FaUserSecret />,
          link: paths.declinedAgents,
          isActive: currentPage === adminPathsNew.declinedAgents.split("/")[2],
          badge: agentCount?.declinedAgents?.toString(),
        },
        {
          linkText: "Deactivated Agents",
          icon: <FaUserSecret />,
          link: paths.deactivatedAgents,
          isActive:
            currentPage === adminPathsNew.deactivatedAgents.split("/")[2],
          badge: agentCount?.deactivatedAgents?.toString(),
        },
      ],
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
    {
      linkText: "Blog Resources",
      icon: <FaNewspaper />,
      role: [ROLES.ROLE_MASTER_ADMIN],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Manage Editors",
          link: paths.adminBlogUsers,
        },
        {
          linkText: "Blogs",
          link: paths.adminBlogs,
        },
      ],
    },
    {
      linkText: "File Maintenance",
      isActive:
        currentPage === adminPathsNew.webinar.split("/")[2] ||
        currentPage === adminPathsNew.webinarSingle.split("/")[2],
      icon: <FaFileAlt />,
      role: [ROLES.ROLE_MASTER_ADMIN],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Webinars",
          link: paths.webinar,
          isActive: currentPage === adminPathsNew.webinar.split("/")[2],
        },
        // {
        //   linkText: "Company Information",
        //   link: paths.homeMetatags,
        //   isActive: currentPage === adminPathsNew.homeMetatags.split("/")[2],
        // },
        // {
        //   linkText: "Home Meta Tags",
        //   link: paths.homeMetatags,
        //   isActive: currentPage === adminPathsNew.homeMetatags.split("/")[2],
        // },
      ],
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
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN, ROLES.ROLE_EDITOR],
    },
    {
      linkText: "Raise Support",
      link: paths.raiseSupport,
      isActive: currentPage === adminPathsNew.raiseSupport.split("/")[2],
      icon: <FaConciergeBell />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN, ROLES.ROLE_EDITOR],
    },
    {
      linkText: "Contact Admin",
      link: paths.contactAdmin,
      isActive: currentPage === adminPathsNew.contactAdmin.split("/")[2],
      icon: <FaPhoneAlt />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_EDITOR],
    },
    {
      linkText: "Agency Rocket",
      link: OUTSOURCE_LINKS.AGENCY_ROCKET,
      isActive: false,
      icon: <FaGlobe />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN, ROLES.ROLE_EDITOR],
    },
    {
      linkText: "Back Office",
      link: OUTSOURCE_LINKS.BACK_OFFICE,
      isActive: false,
      icon: <FaGlobe />,
      role: [ROLES.ROLE_AGENT, ROLES.ROLE_MASTER_ADMIN, ROLES.ROLE_EDITOR],
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

export default useSidebarLinks;
