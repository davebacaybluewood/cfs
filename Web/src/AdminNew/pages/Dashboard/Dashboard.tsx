import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import paths from "constants/routes";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import React from "react";
import {
  FaEnvelopeOpenText,
  FaFly,
  FaUserShield,
  FaSnowman,
  FaCalendarAlt,
  FaUser,
  FaRegEnvelope,
  FaPhone,
} from "react-icons/fa";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import { CrumbTypes, StatisticTypes } from "./types";
import Box from "AdminNew/components/Box/Box";
import Title from "AdminNew/components/Title/Title";
import "./Dashboard.scss";
import { formatISODateToDate } from "helpers/dateFormatter";
import Calendar from "./components/Calendar/Calendar";
import BoxTable from "./components/BoxTable/BoxTable";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Dashboard",
    url: paths.dashboard,
    isActive: true,
  },
];
const contactCols = ["Name", "Email", "Phone Number"];
const contactRows = [
  {
    name: "Dave Spencer Bacay",
    email: "spencerbacay@testdata.com",
    phoneNumber: "+123949942",
  },
  {
    name: "Dave Spencer Bacay",
    email: "spencerbacay@testdata.com",
    phoneNumber: "+123949942",
  },
  {
    name: "Dave Spencer Bacay",
    email: "spencerbacay@testdata.com",
    phoneNumber: "+123949942",
  },
  {
    name: "Dave Spencer Bacay",
    email: "spencerbacay@testdata.com",
    phoneNumber: "+123949942",
  },
  {
    name: "Dave Spencer Bacay",
    email: "spencerbacay@testdata.com",
    phoneNumber: "+123949942",
  },
];

const Dashboard: React.FC = () => {
  const statistics: StatisticTypes[] = [
    {
      countText: "Visits",
      count: 2,
      url: paths.login,
      icon: <FaEnvelopeOpenText />,
    },
    {
      countText: "Appointments",
      count: 2,
      url: paths.login,
      icon: <FaFly />,
    },
    {
      countText: "Contacts",
      count: 2,
      url: paths.login,
      icon: <FaUserShield />,
    },
    {
      countText: "Testimonials",
      count: 2,
      url: paths.login,
      icon: <FaSnowman />,
    },
  ];
  const tableDefs = {
    columns: [
      {
        id: "name",
        label: "Fullname",
        icon: <FaRegEnvelope />,
      },
      {
        id: "appointmentDate",
        label: "Appointment Date",
        icon: <FaPhone />,
      },
      {
        id: "dateCreated",
        label: "Date Created",
        icon: <FaPhone />,
      },
    ],

    rows: [
      {
        name: "Dave Spencer Bacay",
        appointmentDate: formatISODateToDate(new Date().toString()),
        dateCreated: formatISODateToDate(new Date().toString()),
      },
      {
        name: "Dave Spencer Bacay",
        appointmentDate: formatISODateToDate(new Date().toString()),
        dateCreated: formatISODateToDate(new Date().toString()),
      },
      {
        name: "Dave Spencer Bacay",
        appointmentDate: formatISODateToDate(new Date().toString()),
        dateCreated: formatISODateToDate(new Date().toString()),
      },
      {
        name: "Dave Spencer Bacay",
        appointmentDate: formatISODateToDate(new Date().toString()),
        dateCreated: formatISODateToDate(new Date().toString()),
      },
      {
        name: "Dave Spencer Bacay",
        appointmentDate: formatISODateToDate(new Date().toString()),
        dateCreated: formatISODateToDate(new Date().toString()),
      },
    ],
  };

  return (
    <Wrapper breadcrumb={crumbs} className="dashboard-content">
      <Grid container spacing={2} marginBottom={2}>
        {statistics.map((statistic: StatisticTypes, index: number) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={index}>
            <DashboardCard {...statistic} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} sm={12} md={4} lg={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Box>
              <Title
                title="Appointments"
                subtitle="List of 5 appointments"
                link={paths.about}
              />
              <BoxTable columns={tableDefs.columns} rows={tableDefs.rows} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Title
              title="Contacts"
              subtitle="List of 5 contacts"
              link={paths.about}
            />
            <TableContainer className="table">
              <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {contactCols.map((col, index: number) => {
                      return <TableCell key={index}>{col}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contactRows.map((row, index: number) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <FaUser /> {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <FaRegEnvelope />
                        {row.email}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <FaPhone />
                        {row.phoneNumber}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Box>
            <Paper>
              <Calendar />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Dashboard;
