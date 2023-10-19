import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React from "react";
import { paths } from "constants/routes";
import { CrumbTypes } from "../Dashboard/types";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Trial Subscription",
    url: paths.trialSubscription,
    isActive: true,
  },
];

const TrialSubscription = () => {
  return (
    <Wrapper
      className="webinar-admin-container"
      error={false}
      breadcrumb={crumbs}
      loading={false}
    >
      <Title
        title="Trial Subscription"
        subtitle="Displaying all active and expired subscriptions"
      />
      <NoInformationToDisplay
        showNoInfo={true}
        message="No trial subscription available."
        title="No Information to display."
      >
        <h2>Test</h2>
      </NoInformationToDisplay>
    </Wrapper>
  );
};

export default TrialSubscription;
