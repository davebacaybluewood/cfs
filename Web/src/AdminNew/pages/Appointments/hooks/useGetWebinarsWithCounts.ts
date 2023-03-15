import { WebinarValuesType } from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import { useEffect, useState } from "react";

type WebinarPreview = Pick<
  WebinarValuesType,
  "_id" | "title" | "noOfAppointments" | "webinarGuid"
>;
const useGetWebinarsWithCounts = (agentGuid?: string) => {
  const [webinars, setWebinars] = useState<WebinarPreview[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getWebinars = async () => {
      const response = await fetch(
        ENDPOINTS.WEBINAR_APPOINTMENT_AGENTS_COUNT.replace(
          ":agentId",
          agentGuid ?? ""
        ),
        {
          headers: {
            Authorization: "Bearer " + getUserToken(),
          },
        }
      );

      const data = await response.json();

      setWebinars(data);
      setLoading(false);
    };

    getWebinars();
  }, [agentGuid]);

  return {
    webinars,
    loading,
  };
};

export default useGetWebinarsWithCounts;
