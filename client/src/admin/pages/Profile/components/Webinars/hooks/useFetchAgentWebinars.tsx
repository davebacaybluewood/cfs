import { WebinarValuesType } from "admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import ENDPOINTS from "constants/endpoints";
import { useEffect, useState } from "react";

const useFetchAgentWebinars = (webinarGuids: string[] | undefined) => {
  const [webinars, setWebinars] = useState<WebinarValuesType[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setWebinars([]);
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    const getActiveWebinars = async () => {
      const req = await fetch(ENDPOINTS.AGENT_WEBINARS, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          webinarGuids: webinarGuids,
        }),
      });

      const response = await req.json();
      setWebinars(response);
      setLoading(false);
    };

    getActiveWebinars();

    return () => {
      setWebinars([]);
      setLoading(true);
    };
  }, [webinarGuids]);

  return {
    webinars,
    loading,
  };
};

export default useFetchAgentWebinars;
