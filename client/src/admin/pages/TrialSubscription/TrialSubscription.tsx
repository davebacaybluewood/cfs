import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import { paths } from "constants/routes";
import { CrumbTypes } from "../Dashboard/types";
import TrialSubscriptionTable from "./TrialSubscriptionTable";
import { data } from "./TestData";
import DocumentTitleSetter from "./DocumentTitleSetter";

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
      {/* Sets document title */}
      <DocumentTitleSetter title="Portal Free Subscriptions - CFS Portal" />
      <Title
        title="Trial Subscription"
        subtitle="Displaying all active and expired subscriptions"
      />
      <NoInformationToDisplay
        showNoInfo={data.length === 0}
        message="No trial subscription available."
        title="No Information to display."
      >
        <TrialSubscriptionTable data={data} />
      </NoInformationToDisplay>
    </Wrapper>
  );
};

export default TrialSubscription;
