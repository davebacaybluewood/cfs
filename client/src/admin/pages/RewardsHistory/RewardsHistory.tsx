import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React, { useContext } from "react";
import { CrumbTypes } from "../Dashboard/types";
import { UserContext } from "admin/context/UserProvider";
import Title from "admin/components/Title/Title";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./RewardsHistory.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Rewards History",
    url: paths.rewardsHistory,
    isActive: true,
  },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "transactionType", headerName: "Transaction Type", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "points", headerName: "Points", flex: 1 },
];

const rows = [
  { id: 0, name: "Deckard Cain", transactionType: "PERSONAL_ACCOUNT_REGISTRATION", date: "January 25, 2023", points: 100 },
  { id: 1, name: "Blood Raven", transactionType: "PERSONAL_ACCOUNT_REGISTRATION", date: "January 29, 2023", points: 100 },
  { id: 2, name: "Asylla Handmaiden", transactionType: "EVENT_REGISTRATION", date: "October 9, 2023", points: 100 },
  { id: 3, name: "Chancellor Eamon", transactionType: "PERSONAL_ACCOUNT_REGISTRATION", date: "May 25, 2023", points: 100 },
  { id: 4, name: "Leah Cain", transactionType: "SUBSCRIBER_REGISTRATION", date: "November 12, 2022", points: 100 },
  { id: 5, name: "Wirt Leag", transactionType: "PERSONAL_ACCOUNT_REGISTRATION", date: "April 16, 2023", points: 100 },
  { id: 6, name: "King Leoric", transactionType: "EVENT_REGISTRATION", date: "October 22, 2023", points: 100 },
  { id: 7, name: "Azmodan Evil", transactionType: "SUBSCRIBER_REGISTRATION", date: "June 4, 2023", points: 100 },
  { id: 8, name: "Uldyssian ul-Diomed", transactionType: "EVENT_REGISTRATION", date: "March 18, 2023", points: 100 },
  { id: 9, name: "Inarius Angel", transactionType: "PERSONAL_ACCOUNT_REGISTRATION", date: "February 14, 2023", points: 100 },
  { id: 10, name: "The Wanderer", transactionType: "PERSONAL_ACCOUNT_REGISTRATION", date: "January 18, 2023", points: 100 },
];

const RewardsHistory: React.FC = () => {
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;

  console.log(JSON.stringify(userGuid));
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <div className="rewards-history-container">
        <Title
          title="Rewards Point"
          subtitle="List of all rewards points earned."
        ></Title>
        <div className="rewards-history-table">
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default RewardsHistory;
