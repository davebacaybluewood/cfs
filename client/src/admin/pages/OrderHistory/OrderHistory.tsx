import { paths } from "constants/routes";
import React, { useContext, useEffect, useState } from "react";
import { CrumbTypes } from "../Dashboard/types";
import Wrapper from "admin/components/Wrapper/Wrapper";
import Title from "admin/components/Title/Title";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Spinner from "library/Spinner/Spinner";
import { OrdersData } from "admin/models/ordersModels";
import { UserContext } from "admin/context/UserProvider";
import agent from "admin/api/agent";
import { formatISODateOnly } from "helpers/date";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Merchandise",
    url: paths.merchandises,
    isActive: false,
  },
  {
    title: "Merchandise History",
    url: paths.rewardsHistory,
    isActive: true,
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", flex: 1 },
  { field: "points", headerName: "Points", flex: 1 },
  { field: "createdAt", headerName: "Date Request", flex: 1 },
  { field: "status", headerName: "status", flex: 1 },
];

const statusDisplayed = (status) => {
  if (status === "PENDING") {
    return "Order Pending";
  } else if (status === "REVIEWED") {
    return "Order Processing";
  } else if (status === "SUCCESS") {
    return "Order Delivered";
  } else if (status === "DELIVERING") {
    return "Order Shipped";
  }

  return "";
};

const OrderHistory: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrdersData[] | undefined>();
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const data = await agent.Orders.getOrdersByUserGuid(userGuid);
      setOrders(data);
      setLoading(false);
    };

    fetchData();
  }, [userGuid]);

  if (loading) {
    return <Spinner variant="relative" />;
  }

  const filteredRows = orders?.map((data) => {
    return {
      id: data._id,
      points: data.points + " Points",
      createdAt: formatISODateOnly(data.createdAt ?? ""),
      status: statusDisplayed(data.status),
    };
  });
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <div className="orders-history-container">
        <Title title="Order History" subtitle="History of your orders" />
        <div className="orders-history-table">
          <DataGrid
            rows={filteredRows || []}
            columns={columns}
            pagination
            autoHeight
            disableRowSelectionOnClick
            className="reward-history-table"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderHistory;
