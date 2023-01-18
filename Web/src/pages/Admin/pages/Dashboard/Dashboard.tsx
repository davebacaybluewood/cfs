import { Grid } from "@mui/material";
import paths from "constants/routes";
import React from "react";
import {
  FaEnvelopeOpenText,
  FaUserShield,
  FaSnowman,
  FaFly,
} from "react-icons/fa";
import Calendar from "../Calendar/Calendar";
import DashboardCard from "./components/DashboardCard";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-content">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <DashboardCard
            count={2}
            countText="Event Invites"
            url={paths.adminEventInvites}
            icon={<FaEnvelopeOpenText />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <DashboardCard
            count={2}
            countText="Events"
            url={paths.adminEvents}
            icon={<FaFly />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <DashboardCard
            count={2}
            countText="Admin Accounts"
            url={paths.adminAccounts}
            icon={<FaUserShield />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <DashboardCard
            count={2}
            countText="Contacts"
            url={paths.adminContacts}
            icon={<FaSnowman />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Calendar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
