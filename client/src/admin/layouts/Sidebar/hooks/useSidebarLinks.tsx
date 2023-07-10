import { OUTSOURCE_LINKS, ROLES } from "admin/constants/constants";
import adminPathsNew from "admin/constants/routes";
import { UserContext } from "admin/context/UserProvider";
import { PositionAndRoleType } from "admin/pages/Dashboard/components/ConditionalBox/ConditionalBox";
import { NOTIFICATION_ENUMS } from "constants/constants";
import ENDPOINTS from "constants/endpoints";
import { paths } from "constants/routes";
import getUserToken from "helpers/getUserToken";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
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
  FaPhotoVideo,
  FaSwatchbook,
  FaUsers,
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

const useSidebarLinks = (
  position?: PositionAndRoleType[] | undefined,
  roles?: PositionAndRoleType[] | undefined
) => {
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

  const isAdmin = roles?.some((f) => {
    return f.value === PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value;
  });

  const isEditor = roles?.some((f) => {
    return (
      f.value === PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value ||
      f.value === PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value
    );
  });

  const isContentCreator = roles?.some((f) => {
    return (
      f.value ===
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value ||
      f.value ===
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value
    );
  });

  const isAgent = roles?.some((f) => {
    return (
      f.value === PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value
    );
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
    if (isAdmin) {
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
  }, [isAdmin]);

  const { agentCount } = data;

  const currentPage = document.location.href.split("/")[4];
  const userContext = useContext(UserContext);
  const sidebarLinks: ISidebarLinks[] = [
    {
      linkText: "Dashboard",
      link: paths.dashboard,
      isActive: currentPage === adminPathsNew.dashboard.split("/")[2],
      icon: <FaTachometerAlt />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
        PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
      ],
    },
    {
      linkText: "Profile",
      link: paths.profile,
      isActive: currentPage === adminPathsNew.profile.split("/")[2],
      icon: <FaUser />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
        PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
      ],
    },
    {
      linkText: "Users",
      link: paths.users,
      isActive: currentPage === adminPathsNew.users.split("/")[2],
      icon: <FaUsers />,
      role: [PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value],
    },
    {
      linkText: "Appointments",
      link: paths.appointments,
      isActive: currentPage === adminPathsNew.appointments.split("/")[2],
      icon: <FaRegCalendarCheck />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
        PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
      ],
      isSubMenu: true,
      // isSubMenu: isAdmin || role === ROLES.ROLE_AGENT,
      subLinks: [
        {
          linkText: "Webinar Appointments",
          icon: <FaUserSecret />,
          link:
            // role === ROLES.ROLE_MASTER_ADMIN
            true
              ? paths.typeAppointments.replace(":typeId", "webinar")
              : adminPathsNew.agentAppointments
                  .replace(":agentId", userContext.user?.userGuid ?? "")
                  .replace(":typeId", "webinar"),
          isActive:
            currentPage === adminPathsNew.typeAppointments.split("/")[2],
        },
        {
          linkText: "PAW Appointments",
          icon: <FaUserSecret />,
          link:
            // role === ROLES.ROLE_MASTER_ADMIN
            true
              ? paths.typeAppointments.replace(":typeId", "paw")
              : adminPathsNew.agentAppointments
                  .replace(":agentId", userContext.user?.userGuid ?? "")
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
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
        PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
      ],
    },
    // {
    //   linkText: "Contacts",
    //   link: paths.contacts,
    //   isActive: currentPage === adminPathsNew.contacts.split("/")[2],
    //   icon: <FaBookReader />,
    //   role: [
    //     PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
    //     PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
    //     PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
    //     PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
    //     PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
    //     PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
    //     PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
    //     PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
    //     PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
    //   ],
    // },
    {
      linkText: "Contacts",
      isActive: currentPage === adminPathsNew.mailingList.split("/")[2],
      icon: <FaBookReader />,
      role: [PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Mailing List",
          icon: <FaFileAlt />,
          link: paths.mailingList,
          isActive: currentPage === adminPathsNew.mailingList.split("/")[2],
        },
      ],
    },
    {
      linkText: "Settings",
      link: paths.settings,
      isActive: currentPage === adminPathsNew.settings.split("/")[2],
      icon: <FaCogs />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
      ],
    },
    {
      linkText: "Notifications",
      link: paths.notifications,
      isActive: currentPage === adminPathsNew.notifications.split("/")[2],
      icon: <FaBell />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
      ],
    },
    {
      linkText: "Blogs & Resources",
      isActive:
        currentPage === adminPathsNew.adminBlogs.split("/")[2] ||
        currentPage === adminPathsNew.adminBlogsFileMaintenance.split("/")[2],
      icon: <FaBell />,
      role: [
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
      ],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Blogs",
          icon: <FaFileAlt />,
          link: paths.adminBlogs,
          isActive: currentPage === adminPathsNew.adminBlogs.split("/")[2],
        },
        // {
        //   linkText: "File Maintenance",
        //   icon: <FaFileAlt />,
        //   link: paths.adminBlogsFileMaintenance,
        //   isActive:
        //     currentPage ===
        //     adminPathsNew.adminBlogsFileMaintenance.split("/")[2],
        // },
      ],
    },
    {
      linkText: "Blogs & Resources",
      isActive:
        currentPage === adminPathsNew.adminBlogs.split("/")[2] ||
        currentPage === adminPathsNew.adminBlogsFileMaintenance.split("/")[2],
      icon: <FaBell />,
      role: [
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value,
      ],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Blogs",
          icon: <FaFileAlt />,
          link: paths.adminBlogs,
          isActive: currentPage === adminPathsNew.adminBlogs.split("/")[2],
        },
        // {
        //   linkText: "File Maintenance",
        //   icon: <FaFileAlt />,
        //   link: paths.adminBlogsFileMaintenance,
        //   isActive:
        //     currentPage ===
        //     adminPathsNew.adminBlogsFileMaintenance.split("/")[2],
        // },
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
      role: [PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value],
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
      linkText: "Marketing Materials",
      isActive: currentPage === adminPathsNew.landingPage.split("/")[2],
      icon: <FaSwatchbook />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
      ],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Landing Pages",
          icon: <FaSwatchbook />,
          link: paths.landingPage,
          isActive: currentPage === adminPathsNew.landingPage.split("/")[2],
        },
      ],
    },
    {
      linkText: "Marketing Materials",
      isActive: currentPage === adminPathsNew.landingPage.split("/")[2],
      icon: <FaSwatchbook />,
      role: [PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Landing Pages",
          icon: <FaSwatchbook />,
          link: paths.landingPage,
          isActive: currentPage === adminPathsNew.landingPage.split("/")[2],
        },
      ],
    },

    {
      linkText: "Inquiries",
      link: paths.inquiries,
      isActive: currentPage === adminPathsNew.inquiries.split("/")[2],
      icon: <FaQuestionCircle />,
      role: [PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value],
    },
    {
      linkText: "Events",
      link: paths.newAdminEvents,
      isActive: currentPage === adminPathsNew.newAdminEvents.split("/")[2],
      icon: <FaSplotch />,
      role: [PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value],
    },
    {
      linkText: "Event Invites",
      link: paths.newAdminEventInvites,
      isActive:
        currentPage === adminPathsNew.newAdminEventInvites.split("/")[2],
      icon: <FaThumbsUp />,
      role: [PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value],
    },
    {
      linkText: "Webinar Resources",
      isActive: currentPage === adminPathsNew.webinar.split("/")[2],
      icon: <FaPhotoVideo />,
      role: [PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "Webinars",
          link: paths.webinar,
          isActive: currentPage === adminPathsNew.webinar.split("/")[2],
        },
        {
          linkText: "Agent Webinars",
          link: paths.allAgentWebinars.replace(
            ":status",
            NOTIFICATION_ENUMS.WEBINARS.WEBINAR_APPROVED.toLowerCase()
          ),
          isActive:
            currentPage === adminPathsNew.allAgentWebinars.split("/")[2],
        },
        {
          linkText: "Webinar Requests",
          link: paths.allAgentWebinars.replace(
            ":status",
            NOTIFICATION_ENUMS.WEBINARS.WEBINAR_REQUEST.toLowerCase()
          ),
          isActive:
            currentPage === adminPathsNew.requestedWebinars.split("/")[2],
        },
      ],
    },
    {
      linkText: "My Webinars",
      isActive: currentPage === adminPathsNew.cfsWebinars.split("/")[2],
      icon: <FaPhotoVideo />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
      ],
      isSubMenu: true,
      subLinks: [
        {
          linkText: "CFS Webinars",
          link: paths.cfsWebinars,
          isActive: currentPage === adminPathsNew.cfsWebinars.split("/")[2],
        },
        {
          linkText: "Activated Webinars",
          link: paths.activatedWebinars,
          isActive:
            currentPage === adminPathsNew.activatedWebinars.split("/")[2],
        },
        {
          linkText: "Requested Webinars",
          link: paths.requestedWebinars,
          isActive:
            currentPage === adminPathsNew.requestedWebinars.split("/")[2],
        },
      ],
    },
    {
      linkText: "Blogs & Resources",
      icon: <FaNewspaper />,
      role: [PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value],
      isSubMenu: true,
      subLinks: [
        // {
        //   linkText: "Manage Editors",
        //   link: paths.adminBlogUsers,
        // },
        {
          linkText: "Blogs",
          link: paths.adminBlogs,
        },
      ],
    },
    // {
    //   linkText: "File Maintenance",
    //   isActive:
    //     currentPage === adminPathsNew.webinar.split("/")[2] ||
    //     currentPage === adminPathsNew.webinarSingle.split("/")[2],
    //   icon: <FaFileAlt />,
    //   role: [ROLES.ROLE_MASTER_ADMIN],
    //   isSubMenu: true,
    //   subLinks: [
    //     {
    //       linkText: "Webinars",
    //       link: paths.webinar,
    //       isActive: currentPage === adminPathsNew.webinar.split("/")[2],
    //     },
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
    //   ],
    // },
  ];

  const sidebarMainLinks = sidebarLinks.filter((link: ISidebarLinks) => {
    return roles?.some((f) => {
      return link.role.includes(f.value);
    });
  });

  const otherLinks = [
    {
      linkText: "FAQs",
      link: paths.faqs,
      isActive: currentPage === adminPathsNew.faqs.split("/")[2],
      icon: <FaQuestion />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
        PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
      ],
    },
    {
      linkText: "Raise Support",
      link: paths.raiseSupport,
      isActive: currentPage === adminPathsNew.raiseSupport.split("/")[2],
      icon: <FaConciergeBell />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
        PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
      ],
    },
    {
      linkText: "Contact Admin",
      link: paths.contactAdmin,
      isActive: currentPage === adminPathsNew.contactAdmin.split("/")[2],
      icon: <FaPhoneAlt />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
      ],
    },
    {
      linkText: "Agency Rocket",
      link: OUTSOURCE_LINKS.AGENCY_ROCKET,
      isActive: false,
      icon: <FaGlobe />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
        PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
      ],
    },
    {
      linkText: "Back Office",
      link: OUTSOURCE_LINKS.BACK_OFFICE,
      isActive: false,
      icon: <FaGlobe />,
      role: [
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
        PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
        PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
      ],
    },
  ];

  const sidebarOtherLinks = otherLinks.filter(
    (link: ISidebarLinks) =>
      // link.role.includes(role)
      "test"
  );
  return {
    sidebarMainLinks,
    sidebarOtherLinks,
  };
};

export default useSidebarLinks;
