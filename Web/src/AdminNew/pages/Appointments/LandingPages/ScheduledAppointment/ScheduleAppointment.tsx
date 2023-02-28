import { Grid } from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { CrumbTypes } from "AdminNew/pages/Dashboard/types";
import paths from "constants/routes";
import AppointmentList, {
  AppointmentListType,
} from "./components/AppointmentList";
import DashboardCard from "pages/Admin/pages/Dashboard/components/DashboardCard";
import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import Header from "./components/Header";

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
    title: "Scheduled Appointments",
    url: paths.schedulesAppointments,
    isActive: true,
  },
];
const ScheduleAppointment: React.FC = () => {
  const appointmentList: AppointmentListType[] = [
    {
      title: "Dave Spencer Bacay",
      date: new Date(),
      _id: "3223fd-b912-4ecc-8104-534432c9548c",
      status: "ACTIVE",
    },
    {
      title: "Dave Spencer Bacay",
      date: new Date(),
      _id: "ssdv213-b912-4ecc-8104-534432c9548c",
      status: "ONGOING",
    },
    {
      title: "Dave Spencer Bacay",
      date: new Date(),
      _id: "jhg2344-b912-4ecc-8104-534432c9548c",
      status: "CANCELLED",
    },
  ];
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Header
        title="Appointment Name"
        agent="Dave Spencer Bacay"
        appointmentId="123123-123123-123123"
        createdAt={new Date()}
        typeOfAppointment="Webinar"
        wayOfAppointment="Google Meet"
      />
      <Grid container spacing={2}>
        <Grid item sm={6} md={6} lg={9}>
          <AppointmentList appointment={appointmentList} />
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
