import React, { useState, useEffect } from "react";
// react-router-dom
import { useNavigate } from "react-router-dom";
// mui
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
// axios
import axios from "axios";
// user token
import getUserToken from "helpers/getUserToken";
// end points
import ENDPOINTS from "constants/endpoints";
// props
import { TicketProps } from "../TicketProps";
// paths
import adminPaths from "admin/constants/routes";
import ResolveModal from "./components/ResolveModal";
// components
import TypeBadge from "./components/TypeBadge";
import Filter from "./components/Filter";
// constants
import { SUPPORT_TYPE, SUPPORT_STATUS } from "constants/constants";

type SelectedIdProps = string;

const RaiseSupportTable = () => {
  const [ticketData, setTicketData] = useState<TicketProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  // FOR: resolve modal
  // PURPOSE: set id value when a resolve button item is clicked
  const [selectedId, setSelectedId] = useState<SelectedIdProps>("");

  const navigate = useNavigate();

  // fetch data
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      await axios(ENDPOINTS.RAISE_SUPPORT_ROOT, {
        headers: {
          Authorization: "Bearer " + getUserToken(),
        },
      }).then((res) => {
        setTicketData(res.data);
        setLoading(false);
      });
    };
    fetchTickets();
  }, []);

  const viewHandler = (id: string) => {
    navigate("/");
    navigate(adminPaths.raiseSupportTicket.replace(":id", id));
  };

  const resolveHandler = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  // Render type badge
  const renderTypeBadge = (type: string) => {
    return (
      <div>
        <TypeBadge type={type} />
      </div>
    );
  };

  // Table Definitions
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "emailAddress",
      headerName: "Email Address",
      width: 170,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 200,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 200,
    },
    {
      field: "type",
      headerName: "Type",
      width: 120,
      renderCell: (params) => renderTypeBadge(params.value),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,

      renderCell: (params) => {
        // console.log(params.row.id);
        return (
          <div className="action-buttons">
            {/* Resolve Modal */}
            {params.row.status === SUPPORT_STATUS.PENDING ? (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => viewHandler(params.row.id)}
                >
                  View
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => resolveHandler(params.row.id)}
                >
                  Resolve
                </Button>
              </>
            ) : (
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => viewHandler(params.row.id)}
                >
                  View
                </Button>
                <h5 style={{ color: "#059669" }}>RESOLVED</h5>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // rows for data grid
  const rows = ticketData
    .filter((item) => {
      if (selectedValue) {
        return item.type?.toLowerCase() === selectedValue.toLowerCase();
      } else {
        return item;
      }
    })
    .map((item: any) => {
      return {
        id: item._id,
        name: item.name,
        emailAddress: item.email,
        contactNumber: item.contactNumber,
        subject: item.subject,
        type: item.type,
        status: item.status,
      };
    });

  return (
    <main>
      <ResolveModal open={open} setOpen={setOpen} id={selectedId} />
      <Box sx={{ height: 600 }}>
        <Filter
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
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
          sx={{ fontSize: "14px" }}
        />
      </Box>
    </main>
  );
};

export default RaiseSupportTable;
