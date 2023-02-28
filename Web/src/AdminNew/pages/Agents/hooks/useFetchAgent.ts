import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import React, { useEffect, useState } from "react";

const useFetchAgent = (userGuid: string) => {
  const [agent, setAgent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(userGuid);
    axios
      .get(ENDPOINTS.AGENT_BY_ID.replace(":id", userGuid))
      .then((response) => {
        setAgent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [userGuid]);

  return {
    agent,
    loading,
  };
};

export default useFetchAgent;
