import { Grid } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import adminPathsNew from "AdminNew/constants/routes";
import paths from "constants/routes";
import url_params from "helpers/url_params";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CrumbTypes } from "../Dashboard/types";
import "./Appointments.scss";
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
  const navigate = useNavigate();
  const { typeId } = useParams();
  const { appointments, loading } = useGetAppointments(typeId ?? "");

  const cardClickHandler = (agentId: string) => {
    navigate({
      pathname: adminPathsNew.agentAppointments
        .replace(":agentId", agentId ?? "")
        .replace(":typeId", typeId ?? ""),
    });
  };

  const pageTitle = typeId === "webinar" ? "Webinar" : "Personal Website";

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={loading}
      className="appointment-container"
    >
      <Title
        title={pageTitle + " Appointments"}
        subtitle="View all appointments."
      />
      <NoInformationToDisplay
        showNoInfo={appointments?.length === 0}
        title="No Information to display."
        message="There's no current appointment."
      >
        <Grid container spacing={2}>
          {appointments.map((appointment) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                onClick={() => cardClickHandler(appointment.agentGuid)}
              >
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
      </NoInformationToDisplay>
    </Wrapper>
  );
};

export default Appointments;
