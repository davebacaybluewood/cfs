import agent from "admin/api/agent";
import { useEffect, useState } from "react";
import { SubscribersData } from "admin/models/subscriberModel";

const useFetchSubscribers = (userGuid: string, leadDrawerOpen?: boolean) => {
  const [loading, setLoading] = useState(false);
  const [subscribers, setSubscribers] = useState<
    SubscribersData[] | undefined
  >();

  useEffect(() => {
    const getData = async () => {
      const data = await agent.Points.getSubscribersByUserGuid(userGuid);
      setSubscribers(data?.subscribers);
      setLoading(false);
    };

    if (!leadDrawerOpen) {
      // setLoading(true);
      getData();
    }
  }, [userGuid, leadDrawerOpen]);

  return {
    loading,
    subscribers: subscribers,
    totalSubscribers: subscribers?.length,
    setSubscribers,
  };
};

export default useFetchSubscribers;
