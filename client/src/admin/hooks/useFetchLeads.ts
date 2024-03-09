import agent from "admin/api/agent";
import { useEffect, useState } from "react";
import { SubscriberMainData } from "admin/models/subscriberModel";

const useFetchLeads = (userGuid: string) => {
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<SubscriberMainData>();

  useEffect(() => {
    const fetchLeads = () => {
      if (!userGuid) return;

      setLoading(true);
      agent.Points.getSubscribersByUserGuid(userGuid)
        .then((res) => {
          setLeads(res);
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    };

    if (userGuid) fetchLeads();
  }, [userGuid]);

  return {
    loading: loading,
    leads: leads?.subscribers,
    totalSubscribers: leads?.totalSubscribers,
  };
};

export default useFetchLeads;
