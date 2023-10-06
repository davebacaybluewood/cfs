import React, { useState, useEffect } from "react"
// react-router-dom
import { useNavigate } from "react-router-dom"
// mui
import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Button } from "@mui/material"
// axios
import axios from "axios"
// user token
import getUserToken from "helpers/getUserToken"
// end points
import ENDPOINTS from "constants/endpoints"
// props
import { TicketProps } from "../TicketProps"
// paths
import adminPaths from "admin/constants/routes"
import ResolveModal from "./ResolveModal"

const RaiseSupportTable = () => {
  const [ticketData, setTicketData] = useState<TicketProps[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      const response = await axios(ENDPOINTS.RAISE_SUPPORT_ROOT, {
        headers: {
          Authorization: "Bearer " + getUserToken(),
        },
      }).then((res) => {
        setTicketData(res.data)
        setLoading(false)
      })
    }
    fetchTickets()
  }, [])

  const viewHandler = (id: string) => {
    navigate("/")
    navigate(adminPaths.raiseSupportTicket.replace(":id", id))
  }

  const resolveHandler = (id: string) => {
    setOpen(true)
  }

  // Render action buttons
  const actionButtons = (id: string) => {
    return (
      <div className="action-buttons">
        {/* Modal */}
        <ResolveModal open={open} setOpen={setOpen} />
        <Button variant="outlined" size="small" onClick={() => viewHandler(id)}>
          View
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="success"
          onClick={() => resolveHandler(id)}
        >
          Resolve
        </Button>
      </div>
    )
  }

  // Table Definitions
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
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
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => actionButtons(params.id.toString()),
    },
  ]

  // rows for data grid
  const rows = ticketData.map((item: any) => {
    return {
      id: item._id,
      name: item.name,
      emailAddress: item.email,
      contactNumber: item.contactNumber,
      subject: item.subject,
      actions: actionButtons(item),
    }
  })

  return (
    <main>
      <Box sx={{ height: 600 }}>
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
  )
}

export default RaiseSupportTable
