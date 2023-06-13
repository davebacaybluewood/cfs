import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import { useEffect, useState } from "react";

type AppointmentInformation = {
  _id: string;
  name: string;
  state: string;
  email: string;
  webinarGuid: string;
  agentGuid: string;
  calendly_start_time: string;
  calendly_end_time: string;
  calendly_timezone: string;
  calendly_status: string;
  calendly_uri: string;
  calendly_name: string;
  calendly_email: string;
  calendly_created_at: string;
  appointment_type: string;
  createdAt: string;
  updatedAt: string;
  calendly_notes: string;
  meeting_link: string;
  __v: number;
};

export type AppointmentData = {
  loading: boolean;
  appointmentInfo: AppointmentInformation | undefined;
};
const useGetAppointmentInformation = (
  appointmentId: string
): AppointmentData => {
  const [appointmentInfo, setAppointmentInfo] =
    useState<AppointmentInformation>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);

      let res = await axios({
        method: "get",
        url: ENDPOINTS.APPOINTMENT_SINGLE.replace(
          ":appointmentId",
          appointmentId ?? ""
        ),
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
      });

      setAppointmentInfo(res.data);
      setLoading(false);
    };

    fetchAppointment();
  }, [appointmentId]);

  return {
    appointmentInfo,
    loading,
  };
};

export default useGetAppointmentInformation;
