import React, { useEffect, useState } from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Spinner from "library/Spinner/Spinner"
import { RSVPData } from "admin/models/rsvpModel"
import { useParams } from "react-router-dom"
import agent from "admin/api/agent"
import generateRandomChars from "helpers/generateRandomChars"
import { formatISODateOnly } from "helpers/dateFormatter"

const columns: GridColDef[] = [
  { field: "fullName", headerName: "Full Name", flex: 1 },
  { field: "emailAddress", headerName: "Email Address", flex: 1 },
  { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
  { field: "remarks", headerName: "Remarks", flex: 1 },
  { field: "dateSubmitted", headerName: "Date Submitted", flex: 1 },
]

const RSVPTable: React.FC = () => {
  const { eventId } = useParams()
  const [loading, setLoading] = useState(false)
  const [rsvps, setRsvps] = useState<RSVPData[] | undefined>()

  useEffect(() => {
    setLoading(true)
    const getRsvps = async () => {
      const res = await agent.RSVP.getEventRsvps(eventId ?? "")
      console.log(res)
      setRsvps(res)
      setLoading(false)
    }

    if (eventId) {
      getRsvps()
    }
  }, [eventId])

  if (loading) {
    return <Spinner variant="relative" />
  }

  const filteredRsvps = rsvps?.map((data) => {
    return {
      ...data,
      fullName: `${data.authorFirstName} ${data.authorLastName}`,
      dateSubmitted: formatISODateOnly(data.createdAt),
    }
  })
  return (
    <DataGrid
      rows={filteredRsvps || []}
      columns={columns}
      pagination
      autoHeight
      disableRowSelectionOnClick
      className="reward-history-table"
      getRowId={(row: any) => generateRandomChars(5)}
    />
  )
}

export default RSVPTable
