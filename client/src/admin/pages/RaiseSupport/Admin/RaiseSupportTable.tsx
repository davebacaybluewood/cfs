import React, { useState, useEffect } from "react"
// Material UI
import Box from "@mui/material/Box"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { Button } from "@mui/material"

// Data
import { testEventData } from "./testEventData"

const RaiseSupportTable = () => {
  const [eventData, setEventData] = useState<any>([])

  useEffect(() => {
    setEventData(testEventData)
  }, [testEventData])

  const viewHandler = (id: string) => {
    console.log(id)
  }

  // Render action buttons
  const actionButtons = (id: string) => {
    return (
      <div className="action-buttons">
        <Button
          variant="outlined"
          size="small"
          onClick={() => viewHandler("test")}
        >
          View
        </Button>
        <Button variant="outlined" size="small" color="success">
          Resolve
        </Button>
      </div>
    )
  }

  // Table Definitions
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "name",
      headerName: "Name",
      width: 120,
    },
    {
      field: "emailAddress",
      headerName: "Email Address",
      width: 120,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 110,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => actionButtons(params.id.toString()),
    },
  ]

  // rows for data grid
  const rows = eventData.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      emailAddress: item.emailAddress,
      contactNumber: item.contactNumber,
      subject: item.subject,
      actions: actionButtons(item.id),
    }
  })

  return (
    <main>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          sx={{ fontSize: "12px" }}
        />
      </Box>
    </main>
  )
}

export default RaiseSupportTable
