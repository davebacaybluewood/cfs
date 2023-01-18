import { Grid } from "@mui/material";
import Box from "AdminNew/components/Box/Box";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import React from "react";
import Calendar from "../Dashboard/components/Calendar/Calendar";
import { CrumbTypes } from "../Dashboard/types";
import "./Calendar.scss";
import CalendarEvents from "./components/CalendarEvents";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Calendar",
    url: paths.calendar,
    isActive: true,
  },
];

const AdminCalendar: React.FC = () => {
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="calendar-wrapper"
    >
      <Title
        title="Calendar"
        subtitle="Track all your appointments and events."
      />
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} lg={3}>
          <Box className="calendar-wrapper-content">
            <CalendarEvents />
          </Box>
        </Grid>
        <Grid item sm={12} md={6} lg={9}>
          <Box className="calendar-box-content">
            <Calendar />
          </Box>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default AdminCalendar;
