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
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { paths } from "constants/routes";
import React, { useEffect, useState } from "react";
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
import "../../Dashboard.scss";
import classNames from "classnames";
import { MerchandiseData } from "admin/models/merchandiseModel";
import agent from "admin/api/agent";
import MerchandiseCard from "admin/components/MerchandiseCard/MerchandiseCard";

const columnsForDesktop = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    headerClassName: "column-header-h3",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerClassName: "column-header-h3",
  },
  {
    field: "type",
    headerName: "Transaction Type",
    flex: 1,
    headerClassName: "column-header-h3",
  },
  {
    field: "date",
    headerName: "Date",
    type: "string",
    flex: 1,
    headerClassName: "column-header-h3",
  },
  {
    field: "points",
    headerName: "Points",
    flex: 1,
    headerClassName: "column-header-h3",
  },
];
const columnsForMobile = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerClassName: "column-header-h3",
  },
  {
    field: "date",
    headerName: "Date",
    type: "string",
    flex: 1,
    headerClassName: "column-header-h3",
  },
  {
    field: "points",
    headerName: "Points",
    flex: 1,
    headerClassName: "column-header-h3",
  },
];

const rows = [
  {
    id: 1,
    name: "Jon Snow",
    type: "Personal",
    date: "2023-10-01",
    points: 100,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    type: "Event",
    date: "2023-10-01",
    points: 100,
  },
  { id: 3, name: "Arya Stark", type: "Event", date: "2023-10-01", points: 100 },
  {
    id: 4,
    name: "Jaime Lannister",
    type: "Subscriber",
    date: "2023-10-01",
    points: 100,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    type: "Personal",
    date: "2023-10-01",
    points: 100,
  },
];

const SubscriberBox = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [merchandises, setMerchandises] = useState<
    MerchandiseData[] | undefined
  >();

  useEffect(() => {
    const fetchMerchandises = async () => {
      setLoading(true);
      const data = await agent.Merchandise.getAllMerchandise();

      setMerchandises(data);
      setLoading(false);
    };

    fetchMerchandises();
  }, []);

  const agentStorage = sessionStorage.getItem("userInfo");
  const { userGuid } = JSON.parse(agentStorage ?? "");
  const agentInfo = useFetchAgent(userGuid?.toString());

  const statistics: StatisticTypes[] = [
    {
      countText: "Points",
      count: 0,
      url: "", //paths.typeAppointments.replace(":typeId", "paw"),
      icon: <FaCalendarMinus />,
    },
    {
      countText: "Registered Subscriber",
      count: 0,
      url: "", //paths.typeAppointments.replace(":typeId", "webinar"),
      icon: <FaCalendarMinus />,
    },
    {
      countText: "Received Merchandise",
      count: 0,
      url: "", //paths.contacts,
      icon: <FaUserShield />,
    },
  ];

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        marginBottom={2}
        justifyContent="center"
        alignItems="center"
      >
        {statistics.map((statistic: StatisticTypes, index: number) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
            <DashboardCard {...statistic} />
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={2}
        marginBottom={2}
        //justifyContent="center"
        //alignItems="center"
      >
        <div style={{ paddingLeft: "20px", paddingTop: "2rem" }}>
          <Title title="Reward History" subtitle="History of Downline" />
        </div>

        <Grid item xs={12} md={12} lg={12}>
          {window.innerWidth >= 768 ? (
            <div
              className="reward-history-table"
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
            >
              <DataGrid
                style={{ width: "100%" }}
                rows={rows}
                columns={columnsForDesktop}
                autoHeight
                disableRowSelectionOnClick
              />{" "}
            </div>
          ) : (
            <div className="reward-history-table">
              <DataGrid
                style={{ width: "100%" }}
                rows={rows}
                columns={columnsForMobile}
                autoHeight
                disableRowSelectionOnClick
              />
            </div>
          )}
        </Grid>
        <div className="sub-merchandise-container" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "2rem" }}>
          <Title title="Merchandises" subtitle="List of all Merchandises." />
          <Grid container spacing={2}>
            {merchandises?.map((data) => {
              return (
                <Grid item sm={6} md={2} lg={2}>
                  <MerchandiseCard
                    name={data.name}
                    image={data.image}
                    points={data.points}
                    button={{
                      display: true,
                      onClick: () => console.log("test"),
                      text: "Claim Reward",
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default SubscriberBox;
