import Appointments from "AdminNew/pages/Appointments/Appointments";
import Calendar from "AdminNew/pages/Calendar/Calendar";
import ContactAdmin from "AdminNew/pages/ContactAdmin/ContactAdmin";
import Contacts from "AdminNew/pages/Contacts/Contacts";
import FAQs from "AdminNew/pages/FAQs/FAQs";
import Notifications from "AdminNew/pages/Notifications/Notifications";
import Profile from "AdminNew/pages/Profile/Profile";
import RaiseSupport from "AdminNew/pages/RaiseSupport/RaiseSupport";
import Settings from "AdminNew/pages/Settings/Settings";
import GuardedWrapper from "../layouts/GuardedWrapper";
import Agents from "../pages/Agents/Agents";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import adminPathsNew from "./routes";

export const ROLES = {
  ROLE_AGENT: "ROLE_AGENT",
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
    PATH: adminPathsNew.dashboard,
    ELEMENT: (
      <GuardedWrapper>
        <Dashboard />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.profile,
    ELEMENT: (
      <GuardedWrapper>
        <Profile />
      </GuardedWrapper>
    ),
  },
  {
    PATH: adminPathsNew.appointments,
    ELEMENT: (
      <GuardedWrapper>
        <Appointments />
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
];
