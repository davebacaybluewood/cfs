import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./TrialSubscription.scss";
import FilteredGridToolbar from "./FilteredGridToolbar";
import { BLANK_VALUE } from "constants/constants";

import { TrialSubscriptionProps } from "./TrialSubscription";

const TrialSubscriptionTable = ({
  subscriptions,
  filteredSubscriptions,
  setFilteredSubscriptions,
  loading,
}: {
  subscriptions: TrialSubscriptionProps[];
  filteredSubscriptions: TrialSubscriptionProps[];
  setFilteredSubscriptions: any;
  loading: boolean;
}) => {
  // Table Definitions
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
  ];

  const rows = filteredSubscriptions?.map((item: any) => {
    return {
      id: item._id,
      userGuid: item.userGuid,
      // without slice, this returns 2023-10-18T19:07:55.525Z
      dateCreated: item.dateCreated.slice(0, 10),
      expirationDate: item.expirationDate.slice(0, 10),
      daysRemaining:
        item.daysRemaining === 0 ? BLANK_VALUE : item.daysRemaining,
      firstName: item.firstName,
      lastName: item.lastName,
      emailAddress: item.emailAddress,
    };
  });
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
