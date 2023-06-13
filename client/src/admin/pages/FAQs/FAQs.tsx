import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import "./FAQs.scss";
import Indicator from "admin/components/Indicator/Indicator";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "FAQs",
    url: paths.faqs,
    isActive: true,
  },
];

const FAQs: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Indicator />
    </Wrapper>
  );
};

export default FAQs;
