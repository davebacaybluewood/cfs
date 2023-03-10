import { Grid } from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { CrumbTypes } from "AdminNew/pages/Dashboard/types";
import paths from "constants/routes";
import AppointmentList from "./components/AppointmentList";
import DashboardCard from "pages/Admin/pages/Dashboard/components/DashboardCard";
import React, { useEffect, useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import Header from "./components/Header";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { useParams } from "react-router-dom";
import getUserToken from "helpers/getUserToken";
import Spinner from "AdminNew/components/Spinner/Spinner";
import useGetScheduleAppointment from "../../hooks/useGetScheduleAppointment";
import useFetchWebinars from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import useFetchAgent from "AdminNew/pages/Agents/hooks/useFetchAgent";
import { formatISODateOnly } from "helpers/dateFormatter";

const ScheduleAppointment: React.FC = () => {
  const { agentGuid, webinarGuid } = useParams();
  const { webinars } = useFetchWebinars(webinarGuid, true);
  const { appointmentList, appointmentListLoading } = useGetScheduleAppointment(
    agentGuid ?? "",
    webinarGuid ?? ""
  );
  const { agent } = useFetchAgent(agentGuid ?? "");

  const filteredAppointmentList = appointmentList?.map((appointment) => {
    return {
      title: appointment.name,
      date: appointment.calendly_end_time.toString(),
      _id: appointment._id,
      status: appointment.calendly_status,
      meeting_link: appointment.meeting_link,
    };
  });

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
    {
      title: "Webinar Appointments",
      url: paths.scheduledAppointments,
      isActive: false,
    },
    {
      title: webinars[0]?.title,
      url: paths.scheduledAppointments,
      isActive: true,
    },
  ];

  const headerCols = [
    {
      label: "Title",
      value: webinars[0]?.title,
    },
    {
      label: "Webinar ID",
      value: webinars[0]?.webinarGuid,
    },
    {
      label: "Webinar Created",
      value: formatISODateOnly(webinars[0]?.createdAt),
    },
    {
      label: "Agent",
      value: agent?.name,
    },
    {
      label: "Agent ID",
      value: agent?.userGuid,
    },
  ];

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Header title={webinars[0]?.title} cols={headerCols} />
      <Grid container spacing={2}>
        <Grid item sm={6} md={6} lg={9}>
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
        <Grid item sm={6} md={6} lg={3}>
          <Grid spacing={2} container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="Schedule Appointments"
                url={paths.adminEventInvites}
                icon={<FaEnvelopeOpenText />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="Today Appointments"
                url={paths.adminEventInvites}
                icon={<FaEnvelopeOpenText />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="Ongoing Appointments"
                url={paths.adminEventInvites}
                icon={<FaEnvelopeOpenText />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="Active Appointments"
                url={paths.adminEventInvites}
                icon={<FaEnvelopeOpenText />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="Pending Appointments"
                url={paths.adminEventInvites}
                icon={<FaEnvelopeOpenText />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

DashboardCard.defaultProps = {
  linkLabel: "View All",
};

export default ScheduleAppointment;
