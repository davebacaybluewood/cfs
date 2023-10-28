import agent from "admin/api/agent";
import Event from "admin/models/eventModel";
import { formatISODateOnly } from "helpers/dateFormatter";
import { useEffect, useState } from "react";
import { string } from "yup";

const useFetchEvents = (role: string) => {
  const [loading, setLoading] = useState(false);
  const [eventRows, setEventRows] = useState<Event[]>([]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await agent.Events.getByRole(role);
      setEventRows(data);
      setLoading(false);
    };

    getData();
  }, [role]);

  return {
    eventRows,
    loading,
  };
};

export default useFetchEvents;
