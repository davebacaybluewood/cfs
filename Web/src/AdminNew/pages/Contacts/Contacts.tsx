import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import "./Contacts.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Contacts",
    url: paths.contacts,
    isActive: true,
  },
];

const Contacts: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      Contacts
    </Wrapper>
  );
};

export default Contacts;
