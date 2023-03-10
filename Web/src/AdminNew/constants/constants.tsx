import AgentForm from "AdminNew/pages/Agents/AgentForm";
import AgentProfile from "AdminNew/pages/Agents/LandingPages/ActiveAgents/AgentProfile";
import AgentRequest from "AdminNew/pages/Agents/LandingPages/AgentRequests/AgentRequest";
import AgentRequestProfile from "AdminNew/pages/Agents/LandingPages/AgentRequests/AgentRequestProfile";
import DeactivatedAgentProfile from "AdminNew/pages/Agents/LandingPages/DeactivatedAgents/DeactivatedAgentProfile";
import DeactivatedAgents from "AdminNew/pages/Agents/LandingPages/DeactivatedAgents/DeactivatedAgents";
import DeclinedAgentProfile from "AdminNew/pages/Agents/LandingPages/DeclinedAgents/DeclinedAgentProfile";
import DeclinedAgents from "AdminNew/pages/Agents/LandingPages/DeclinedAgents/DeclinedAgents";
import Appointments from "AdminNew/pages/Appointments/Appointments";
import AgentAppointments from "AdminNew/pages/Appointments/LandingPages/AgentAppointments/AgentAppointments";
import AppointmentInformation from "AdminNew/pages/Appointments/LandingPages/ScheduledAppointment/AppointmentInformation";
import ScheduleAppointment from "AdminNew/pages/Appointments/LandingPages/ScheduledAppointment/ScheduleAppointment";
import Blogs from "AdminNew/pages/Blogs/Blogs";
import BlogForm from "AdminNew/pages/Blogs/component/BlogForm";
import FileMaintenance from "AdminNew/pages/Blogs/FileMaintenance/FileMaintenance";
import ViewBlogs from "AdminNew/pages/Blogs/landing/ViewBlogs";
import ManageEditors from "AdminNew/pages/Blogs/ManageEditors/ManageEditors";
import Calendar from "AdminNew/pages/Calendar/Calendar";
import ContactAdmin from "AdminNew/pages/ContactAdmin/ContactAdmin";
import Contacts from "AdminNew/pages/Contacts/Contacts";
import EventInvites from "AdminNew/pages/EventInvites/EventInvites";
import Events from "AdminNew/pages/Events/Events";
import EventsForm from "AdminNew/pages/Events/EventsForm";
import FAQs from "AdminNew/pages/FAQs/FAQs";
import WebinarForm from "AdminNew/pages/FileMaintenance/pages/Webinars/WebinarForm";
import Webinars from "AdminNew/pages/FileMaintenance/pages/Webinars/Webinars";
import WebinarSingle from "AdminNew/pages/FileMaintenance/pages/Webinars/WebinarSingle";
import Inquiries from "AdminNew/pages/Inquiries/Inquiries";
import Login from "AdminNew/pages/Login/Login";
import Notifications from "AdminNew/pages/Notifications/Notifications";
import Profile from "AdminNew/pages/Profile/Profile";
import RaiseSupport from "AdminNew/pages/RaiseSupport/RaiseSupport";
import Settings from "AdminNew/pages/Settings/Settings";
import GuardedWrapper from "../layouts/GuardedWrapper";
import Agents from "../pages/Agents/LandingPages/ActiveAgents/Agents";
import Dashboard from "../pages/Dashboard/Dashboard";
import adminPathsNew from "./routes";

export const ROLES = {
  ROLE_AGENT: "ROLE_AGENT",
  ROLE_EDITOR: "ROLE_EDITOR",
  ROLE_MASTER_ADMIN: "ROLE_MASTER_ADMIN",
};

export const OUTSOURCE_LINKS = {
  AGENCY_ROCKET: "https://agencyrocket.com/",
  BACK_OFFICE:
    "https://agent.comfortfinancialsolutions.com/Users/Account/AccessDenied?ReturnUrl=%2f",
};

export const MAIN_WEBSITE_LINK = [
  "https://www.comfortfinancialsolutions.com/",
  "https://www.gocfs.pro/",
];

export const SCHEDULE_TYPES = {
  WEBINAR: "WEBINAR",
  PAW: "PAW",
};

