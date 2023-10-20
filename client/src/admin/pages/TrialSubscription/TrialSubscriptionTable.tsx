import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import "./TrialSubscription.scss";
import FilteredGridToolbar from "./FilteredGridToolbar";

type TrialSubscriptionProps = {
  _id: string;
  userGuid: string;
  dateCreated: string;
  expirationDate: string;
  daysRemaining: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
};

const TrialSubscriptionTable = ({
  data,
}: {
  data: TrialSubscriptionProps[];
}) => {
  const [subscriptions, setSubscriptions] = useState<TrialSubscriptionProps[]>(
    []
  );
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<
    TrialSubscriptionProps[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  // fetch data here
  useEffect(() => {
    const getSubscriptions = () => {
      setLoading(true);
      setTimeout(() => {
        if (data) {
          setSubscriptions(data);
          setFilteredSubscriptions(data);
        }
        setLoading(false);
      }, 2000);
    };

    getSubscriptions();
  }, []);

  // Table Definitions
  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First name",
      width: 130,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 130,
    },
    {
      field: "dateCreated",
      headerName: "Subscribed Date",
      width: 150,
    },
    {
      field: "expirationDate",
      headerName: "Expiration Date",
      width: 150,
    },
    {
      field: "daysRemaining",
      headerName: "Days Remaining",
      width: 150,
    },
    {
      field: "emailAddress",
      headerName: "Email",
      width: 220,
    },
  ];

  const rows = filteredSubscriptions?.map((item: any) => {
    return {
      id: item._id,
      userGuid: item.userGuid,
      dateCreated: item.dateCreated,
      expirationDate: item.expirationDate,
      daysRemaining: item.daysRemaining === 0 ? "—" : item.daysRemaining,
      firstName: item.firstName,
      lastName: item.lastName,
      emailAddress: item.emailAddress,
    };
  });
  return (
    <Box sx={{ height: "500", maxWidth: 1200 }}>
      {/* <Box sx={{ height: loading ? 500 : "auto", maxWidth: 1200 }}> */}
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
