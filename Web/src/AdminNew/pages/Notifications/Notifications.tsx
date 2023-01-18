import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import Indicator from "pages/Admin/components/Indicator/Indicator";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import "./Notifications.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Notifications",
    url: paths.notifications,
    isActive: true,
  },
];

const Notifications: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Indicator />
    </Wrapper>
  );
};

export default Notifications;
