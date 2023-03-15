import AboutUs from "pages/AboutUs/AboutUs";
import Home from "pages/Home/Home";
import { ReactRoutesType } from "./type";
import PageWrapper from "../layouts/PageWrapper/PageWrapper";
import ComingSoon from "pages/ComingSoon/ComingSoon";
import paths from "./routes";
import Contact from "pages/Contact/Contact";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InvalidRoute from "pages/InvalidRoute/InvalidRoute";
import Portal from "pages/Portal/Portal";
import Solutions from "pages/Solutions/Solutions";
import Events from "pages/Events/Events";
import EventInvites from "pages/EventInvites/EventInvites";
import adminRoutes from "pages/Admin/routes";
import Medias from "pages/Medias/Medias";
import MediasLanding from "pages/Medias/MediasLanding";
import { adminRoutesNew } from "AdminNew/constants/constants";
import Blogs from "pages/Blogs/Blogs";
import SingleBlog from "pages/Blogs/landing/SingleBlog";
import Agents from "pages/Agents/Agents";
import AgentVideos from "pages/Agents/components/AgentVideos";
import AgentWebinar from "pages/Agents/AgentWebinar";
import AgentRegistration from "pages/Agents/AgentsLanding/AgentRegistration";
import AgentAppointment from "pages/Agents/AgentAppointment";
import AgentRegistrationSuccess from "pages/Agents/AgentsLanding/AgentRegistrationSuccess";
import AgentCheckStatus from "pages/Agents/AgentsLanding/AgentCheckStatus";
import Test from "TestAutomate/Test";
import RootTest from "TestAutomate/RootTest";

export const MAIN_LOCALHOST = "https://www.comfortfinancialsolutions.com";
export const CURRENT_DOMAIN = window.location.origin;

/* Web App Constant Images */
export const IMAGES = {
  COMPANY_LOGOS: {
    // MAIN: "/assets/logos/comfort-life-financial-main-logo.png",
    MAIN: "/assets/logos/comfort-life-new-logo.png",
    NEW: "/assets/logos/comfort-life-new-logo.png",
  },
  ICONS: {
    THINKING: "/assets/icons/thinking-icon.png",
  },
};

export const VIDEO_FINANCING = "/assets/video/coming-soon-video.mp4";
export const COMPANY_NAME = "Comfort Life Financial";

export const REACT_ROUTES: ReactRoutesType[] = [
  ...adminRoutes,
  ...adminRoutesNew,
  {
    PATH: paths.index,
    ELEMENT: <PageWrapper component={<Home />} />,
  },
  {
    PATH: paths.home,
    ELEMENT: <PageWrapper component={<Home />} />,
  },
  {
    PATH: paths.about,
    ELEMENT: <PageWrapper component={<AboutUs />} />,
  },
  {
    PATH: paths.contact,
    ELEMENT: <PageWrapper component={<Contact />} />,
  },
  {
    PATH: paths.portal,
    ELEMENT: <PageWrapper component={<Portal />} />,
  },
  {
    PATH: paths.solutions,
    ELEMENT: <PageWrapper component={<Solutions />} />,
  },
  {
    PATH: paths.solutions_with_id,
    ELEMENT: <PageWrapper component={<Solutions />} />,
  },
  {
    PATH: paths.events,
    ELEMENT: <PageWrapper component={<Events />} />,
  },

  {
    PATH: paths.event_invites,
    ELEMENT: <PageWrapper component={<EventInvites />} />,
  },
  {
    PATH: paths.blogs,
    ELEMENT: <PageWrapper component={<Blogs />} />,
  },
  {
    PATH: paths.blogsSingle,
    ELEMENT: <PageWrapper component={<SingleBlog />} />,
  },
  {
    PATH: paths.media,
    ELEMENT: <PageWrapper component={<MediasLanding />} />,
  },
  {
    PATH: paths.media_with_id,
    ELEMENT: <PageWrapper component={<Medias />} />,
  },
  {
    PATH: paths.agent_with_id,
    ELEMENT: <PageWrapper component={<Agents />} />,
  },
  {
    PATH: paths.webinarForm,
    ELEMENT: <PageWrapper component={<AgentWebinar showCalendly={false} />} />,
  },
  {
    PATH: paths.webinarAppointment,
    ELEMENT: <PageWrapper component={<AgentAppointment showForm={false} />} />,
  },
  {
    PATH: paths.agentRegistration,
    ELEMENT: <PageWrapper component={<AgentRegistration />} />,
  },
  {
    PATH: paths.agentRegistration,
    ELEMENT: <PageWrapper component={<AgentRegistration />} />,
  },
  {
    PATH: paths.agentRegistrationSuccess,
    ELEMENT: <PageWrapper component={<AgentRegistrationSuccess />} />,
  },
  {
    PATH: paths.agent_check_status,
    ELEMENT: <PageWrapper component={<AgentCheckStatus />} />,
  },
  {
    PATH: "/test",
    ELEMENT: <PageWrapper component={<RootTest />} />,
  },
  {
    PATH: "*",
    ELEMENT: (
      <PageWrapper
        component={<InvalidRoute />}
        showFooter={false}
        showNavbar={false}
      />
    ),
  },
];

export const CONTACT_LIST = [
  {
    NAME: "TEL",
    VALUE: "+1 (702) 900-5666",
    FLAG_CODE: "581",
    icon: <LocalPhoneIcon />,
  },
  {
    NAME: "E-mail",
    VALUE: "support@gocfs.pro",
    icon: <AlternateEmailIcon />,
  },
];

export const eventSteps = [
  {
    title: "01",
    subTitle: "Pick a Event",
    description: "",
  },
  {
    title: "02",
    subTitle: "Submit a form",
    description: "",
  },
  {
    title: "03",
    subTitle: "Get the reference ID",
    description: "",
  },
  {
    title: "04",
    subTitle: "Mark your calendars!",
    description: "",
  },
];

export const MAIN_CALENDLY_EVENT_LINK =
  "https://calendly.com/gocfs/30min?primary_color=0057b7";

export const BLANK_VALUE: string = "—";

export const SOCIAL_LINKS = {
  TWITTER: "https://twitter.com/goCFSpro",
  INSTAGRAM: "https://www.instagram.com/gocfspro",
  LINKEDIN: "https://www.linkedin.com/company/gocfspro",
  FACEBOOK: "https://www.facebook.com/gocfspro",
};

export const MAX_CARD_TEXT: number = 150;
export const AGENT_SPECIALTIES = [
  "Wealth Builder",
  "Financial Freedom",
  "Long Term Care",
  "Legacy Builder",
];

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
