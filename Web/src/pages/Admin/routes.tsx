import paths from "constants/routes";
import EventInvites from "./pages/EventInvites/EventInvites";
import GuardedWrapper from "./components/GuardedWrapper";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Calendar from "./pages/Calendar/Calendar";
import Graphs from "./pages/Graphs/Graphs";
import Services from "./pages/Services/Services";
import AdminAccounts from "./pages/AdminAccounts/AdminAccounts";
import Events from "./pages/Events/Events";
import Inquiries from "./pages/Inquiries/Inquiries";
import Contacts from "./pages/Contacts/Contacts";
import EventsForm from "./pages/Events/EventsForm";
import AdminAccountsForm from "./pages/AdminAccounts/AdminAccountsForm";

const adminRoutes = [
  {
    PATH: paths.login,
    ELEMENT: <Login />,
  },
  {
    PATH: paths.adminDashboard,
    ELEMENT: (
      <GuardedWrapper>
        <Dashboard />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminEventInvites,
    ELEMENT: (
      <GuardedWrapper>
        <EventInvites />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminCalendar,
    ELEMENT: (
      <GuardedWrapper>
        <Calendar />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminGraphs,
    ELEMENT: (
      <GuardedWrapper>
        <Graphs />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminServices,
    ELEMENT: (
      <GuardedWrapper>
        <Services />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminAccounts,
    ELEMENT: (
      <GuardedWrapper>
        <AdminAccounts />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminAccountsForm,
    ELEMENT: (
      <GuardedWrapper>
        <AdminAccountsForm />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminContacts,
    ELEMENT: (
      <GuardedWrapper>
        <Contacts />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminEvents,
    ELEMENT: (
      <GuardedWrapper>
        <Events />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminEventsForm,
    ELEMENT: (
      <GuardedWrapper>
        <EventsForm />
      </GuardedWrapper>
    ),
  },
  {
    PATH: paths.adminInquiries,
    ELEMENT: (
      <GuardedWrapper>
        <Inquiries />
      </GuardedWrapper>
    ),
  },
];

export default adminRoutes;
