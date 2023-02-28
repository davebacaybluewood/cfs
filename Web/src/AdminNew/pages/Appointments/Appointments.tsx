import { Grid, Paper } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import paths from "constants/routes";
import getUserToken from "helpers/getUserToken";
import React, { useEffect, useState } from "react";
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

export const APPOINTMENT_STATUS = {
  ONGOING: "ONGOING",
  ACTIVE: "ACTIVE",
  CANCELLED: "CANCELLED",
};

const Appointments: React.FC = () => {
  // const { appointments, isLoading } = useGetAppointments();
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      let res = await axios({
        method: "get",
        url: ENDPOINTS.APPOINTMENT_AGENTS,
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
      });

      console.log(res.data.data);

      setAppointments(res.data.data);
      setIsLoading(false);
    };

    fetchAppointments();
  }, []);

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
            <Grid item xs={12} sm={6} md={3}>
              <div className="item">
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={12} md={7}>
                    <div className="card-captions">
                      <h5>{appointment.title}</h5>
                      <h1>{appointment.name}</h1>
                      <p>
                        Number of appointment:{" "}
                        {appointment.numberOfAppointments}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <div className="card-image">
                      <img src={appointment.avatar} className="agent-img" />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default Appointments;
