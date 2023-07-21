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
import { paths } from "constants/routes";
import React from "react";
import {
  FaUserShield,
  FaSnowman,
  FaUser,
  FaRegEnvelope,
  FaPhone,
  FaCalendarMinus,
} from "react-icons/fa";
import DashboardCard from "../DashboardCard/DashboardCard";
import { StatisticTypes } from "../../types";
import Box from "admin/components/Box/Box";
import Title from "admin/components/Title/Title";
import { formatISODateToDate } from "helpers/dateFormatter";
import BoxTable from "../BoxTable/BoxTable";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import useFetchWebinars, {
  WebinarValuesType,
} from "admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import CardContent from "library/CardContent/CardContent";
import { useNavigate } from "react-router-dom";
import useFetchAgent from "admin/pages/Agents/hooks/useFetchAgent";
import { NOTIFICATION_ENUMS } from "constants/constants";

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
const AgentBox = () => {
  const navigate = useNavigate();

  const learnMoreHandler = (id: string) => {
    navigate(paths.viewSingleDynamicWebinar.replace(":webinarId", id));
  };

  const { loading, webinars } = useFetchWebinars();

  const agentStorage = localStorage.getItem("userInfo");
  const { userGuid } = JSON.parse(agentStorage ?? "");
  const agentInfo = useFetchAgent(userGuid?.toString());

  const agentWebinars = agentInfo.agent?.webinars
    ?.filter(
      (data: any) =>
        data.status === NOTIFICATION_ENUMS.WEBINARS.WEBINAR_APPROVED
    )
    ?.map((data: any) => {
      return data.webinarGuid;
    });

  const filteredWebinars = webinars?.filter((data: any) =>
    agentWebinars?.includes(data.webinarGuid)
  );
  const statistics: StatisticTypes[] = [
    {
      countText: "PAW Appointments",
      count: 0,
      url: paths.typeAppointments.replace(":typeId", "paw"),
      icon: <FaCalendarMinus />,
    },
    {
      countText: "Webinar Appointments",
      count: 0,
      url: paths.typeAppointments.replace(":typeId", "webinar"),
      icon: <FaCalendarMinus />,
    },
    {
      countText: "Contacts",
      count: 0,
      url: paths.contacts,
      icon: <FaUserShield />,
    },
    {
      countText: "Webinars",
      count: filteredWebinars?.length,
      url: paths.cfsWebinars,
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
    <React.Fragment>
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
            <Title
              title="Appointments"
              subtitle="List of 5 appointments"
              link={paths.about_us}
            />
            <NoInformationToDisplay
              showNoInfo
              title="No information to display"
              message="No active appointments available."
            >
              <BoxTable columns={tableDefs.columns} rows={tableDefs.rows} />
            </NoInformationToDisplay>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Title
              title="Contacts"
              subtitle="List of 5 contacts"
              link={paths.about_us}
            />
            <NoInformationToDisplay
              showNoInfo
              title="No information to display"
              message="No active contacts available."
            >
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
            </NoInformationToDisplay>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            {/* <Calendar /> */}
            <Title
              title="Activated Webinars"
              subtitle="List of 5 webinars"
              link={paths.webinar}
            />

            <NoInformationToDisplay
              showNoInfo={filteredWebinars.length === 0 && loading === false}
              message="No webinars available."
              title="No Information to display."
            >
              <Grid container spacing={2}>
                {filteredWebinars?.map((webinar: WebinarValuesType) => {
                  return (
                    <Grid item sm={12} md={12} lg={4} key={webinar._id}>
                      <CardContent
                        title={webinar.title}
                        description={webinar.introVideoContent}
                        thumbnail={webinar.thumbnail}
                        subtitle="Lorem Ipsum"
                        onClick={() => learnMoreHandler(webinar._id ?? "")}
                      ></CardContent>
                    </Grid>
                  );
                })}
              </Grid>
            </NoInformationToDisplay>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AgentBox;
