import { RouteProps } from "react-router-dom";
import US_STATES from "./statesAndLocation";
import NotFound from "layout/NotFound/NotFound";
import AboutUs from "pages/AboutUs/AboutUs";
import AgentSupport from "pages/AgentSupport/AgentSupport";
import BlogPage from "pages/BlogPage/BlogPage";
import BusinessProtection from "pages/BusinessProtection/BusinessProtection";
import ContactPage from "pages/ContactPage/ContactPage";
import FamilyProtection from "pages/FamilyProtection/FamilyProtection";
import Home from "pages/Home/Home";
import SingleBlogPage from "pages/SingleBlogPage/SingleBlogPage";
import Solutions from "pages/Solutions/Solutions";
import { adminRoutes } from "admin/constants/constants";
import { paths } from "./routes";
import PortalRegistration from "pages/PortalRegistration/PortalRegistration";
import Events from "pages/Events/Events";

type ReactRoutesType = RouteProps & {
  showFooter?: boolean;
  showNavbar?: boolean;
  showHeadline?: boolean;
  theme?: "SKY" | "RED" | "NAVY";
};

const COMPANY_NAME = "Comfort Financial Solutions";

const SOCIAL_MEDIA_LINKS = {
  FACEBOOK: "fb.com",
  TWITTER: "twitter.com",
  INSTAGRAM: "ig.com",
  LINKEDIN: "linkedin.com",
};

const MAIN_IMAGES = {
  WHITE_LOGO: "/assets/images/logos/logo-white.png",
  MAIN_LOGO: "/assets/images/logos/cfs-main-logo.png",
};

const CFS_STATES = US_STATES.map((data) => {
  return {
    label: data.name,
    value: data.name,
  };
});

const NOTIFICATION_ENUMS = {
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
const CURRENT_DOMAIN = window.location.origin;

const AGENT_SPECIALTIES = [
  "Wealth Builder",
  "Financial Freedom",
  "Long Term Care",
  "Legacy Builder",
];

const BLANK_VALUE = "—";

const filteredAdminRoutes: ReactRoutesType[] = adminRoutes.map((data) => {
  return {
    ...data,
    showFooter: false,
    showHeadline: false,
    showNavbar: false,
  };
});

const REACT_ROUTES: ReactRoutesType[] = [
  ...filteredAdminRoutes,
  {
    element: <Home key="main-index" />,
    path: paths.index,
  },
  {
    element: <Home key="index" />,
    path: paths.home,
  },
  {
    element: <FamilyProtection />,
    path: paths.family_protection,
  },
  {
    element: <BusinessProtection />,
    path: paths.business_protection,
    showHeadline: false,
    theme: "SKY",
  },
  {
    element: <AgentSupport />,
    path: paths.agent_support,
    showHeadline: false,
    theme: "RED",
  },
  {
    element: <BlogPage />,
    path: paths.resources,
  },
  {
    element: <AboutUs />,
    path: paths.about_us,
  },
  {
    element: <Solutions />,
    path: paths.solutions,
  },
  {
    element: <Events />,
    path: paths.events,
    showHeadline: true,
  },
  {
    element: <ContactPage />,
    path: paths.contact_us,
  },
  {
    element: <SingleBlogPage />,
    path: paths.single_blog,
    showNavbar: true,
    showHeadline: false,
    showFooter: true,
  },
  {
    element: <PortalRegistration />,
    path: paths.portalRegistration,
    showNavbar: false,
    showHeadline: false,
    showFooter: false,
  },
  {
    element: <NotFound />,
    path: "*",
    showNavbar: true,
    showHeadline: false,
    showFooter: true,
  },
  {
    element: <NotFound />,
    path: paths.invalid,
    showHeadline: false,
    showFooter: false,
  },
];

const CALENDLY = {
  CONSULTATION: "https://calendly.com/gocfs/free-30-minute-consultation",
  WEEKLY: "https://calendly.com/gocfs/one-time-weekly-meeting",
};

export {
  COMPANY_NAME,
  SOCIAL_MEDIA_LINKS,
  MAIN_IMAGES,
  CFS_STATES,
  AGENT_SPECIALTIES,
  CURRENT_DOMAIN,
  NOTIFICATION_ENUMS,
  BLANK_VALUE,
  REACT_ROUTES,
  CALENDLY,
};
