import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import React, { useEffect, useState } from "react";

const useFetchAgent = (userGuid: string) => {
  const [agent, setAgent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        ENDPOINTS.AGENT_BY_ID.replace(
          ":id",
          "86888bcd-bc70-4ad3-a83b-9be75583700e"
        )
      )
      .then((response) => {
        setAgent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return {
    agent,
    loading,
  };
};

export default useFetchAgent;
