import { Grid } from "@mui/material";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { SCHEDULE_TYPES } from "admin/constants/constants";
import useFetchAgent from "admin/pages/Agents/hooks/useFetchAgent";
import DashboardCard from "admin/pages/Dashboard/components/DashboardCard/DashboardCard";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import capitalizeText from "helpers/capitalizeText";
import { formatISODateOnly } from "helpers/dateFormatter";
import React from "react";
import { FaCalendarAlt, FaCalendarDay, FaCalendarWeek } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Header, {
  HeaderLabeledValueProps,
} from "../ScheduledAppointment/components/Header";
import "./AgentAppointments.scss";
import PawAppointments from "./components/PawAppointments";
import WebinarAppointments from "./components/WebinarAppointments";
import { paths } from "constants/routes";

const AgentAppointments: React.FC = () => {
  const { agentId, typeId } = useParams();
  const { agent } = useFetchAgent(agentId ?? "");

  const headerCols: HeaderLabeledValueProps[] = [
    {
      label: "Agent ID",
      value: agent?.userGuid ?? "",
    },
    {
      label: "Title",
      value: agent?.title ?? "",
    },
    {
      label: "Account Created",
      value: formatISODateOnly(agent?.createdAt ?? "") ?? "",
    },
    {
      label: "Agent Name",
      value: agent?.name ?? "",
    },
    {
      label: "Phone Number",
      value: agent?.phoneNumber ?? "",
    },
    {
      label: "Email Address",
      value: agent?.emailAddress ?? "",
    },
    {
      label: "Status",
      value: capitalizeText(agent?.status ?? "") ?? "",
    },
  ];

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Appointments",
      url: paths.appointments,
      isActive: false,
    },
    {
      title:
        typeId?.toLowerCase() === SCHEDULE_TYPES.PAW.toLowerCase()
          ? "PAW Appointments"
          : "Webinar Appointments",
      url: paths.appointments,
      isActive: true,
    },
  ];

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Header title={agent?.name?.toString() ?? ""} cols={headerCols} />
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} lg={9}>
          {typeId === SCHEDULE_TYPES.WEBINAR.toLowerCase() ? (
            <WebinarAppointments
              agentGuid={agentId ?? ""}
              webinarGuids={agent?.webinars ?? []}
            />
          ) : (
            <PawAppointments agentGuid={agent?.userGuid ?? ""} />
          )}
        </Grid>
        <Grid item sm={6} md={6} lg={3}>
          <Grid spacing={2} container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="All Appointments"
                url={paths.adminEventInvites}
                icon={<FaCalendarAlt />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="Webinar Appointments"
                url={paths.adminEventInvites}
                icon={<FaCalendarDay />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="PAW Appointments"
                url={paths.adminEventInvites}
                icon={<FaCalendarWeek />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="Active Appointments"
                url={paths.adminEventInvites}
                icon={<FaCalendarWeek />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="Ongoing Appointments"
                url={paths.adminEventInvites}
                icon={<FaCalendarWeek />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DashboardCard
                count={2}
                countText="Cancelled Appointments"
                url={paths.adminEventInvites}
                icon={<FaCalendarWeek />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default AgentAppointments;
