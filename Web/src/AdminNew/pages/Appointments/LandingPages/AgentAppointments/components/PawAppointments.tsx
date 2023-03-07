import { Grid } from "@mui/material";
import Spinner from "AdminNew/components/Spinner/Spinner";
import useGetScheduleAppointment from "AdminNew/pages/Appointments/hooks/useGetScheduleAppointment";
import React from "react";
import AppointmentList from "../../ScheduledAppointment/components/AppointmentList";

type PawAppointmentsProps = {
  agentGuid: string;
};
const PawAppointments: React.FC<PawAppointmentsProps> = (props) => {
  const { appointmentList, appointmentListLoading } = useGetScheduleAppointment(
    props.agentGuid ?? "",
    "PAW"
  );

  const filteredAppointmentList = appointmentList?.map((appointment) => {
    return {
      title: appointment.name,
      date: appointment.calendly_end_time.toString(),
      _id: appointment._id,
      status: appointment.calendly_status,
      meeting_link: appointment.meeting_link,
    };
  });

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} md={6} lg={12}>
        {appointmentListLoading ? (
          <Spinner />
        ) : (
          <AppointmentList
            appointment={
              filteredAppointmentList ?? [
                {
                  title: "",
                  date: "",
                  _id: "",
                  status: "",
                  meeting_link: "",
                },
              ]
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

export default PawAppointments;
