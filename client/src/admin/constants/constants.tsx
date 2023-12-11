import AgentForm from "admin/pages/Agents/AgentForm";
import AgentProfile from "admin/pages/Agents/LandingPages/ActiveAgents/AgentProfile";
import AgentRequest from "admin/pages/Agents/LandingPages/AgentRequests/AgentRequest";
import AgentRequestProfile from "admin/pages/Agents/LandingPages/AgentRequests/AgentRequestProfile";
import DeactivatedAgentProfile from "admin/pages/Agents/LandingPages/DeactivatedAgents/DeactivatedAgentProfile";
import DeactivatedAgents from "admin/pages/Agents/LandingPages/DeactivatedAgents/DeactivatedAgents";
import DeclinedAgentProfile from "admin/pages/Agents/LandingPages/DeclinedAgents/DeclinedAgentProfile";
import DeclinedAgents from "admin/pages/Agents/LandingPages/DeclinedAgents/DeclinedAgents";
import Appointments from "admin/pages/Appointments/Appointments";
import AgentAppointments from "admin/pages/Appointments/LandingPages/AgentAppointments/AgentAppointments";
import AppointmentInformation from "admin/pages/Appointments/LandingPages/ScheduledAppointment/AppointmentInformation";
import ScheduleAppointment from "admin/pages/Appointments/LandingPages/ScheduledAppointment/ScheduleAppointment";
import Blogs from "admin/pages/Blogs/Blogs";
import BlogForm from "admin/pages/Blogs/component/BlogForm";
import Calendar from "admin/pages/Calendar/Calendar";
import ContactAdmin from "admin/pages/ContactAdmin/ContactAdmin";
import Contacts from "admin/pages/Contacts/Contacts";
import EventInvites from "admin/pages/EventInvites/EventInvites";
import Events from "admin/pages/Events/Events";
import FAQSubscriber from "admin/pages/FAQSubscriber/FAQSubscriber";
import Webinars from "admin/pages/FileMaintenance/pages/Webinars/Webinars";
import WebinarSingle from "admin/pages/FileMaintenance/pages/Webinars/WebinarSingle";
import Inquiries from "admin/pages/Inquiries/Inquiries";
import Login from "admin/pages/Login/Login";
import Notifications from "admin/pages/Notifications/Notifications";
import RaiseSupport from "admin/pages/RaiseSupport/RaiseSupport";
import Settings from "admin/pages/Settings/Settings";
import UserProfile from "admin/pages/UserProfile/UserProfile";
import CFSWebinars from "admin/pages/Webinars/LandingPages/CFSWebinars";
import ActivatedWebinars from "admin/pages/Webinars/LandingPages/ActivatedWebinars";
import RequestedWebinars from "admin/pages/Webinars/LandingPages/RequestedWebinars";
import DynamicWebinarInformation from "admin/pages/Webinars/LandingPages/WebinarSingle/DynamicWebinarInformation";
import GuardedWrapper from "../layouts/GuardedWrapper";
import AdminAgentWrapper from "../../library/AdminAgentWrapper/AdminAgentWrapper";
import Agents from "../pages/Agents/LandingPages/ActiveAgents/Agents";
import Dashboard from "../pages/Dashboard/Dashboard";
import adminPathsNew from "./routes";
import AdminWebinars from "admin/pages/Webinars/LandingPages/AdminWebinars";
import LandingPage from "admin/pages/LandingPage/LandingPage";
import LandingPageInfo from "admin/pages/LandingPage/LandingPageInfo";
import ProfileForm from "admin/pages/Profile/components/ProfileForm/ProfileForm";
import ProfileSettings from "admin/pages/Profile/components/ProfileSettings/ProfileSettings";
import WebinarForm from "admin/pages/FileMaintenance/pages/Webinars/WebinarForm";
import Users from "admin/pages/Users/Users";
import ViewBlog from "admin/pages/Blogs/ViewBlog";
import CommissionSimulation from "admin/pages/CommissionSimulation/CommissionSimulation";
import MailingList from "admin/pages/MailingList/MailingList";
import ProfileFormAdd from "admin/pages/Profile/components/ProfileForm/ProfileFormAdd";
import Licensing from "admin/pages/Licensing/Licensing";
import ContractForm from "admin/ContractSignForm/ContractForm";
import EmailMarketing from "admin/pages/EmailMarketing/EmailMarketing";
import MailLibraryForm from "admin/pages/MailingLibrary/MailLibraryForm";
import EmailProTemplate from "admin/pages/MailingLibrary/MailingLibrary";
import AgentSubscribers from "admin/pages/Subscribers/AgentSubscribers";
import Merchandises from "admin/pages/Merchandises/Merchandises";
import MerchandiseForm from "admin/pages/Merchandises/MerchandiseForm";
import ShareableEmails from "admin/pages/ShareableEmails/ShareableEmails";
import RewardsHistory from "admin/pages/RewardsHistory/RewardsHistory";
import RaiseSupportTicket from "admin/pages/RaiseSupport/Admin/single-page/RaiseSupportTicket";
import OrderHistory from "admin/pages/OrderHistory/OrderHistory";
import TrialSubscription from "admin/pages/TrialSubscription/TrialSubscription";
import EventsForm from "admin/pages/Events/components/Form/EventsForm";
import RSVPLanding from "admin/pages/EventsRSVP/RSVPLanding";
import SubscriptionGuard from "library/SubscriptionGuard/SubscriptionGuard";
import TreeDiagram from "admin/pages/TreeDiagram/TreeDiagram";

