import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import Indicator from "pages/Admin/components/Indicator/Indicator";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import "./ContactAdmin.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Contact Admin",
    url: paths.contactAdmin,
    isActive: true,
  },
];

const ContactAdmin: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Indicator />
    </Wrapper>
  );
};

export default ContactAdmin;
