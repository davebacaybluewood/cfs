import { Grid, Paper } from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { CrumbTypes } from "AdminNew/pages/Dashboard/types";
import paths from "constants/routes";
import DashboardCard from "pages/Admin/pages/Dashboard/components/DashboardCard";
import React from "react";
import Header from "./components/Header";
import "./AppointmentInformation.scss";
import Calendar from "AdminNew/pages/Dashboard/components/Calendar/Calendar";
import LabeledValue from "library/LabeledValue/LabeledValue";
import {
  FaCalendarAlt,
  FaClock,
  FaGlobeEurope,
  FaLink,
  FaRegClock,
  FaRegEnvelope,
  FaRegStickyNote,
  FaUserAlt,
} from "react-icons/fa";
import { formatISODateOnly } from "helpers/dateFormatter";
import Circle from "library/Icons/Circle";

const AppointmentInformation: React.FC = () => {
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
    {
      title: "Appointment Name",
      url: paths.schedulesAppointments,
      isActive: true,
    },
  ];

  const invisibleObj = {
    title: "",
    value: "",
    icon: "",
    cols: {
      sm: 6,
      md: 6,
      lg: 3,
    },
  };

  const appointmentCols = [
    {
      title: "Name",
      value: "Dave Spencer Bacay",
      icon: <FaUserAlt />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Email Address",
      value: "spencerbacay@testdata.com",
      icon: <FaUserAlt />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Date Created",
      value: formatISODateOnly(new Date().toString()),
      icon: <FaCalendarAlt />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    invisibleObj,
    {
      title: "Appointment Date",
      value: formatISODateOnly(new Date().toString()),
      icon: <FaCalendarAlt />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Appointment Start Time",
      value: formatISODateOnly(new Date().toString()),
      icon: <FaClock />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Appointment End Time",
      value: formatISODateOnly(new Date().toString()),
      icon: <FaRegClock />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Timezone",
      value: "Asia/Manila",
      icon: <FaGlobeEurope />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Appointment Status",
      value: "Active",
      icon: <Circle variant="success" />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Appointment Link",
      value: "https://calendly.com",
      icon: <FaLink />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    invisibleObj,
    invisibleObj,
    {
      title: "Appointment Note",
      value: "This is a note",
      icon: <FaRegStickyNote />,
      cols: {
        sm: 12,
        md: 12,
        lg: 12,
      },
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
      <div className="appointment-container">
        <Grid container spacing={2}>
          <Grid item sm={12} lg={12}>
            <div className="appointment-information">
              <Grid container spacing={2}>
                {appointmentCols.map((col, index) => {
                  return (
                    <Grid
                      item
                      sm={col.cols.sm}
                      md={col.cols.md}
                      lg={col.cols.lg}
                      marginBottom={index < 9 ? 3 : 0}
                    >
                      <LabeledValue
                        title={col.title}
                        icon={col.icon}
                        subTitle={col.value}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </Grid>
          <Grid item sm={12} lg={12}>
            <div className="appointment-information">
              <Calendar />
            </div>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};

DashboardCard.defaultProps = {
  linkLabel: "View All",
};

export default AppointmentInformation;
