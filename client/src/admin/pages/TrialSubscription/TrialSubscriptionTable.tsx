import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FilteredGridToolbar from "./FilteredGridToolbar";
import { BLANK_VALUE } from "constants/constants";
import { TrialSubscriptionProps } from "./TrialSubscription";

const columns: GridColDef[] = [
  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
    maxWidth: 180,
    renderCell: (params) => (
      <div style={{ textTransform: "capitalize" }}>{params.value}</div>
    ),
  },
  {
    field: "lastName",
    headerName: "Last name",
    maxWidth: 180,
    flex: 1,
    renderCell: (params) => (
      <div style={{ textTransform: "capitalize" }}>{params.value}</div>
    ),
  },
  {
    field: "dateCreated",
    headerName: "Subscribed Date",
    maxWidth: 150,
    flex: 1,
  },
  {
    field: "expirationDate",
    headerName: "Expiration Date",
    maxWidth: 150,
    flex: 1,
  },
  {
    field: "daysRemaining",
    headerName: "Days Remaining",
    maxWidth: 150,
    flex: 1,
  },
  {
    field: "emailAddress",
    headerName: "Email",
    minWidth: 80,
    flex: 1,
  },
  {
    field: "agentUpline",
    headerName: "Agent Upline",
    minWidth: 80,
    flex: 1,
  },
];

const mapSubscriptionToRow = (subscription) => ({
  id: subscription._id,
  userGuid: subscription.userGuid,
  dateCreated: subscription.dateCreated.slice(0, 10),
  expirationDate: subscription.expirationDate.slice(0, 10),
  daysRemaining:
    subscription.daysRemaining === 0 ? BLANK_VALUE : subscription.daysRemaining,
  firstName: subscription.firstName,
  lastName: subscription.lastName,
  emailAddress: subscription.emailAddress,
  // for testing only
  agentUpline: Math.random() < 0.5 ? "CFS Direct" : "John Doe",
});

const TrialSubscriptionTable: React.FC<{
  subscriptions: TrialSubscriptionProps[];
  filteredSubscriptions: TrialSubscriptionProps[];
  setFilteredSubscriptions: React.Dispatch<
    React.SetStateAction<TrialSubscriptionProps[]>
  >;
  loading: boolean;
}> = ({
  subscriptions,
  filteredSubscriptions,
  setFilteredSubscriptions,
  loading,
}) => {
  const rows = filteredSubscriptions.map(mapSubscriptionToRow);

  return (
    <Box
      sx={{
        height: loading ? 500 : rows.length === 0 ? 500 : "auto",
        maxWidth: 1200,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        sx={{ fontSize: "14px", p: 3, background: "white" }}
        slots={{
          toolbar: () => (
            <FilteredGridToolbar
              subscriptions={subscriptions}
              setFilteredSubscriptions={setFilteredSubscriptions}
            />
          ),
        }}
      />
    </Box>
  );
};

export default TrialSubscriptionTable;