export const ROLES = {
  ROLE_AGENT: "ROLE_AGENT",
  ROLE_EDITOR: "ROLE_EDITOR",
  ROLE_MASTER_ADMIN: "ROLE_MASTER_ADMIN",
  ROLE_SUBSCRIBER: "ROLE_SUBSCRIBER",
};

export const OUTSOURCE_LINKS = {
  AGENCY_ROCKET: "https://agencyrocket.com/",
  BACK_OFFICE: "https://agent.comfortfinancialsolutions.com",
};

export const MAIN_WEBSITE_LINK = [
  "https://www.comfortfinancialsolutions.com/",
  "https://www.gocfs.pro/",
];

export const SCHEDULE_TYPES = {
  WEBINAR: "WEBINAR",
  PAW: "PAW",
};

export const DEFAULT_IMAGE = "/assets/others/no-image.png";

export const APPOINTMENT_STATUSES = {
  CANCELLED: "CANCELLED",
  ACTIVE: "ACTIVE",
  ONGOING: "ONGOING",
};

export const STATUS = {
  UNSUBSCRIBED: "UNSUBSCRIBED",
  ACTIVATED: "ACTIVATED",
  DEACTIVATED: "DEACTIVATED",
};

export const POSITIONS = [
  {
    value: "POSITION_AGENT",
    label: "Agent",
  },
  {
    value: "POSITION_EDITOR",
    label: "Editor",
  },
  {
    value: "POSITION_CONTENT_CREATOR",
    label: "Content Creator",
  },
];

