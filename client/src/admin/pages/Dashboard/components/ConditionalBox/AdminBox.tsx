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
  FaFly,
  FaUserShield,
  FaSnowman,
  FaUser,
  FaRegEnvelope,
  FaPhone,
  FaUsers,
} from "react-icons/fa";
import DashboardCard from "../DashboardCard/DashboardCard";
import { StatisticTypes } from "../../types";
import Box from "admin/components/Box/Box";
import Title from "admin/components/Title/Title";
import { formatISODateToDate } from "helpers/dateFormatter";
import BoxTable from "../BoxTable/BoxTable";
import Spinner from "admin/components/Spinner/Spinner";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import BlogCard from "library/Blogs/BlogCard/BlogCard";
import useFetchBlogResource from "pages/BlogPage/hooks/useFetchBlogResource";

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
const AdminBox = () => {
  const statistics: StatisticTypes[] = [
    {
      countText: "User Accounts",
      count: 0,
      url: paths.users,
      icon: <FaUsers />,
    },
    {
      countText: "Appointments",
      count: 0,
      url: paths.appointments,
      icon: <FaFly />,
    },
    {
      countText: "Contacts",
      count: 0,
      url: paths.contacts,
      icon: <FaUserShield />,
    },
    {
      countText: "Webinars",
      count: 0,
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

  const { blogs, loading } = useFetchBlogResource(0, 12);

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
          <Paper elevation={3} sx={{ p: 3 }}>
            <Title
              title="Appointments"
              subtitle="List of 5 appointments"
              link={paths.about_us}
            />
            <NoInformationToDisplay
              showNoInfo
              title="No information to display"
              message="There's no contact available."
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
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Title
              title="Contacts"
              subtitle="List of 5 contacts"
              link={paths.about_us}
            />
            <NoInformationToDisplay
              showNoInfo
              title="No information to display"
              message="There's no contact available."
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
          <Box>
            <Paper>
              {/* <Calendar /> */}
              <Title
                title="Blogs"
                subtitle="List of 12 blogs"
                link={paths.webinar}
              />

              {loading ? (
                <Spinner />
              ) : (
                <NoInformationToDisplay
                  showNoInfo={blogs?.length === 0}
                  message="No webinars available."
                  title="No Information to display."
                >
                  <Grid container spacing={2}>
                    {blogs?.map((data) => {
                      return (
                        <Grid item sm={12} md={6} lg={2}>
                          <BlogCard
                            author={{
                              authorName: data.authorName ?? "",
                              image: data.authorThumbnail ?? "",
                            }}
                            blogId={data._id}
                            date={data.createdAt ?? ""}
                            description={data.content}
                            image={data.thumbnail ?? ""}
                            title={data.title}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </NoInformationToDisplay>
              )}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AdminBox;
