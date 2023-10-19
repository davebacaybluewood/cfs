import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const TrialSubscriptionTable = ({ data }) => {
  // Table Definitions
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      width: 170,
    },
    {
      field: "expirationDate",
      headerName: "Expiration Date",
      width: 170,
    },
    {
      field: "daysRemaining",
      headerName: "Days Remaining",
      width: 170,
    },
  ];

  const rows = data.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      date: item.date,
      expirationDate: item.expirationDate,
      daysRemaining: item.daysRemaining,
    };
  });
  return (
    <Box sx={{ height: 650 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        sx={{ fontSize: "14px" }}
      />
    </Box>
  );
};

export default TrialSubscriptionTable;
