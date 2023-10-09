import agent from "admin/api/agent";
import { useEffect, useState } from "react";
import { SubscriberMainData } from "admin/models/subscriberModel";

const useFetchSubscribers = (userGuid: string) => {
  const [loading, setLoading] = useState(false);
  const [subscribers, setSubscribers] = useState<
    SubscriberMainData | undefined
  >();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await agent.Points.getSubscribersByUserGuid(userGuid);
      setSubscribers(data);
      setLoading(false);
    };

    getData();
  }, [userGuid]);

  return {
    loading,
    subscribers: subscribers?.subscribers,
    totalSubscribers: subscribers?.totalSubscribers,
  };
};

export default useFetchSubscribers;
