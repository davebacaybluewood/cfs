import React, { useContext } from "react";
import { UserContext } from "admin/context/UserProvider";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Spinner from "library/Spinner/Spinner";
import useFetchPoints from "./useFetchPoints";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "transactionType", headerName: "Transaction Type", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "expirationDate", headerName: "Expiration Date", flex: 1 },
  { field: "points", headerName: "Points", flex: 1 },
];

const RewardsHistoryTable: React.FC = () => {
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const { loading, rows } = useFetchPoints(userGuid);

  if (loading) {
    return <Spinner variant="relative" />;
  }

  return (
    <DataGrid
      rows={rows || []}
      columns={columns}
      pagination
      autoHeight
      disableRowSelectionOnClick
      className="reward-history-table"
    />
  );
};

export default RewardsHistoryTable;
