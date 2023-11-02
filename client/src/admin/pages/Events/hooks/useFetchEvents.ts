import agent from "admin/api/agent";
import Event from "admin/models/eventModel";
import { useEffect, useState } from "react";

const useFetchEvents = (userGuid: string) => {
  const [loading, setLoading] = useState(false);
  const [eventRows, setEventRows] = useState<Event[] | undefined>();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await agent.Events.getEvents(userGuid);
      setEventRows(data);
      setLoading(false);
    };

    getData();
  }, [userGuid]);

  return {
    eventRows,
    loading,
  };
};

export default useFetchEvents;
