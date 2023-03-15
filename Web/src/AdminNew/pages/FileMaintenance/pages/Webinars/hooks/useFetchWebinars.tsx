import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import React, { useEffect, useState } from "react";

export type WebinarValuesType = {
  title: string;
  webinarGuid?: string;
  introVideo: string;
  introVideoContent: string;
  introVideoTimeTracker: number;
  fullVideo: string;
  fullVideoContent: string;
  fullVideoTimeTracker: number;
  thumbnail: any;
  calendlyLink: string;
  _id?: string;
  noOfAppointments?: number;
};

const useFetchWebinars = (id?: string, isGuid?: boolean) => {
  const [webinars, setWebinars] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id?.toString() !== "add") {
      setLoading(true);
      const endpoint = id
        ? ENDPOINTS.WEBINAR_SINGLE.replace(":webinarId", id)
        : ENDPOINTS.WEBINARS;
      axios
        .get(`${endpoint}${isGuid ? "?isGuid=true" : ""}`)
        .then((response) => {
          setWebinars(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }

    return () => {
      setLoading(false);
      setWebinars([]);
    };
  }, [id]);

  return {
    webinars,
    loading,
  };
};

export default useFetchWebinars;