export const AGENT_ROLES = [
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
export const EDITOR_ROLES = [
  {
    value: "ROLE_EDITOR_BLOGS",
    label: "Blogs",
  },
  {
    value: "ROLE_EDITOR_EMAIL_TEMPLATES",
    label: "Email Templates",
  },
];
export const CONTENT_CREATOR_ROLES = [
  {
    value: "ROLE_CONTENT_CREATOR_BLOGS",
    label: "Blogs",
  },
  {
    value: "ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES",
    label: "Email Templates",
  },
];

export const EMAIL_TEMPLATES_CATEGORIES = [
  {
    keyword: "Phase 1",
    value: "PHASE_1",
    label: "Phase 1",
  },
  {
    keyword: "Phase 2",
    value: "PHASE_2",
    label: "Phase 2",
  },
];

export const adminRoutes = [
  {
    path: adminPathsNew.login,
    element: <Login />,
  },
  {
    path: adminPathsNew.loginWithParams,
    element: <Login />,
  },
  {
    path: adminPathsNew.agents,
    element: (
      <GuardedWrapper>
        <Agents />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.agentRequests,
    element: (
      <GuardedWrapper>
        <AgentRequest />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.declinedAgents,
    element: (
      <GuardedWrapper>
        <DeclinedAgents />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.deactivatedAgents,
    element: (
      <GuardedWrapper>
        <DeactivatedAgents />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.adminAgentRequestProfile,
    element: (
      <GuardedWrapper>
        <AgentRequestProfile />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.adminAgentProfile,
    element: (
      <GuardedWrapper>
        <AgentProfile />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.profile,
    element: (
      <GuardedWrapper>
        <UserProfile />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.profileForm,
    element: (
      <GuardedWrapper>
        <ProfileForm key="form" />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.profileFormAdd,
    element: (
      <GuardedWrapper>
        <ProfileFormAdd />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.profileFormWithProfileId,
    element: (
      <GuardedWrapper>
        <ProfileForm key="form-id" />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.adminDeclinedAgentProfile,
    element: (
      <GuardedWrapper>
        <DeclinedAgentProfile />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.adminDeactivatedAgentProfile,
    element: (
      <GuardedWrapper>
        <DeactivatedAgentProfile />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.dashboard,
    element: (
      <GuardedWrapper>
        <Dashboard />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.appointments,
    element: (
      <GuardedWrapper>
        <Appointments />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.typeAppointments,
    element: (
      <GuardedWrapper>
        <Appointments />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.agentAppointments,
    element: (
      <GuardedWrapper>
        <AgentAppointments />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.appointmentInformation,
    element: (
      <GuardedWrapper>
        <AppointmentInformation />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.scheduledAppointments,
    element: (
      <GuardedWrapper>
        <ScheduleAppointment />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.calendar,
    element: (
      <GuardedWrapper>
        <Calendar />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.contacts,
    element: (
      <GuardedWrapper>
        <Contacts />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.settings,
    element: (
      <GuardedWrapper>
        <Settings />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.profileSettings,
    element: (
      <GuardedWrapper>
        <ProfileSettings />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.notifications,
    element: (
      <GuardedWrapper>
        <Notifications />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.faqs,
    element: (
      <GuardedWrapper>
        <FAQSubscriber />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.raiseSupport,
    element: (
      <GuardedWrapper>
        <RaiseSupport />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.raiseSupportTicket,
    element: (
      <GuardedWrapper>
        <RaiseSupportTicket />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.contactAdmin,
    element: (
      <GuardedWrapper>
        <ContactAdmin />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.adminAgentForm,
    element: (
      <GuardedWrapper>
        <AgentForm />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.inquiries,
    element: (
      <GuardedWrapper>
        <Inquiries />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.newAdminEvents,
    element: (
      <GuardedWrapper>
        <Events />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.newAdminEventsForm,
    element: (
      <GuardedWrapper>
        <EventsForm />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.newAdminEventInvites,
    element: (
      <GuardedWrapper>
        <EventInvites />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.adminBlogs,
    element: (
      <GuardedWrapper>
        <Blogs />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.adminViewBlogs,
    element: (
      <GuardedWrapper>
        <ViewBlog />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.adminBlogForm,
    element: (
      <GuardedWrapper>
        <BlogForm />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.webinar,
    element: (
      <GuardedWrapper>
        <Webinars />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.trialSubscription,
    element: (
      <GuardedWrapper>
        <SubscriptionGuard>
          <TrialSubscription />
        </SubscriptionGuard>
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.cfsWebinars,
    element: (
      <GuardedWrapper>
        <CFSWebinars />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.webinarAdminForm,
    element: (
      <GuardedWrapper>
        <WebinarForm />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.activatedWebinars,
    element: (
      <GuardedWrapper>
        <ActivatedWebinars />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.requestedWebinars,
    element: (
      <GuardedWrapper>
        <RequestedWebinars />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.allAgentWebinars,
    element: (
      <GuardedWrapper>
        <AdminWebinars />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.requestedWebinars,
    element: (
      <GuardedWrapper>
        <RequestedWebinars />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.viewSingleDynamicWebinar,
    element: (
      <GuardedWrapper>
        <DynamicWebinarInformation />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.webinarSingle,
    element: (
      <GuardedWrapper>
        <WebinarSingle />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.landingPage,
    element: (
      <GuardedWrapper>
        <LandingPage />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.landingPageInfo,
    element: (
      <GuardedWrapper>
        <LandingPageInfo />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.users,
    element: (
      <GuardedWrapper>
        <Users />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.licensing,
    element: (
      <GuardedWrapper>
        <Licensing />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.contracting,
    element: (
      <GuardedWrapper>
        <ContractForm />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.emailMarketing,
    element: (
      <GuardedWrapper>
        <EmailMarketing />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.emailMarketingWithGuid,
    element: (
      <GuardedWrapper>
        <EmailMarketing />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.mailingList,
    element: (
      <GuardedWrapper>
        <MailingList />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.mailLibrary,
    element: (
      <GuardedWrapper>
        <EmailProTemplate />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.mailLibraryForm,
    element: (
      <GuardedWrapper>
        <MailLibraryForm />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.myLeads,
    element: (
      <GuardedWrapper>
        <AgentSubscribers />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.myRewards,
    element: (
      <GuardedWrapper>
        <Merchandises />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.merchandiseForm,
    element: (
      <GuardedWrapper>
        <MerchandiseForm />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.shareableEmails,
    element: (
      <GuardedWrapper>
        <ShareableEmails />
      </GuardedWrapper>
    ),
  },
  {
    path: adminPathsNew.rewardsHistory,
    element: (
      <GuardedWrapper>
        <RewardsHistory />
      </GuardedWrapper>
    ),
  },
  {
    element: (
      <GuardedWrapper>
        <RSVPLanding />
      </GuardedWrapper>
    ),
    path: adminPathsNew.rsvpLanding,
  },
  {
    path: adminPathsNew.orderHistory,
    element: (
      <GuardedWrapper>
        <OrderHistory />
      </GuardedWrapper>
    ),
  },
];
