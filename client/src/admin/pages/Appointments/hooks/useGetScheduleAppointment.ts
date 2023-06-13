import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import { useEffect, useState } from "react";

type AppointmentListType = {
  _id: string;
  name: string;
  state: string;
  email: string;
  webinarGuid: string;
  agentGuid: string;
  calendly_start_time: Date;
  calendly_end_time: Date;
  calendly_timezone: String;
  calendly_status: string;
  calendly_uri: string;
  calendly_name: string;
  calendly_email: string;
  calendly_created_at: Date;
  appointment_type: string;
  createdAt: string;
  updatedAt: string;
  meeting_link: string;
  __v: string;
};
const useGetScheduleAppointment = (agentGuid: string, webinarGuid?: string) => {
  const [appointmentList, setAppointmentList] =
    useState<AppointmentListType[]>();
  const [appointmentListLoading, setAppointmentListLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setAppointmentListLoading(true);
      let res = await axios({
        method: "get",
        url: ENDPOINTS.APPOINTMENT_AGENTS_SCHEDULED_APPOINTMENTS.replace(
          ":agentGuid",
          agentGuid ?? ""
        ).replace(":webinarGuid", webinarGuid ?? ""),
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
      });

      setAppointmentList(res.data);
      setAppointmentListLoading(false);
    };

    fetchAppointments();
  }, [webinarGuid, agentGuid]);

  return {
    appointmentList,
    appointmentListLoading,
  };
};

export default useGetScheduleAppointment;