export const APPOINTMENT_STATUSES = {
  CANCELLED: "CANCELLED",
  ACTIVE: "ACTIVE",
  ONGOING: "ONGOING",
};

export const adminRoutesNew = [
  {
    PATH: adminPathsNew.login,
    ELEMENT: <Login />,
  },
  {
    PATH: adminPathsNew.agents,
    ELEMENT: (
      <GuardedWrapper>
        <Agents />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.agentRequests,
    ELEMENT: (
      <GuardedWrapper>
        <AgentRequest />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.declinedAgents,
    ELEMENT: (
      <GuardedWrapper>
        <DeclinedAgents />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.deactivatedAgents,
    ELEMENT: (
      <GuardedWrapper>
        <DeactivatedAgents />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminAgentRequestProfile,
    ELEMENT: (
      <GuardedWrapper>
        <AgentRequestProfile />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminAgentProfile,
    ELEMENT: (
      <GuardedWrapper>
        <AgentProfile />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminDeclinedAgentProfile,
    ELEMENT: (
      <GuardedWrapper>
        <DeclinedAgentProfile />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminDeactivatedAgentProfile,
    ELEMENT: (
      <GuardedWrapper>
        <DeactivatedAgentProfile />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.dashboard,
    ELEMENT: (
      <GuardedWrapper>
        <Dashboard />
      </GuardedWrapper>
    ),
  },
  // {
  //   PATH: adminPathsNew.profile,
  //   ELEMENT: (
  //     <GuardedWrapper>
  //       <Profile />
  //     </GuardedWrapper>
  //   ),
  // },
  {
    PATH: adminPathsNew.appointments,
    ELEMENT: (
      <GuardedWrapper>
        <Appointments />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.typeAppointments,
    ELEMENT: (
      <GuardedWrapper>
        <Appointments />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.agentAppointments,
    ELEMENT: (
      <GuardedWrapper>
        <AgentAppointments />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.appointmentInformation,
    ELEMENT: (
      <GuardedWrapper>
        <AppointmentInformation />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.scheduledAppointments,
    ELEMENT: (
      <GuardedWrapper>
        <ScheduleAppointment />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.calendar,
    ELEMENT: (
      <GuardedWrapper>
        <Calendar />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.contacts,
    ELEMENT: (
      <GuardedWrapper>
        <Contacts />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.settings,
    ELEMENT: (
      <GuardedWrapper>
        <Settings />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.notifications,
    ELEMENT: (
      <GuardedWrapper>
        <Notifications />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.faqs,
    ELEMENT: (
      <GuardedWrapper>
        <FAQs />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.raiseSupport,
    ELEMENT: (
      <GuardedWrapper>
        <RaiseSupport />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.contactAdmin,
    ELEMENT: (
      <GuardedWrapper>
        <ContactAdmin />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminAgentForm,
    ELEMENT: (
      <GuardedWrapper>
        <AgentForm />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.inquiries,
    ELEMENT: (
      <GuardedWrapper>
        <Inquiries />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.newAdminEvents,
    ELEMENT: (
      <GuardedWrapper>
        <Events />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.newAdminEventsForm,
    ELEMENT: (
      <GuardedWrapper>
        <EventsForm />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.newAdminEventInvites,
    ELEMENT: (
      <GuardedWrapper>
        <EventInvites />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminBlogs,
    ELEMENT: (
      <GuardedWrapper>
        <Blogs />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminBlogsFileMaintenance,
    ELEMENT: (
      <GuardedWrapper>
        <FileMaintenance />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminViewBlogs,
    ELEMENT: (
      <GuardedWrapper>
        <ViewBlogs />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminBlogForm,
    ELEMENT: (
      <GuardedWrapper>
        <BlogForm />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.adminBlogUsers,
    ELEMENT: (
      <GuardedWrapper>
        <ManageEditors />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.webinar,
    ELEMENT: (
      <GuardedWrapper>
        <Webinars />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.webinarSingle,
    ELEMENT: (
      <GuardedWrapper>
        <WebinarSingle />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.webinarAdminForm,
    ELEMENT: (
      <GuardedWrapper>
        <WebinarForm />
      </GuardedWrapper>
    ),
  },
];
