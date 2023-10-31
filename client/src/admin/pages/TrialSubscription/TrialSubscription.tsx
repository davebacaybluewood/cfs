import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import { CrumbTypes } from "../Dashboard/types";
import TrialSubscriptionTable from "./TrialSubscriptionTable";
import DocumentTitleSetter from "../../../library/DocumentTitleSetter/DocumentTitleSetter";
import { useState, useEffect } from "react";
import agent from "admin/api/agent";

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

export type TrialSubscriptionProps = {
  dateCreated: string;
  daysRemaining: number;
  emailAddress: string;
  firstName: string;
  lastName: string;
  userGuid: string;
  _id: string;
  expirationDate: string;
};

const TrialSubscription = () => {
  const [subscriptions, setSubscriptions] = useState<TrialSubscriptionProps[]>(
    []
  );
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<
    TrialSubscriptionProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  // fetch data
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await agent.TrialSubscription.getTrialSubscriptions();
        // check if res is array. otherwise, it returns error that says that res might be string.
        if (Array.isArray(res)) {
          setFilteredSubscriptions(res);
          setSubscriptions(res);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);
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
      <TrialSubscriptionTable
        subscriptions={subscriptions}
        filteredSubscriptions={filteredSubscriptions}
        setFilteredSubscriptions={setFilteredSubscriptions}
        loading={loading}
      />
    </Wrapper>
  );
};

export default TrialSubscription;