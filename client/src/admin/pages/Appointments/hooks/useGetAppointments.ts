import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import { useEffect, useState } from "react";

type AppointmentTypes = {
  _id: string;
  agentGuid: string;
  avatar: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  emailAddress: string;
  numberOfAppointments: number;
  title: string;
};

type FetchDataResult = {
  loading: boolean;
  appointments: AppointmentTypes[] | [];
};
const useGetAppointments = (appointment_type: string): FetchDataResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentTypes[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      let res = await axios({
        method: "get",
        url: `${ENDPOINTS.APPOINTMENT_AGENTS}?type=${
          appointment_type === "webinar"
            ? "WEBINAR"
            : appointment_type === "paw"
            ? "PAW"
            : ""
        }`,
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
      });

      setAppointments(res.data.data);
      setIsLoading(false);
    };

    fetchAppointments();
  }, [appointment_type]);

  return {
    appointments: appointments,
    loading: isLoading,
  };
};

export default useGetAppointments;
