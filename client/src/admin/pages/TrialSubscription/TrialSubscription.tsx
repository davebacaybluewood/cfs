import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import { CrumbTypes } from "../Dashboard/types";
import TrialSubscriptionTable from "./TrialSubscriptionTable";
import DocumentTitleSetter from "../../../library/DocumentTitleSetter/DocumentTitleSetter";
import { useState, useEffect } from "react";
import agent from "admin/api/agent";
import SubscriptionTableLoading from "./SubscriptionTableLoading";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "30-Day Free Trial Subscriptions",
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
    <Wrapper error={false} breadcrumb={crumbs} loading={false}>
      <DocumentTitleSetter title="30-Day Free Trial Subscriptions | CFS Portal" />
      <Title
        title="30-Day Free Trial Subscriptions"
        subtitle="All active and expired subscriptions"
      />
      {loading ? (
        <SubscriptionTableLoading />
      ) : (
        <TrialSubscriptionTable
          subscriptions={subscriptions}
          filteredSubscriptions={filteredSubscriptions}
          setFilteredSubscriptions={setFilteredSubscriptions}
        />
      )}
    </Wrapper>
  );
};

export default TrialSubscription;
