import { Grid, Paper } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import "./Appointments.scss";
import AppointmentCards from "./components/AppointmentCards";
import useGetAppointments from "./hooks/useGetAppointments";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Appointments",
    url: paths.appointments,
    isActive: true,
  },
];

const Appointments: React.FC = () => {
  const { appointments, isLoading } = useGetAppointments();
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={isLoading}
      className="appointment-container"
    >
      <Title title="Appointments" subtitle="View all your appointments." />
      <Grid container spacing={2}>
        {appointments.map((appointment: any) => {
          return (
            <Grid item sm={6} md={3} lg={3} key={appointment.scheduling_url}>
              <Paper
                elevation={3}
                sx={{ p: 0, height: "100%" }}
                className="appointment-card"
                style={{ borderColor: appointment.color }}
              >
                <AppointmentCards
                  borderColor={appointment.color}
                  id={appointment.scheduling_url}
                  description={appointment.description_plain}
                  link={appointment.scheduling_url}
                  title={appointment.name}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default Appointments;
