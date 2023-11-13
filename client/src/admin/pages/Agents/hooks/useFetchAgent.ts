import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import React, { useEffect, useState } from "react";

export type AgentData = {
  firstName?: string;
  lastName?: string;
  licenseNumber?: string;
  state?: string;
  _id: string;
  name: string;
  userGuid: string;
  avatar: string;
  title: string;
  bio: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  facebook: string;
  password: string;
  languages?: string[];
  role: string;
  roles: any;
  status: string;
  telNumber: string;
  webinars: string[];
  specialties?: string[];
  isDeclined: false;
  createdAt: string;
  updatedAt: string;
  testimonials?: string[];
  calendlyLink: string;
};
const useFetchAgent = (userGuid: string) => {
  const [agent, setAgent] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
    agent: agent,
    loading,
  };
};

export default useFetchAgent;
