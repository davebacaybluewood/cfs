import React from "react";

const components = {
  POSITION_AGENT: [
    "Appointments",
    "Appointments",
    "AgentAppointments",
    "AppointmentInformation",
    "ScheduleAppointment",
    "Calendar",
    "Contacts",
    "Settings",
    "Blogs",
    "ViewBlog",
    "BlogForm",
    "Webinars",
    "TrialSubscription",
    "CFSWebinars",
    "ActivatedWebinars",
    "RequestedWebinars",
    "AdminWebinars",
    "DynamicWebinarInformation",
    "WebinarSingle",
    "LandingPage",
    "LandingPageInfo",
    "Users",
    "Licensing",
    "ContractForm",
    "EmailMarketing",
    "AgentSubscribers",
    "Merchandises",
    "MerchandiseForm",
    "ShareableEmails",
    "RewardsHistory",
    "RSVPLanding",
  ],
  POSITION_MASTER_ADMIN: [
    "Appointments",
    "Appointments",
    "AgentAppointments",
    "AppointmentInformation",
    "ScheduleAppointment",
    "Calendar",
    "Contacts",
    "Settings",
    "Blogs",
    "ViewBlog",
    "BlogForm",
    "Webinars",
    "TrialSubscription",
    "CFSWebinars",
    "WebinarForm",
    "ActivatedWebinars",
    "RequestedWebinars",
    "AdminWebinars",
    "DynamicWebinarInformation",
    "WebinarSingle",
    "LandingPage",
    "LandingPageInfo",
    "Users",
    "Licensing",
    "ContractForm",
    "EmailMarketing",
    "AgentSubscribers",
    "Merchandises",
    "MerchandiseForm",
    "ShareableEmails",
    "RewardsHistory",
    "RSVPLanding",
  ],
  POSITION_SUBSCRIBER: [
    "Dashboard",
    "Profile",
    "Suubscribers",
    "Merchandises",
    "ShareableEmails",
    "Rewards History",
  ],
};

interface UserAccessProps {
  children: JSX.Element | React.ReactNode | any;
}

const UserAccessWrapper: React.FC<UserAccessProps> = (props) => {
  const { children } = props;

  const position = "POSITION_SUBSCRIBER";
  const childrenName = children.type.name;

  const hasAccess = components[position].includes(childrenName);

  if (!hasAccess) {
    return <p>No access</p>;
  }

  return children;
};

export default UserAccessWrapper;
