import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import getUserToken from "helpers/getUserToken"
import adminPaths from "admin/constants/routes"
import ReactQuill from "react-quill"
import TicketItem from "./TicketItem"
import RaiseSupportLoading from "../../loading/RaiseSupportFormLoading"
import "../RaiseSupportAdmin.scss"
import ENDPOINTS from "constants/endpoints"

const API_ROOT = ENDPOINTS.RAISE_SUPPORT_ROOT // Replace with your API endpoint

const getCurrentId = () => {
  const currentLocation = window.location.pathname
  const pathLastIndex = currentLocation.lastIndexOf("/")
  return currentLocation.slice(pathLastIndex + 1)
}

const fetchSingleTicket = async (id: string) => {
  try {
    const response = await axios.get(`${API_ROOT}/${id}`, {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const RaiseSupportTicket = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [singleTicketData, setSingleTicketData] = useState<any>({})

  useEffect(() => {
    const id = getCurrentId()
    setLoading(true)
    fetchSingleTicket(id)
      .then((data) => {
        setSingleTicketData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching ticket data:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="raise-support-single-page">
      <h1>Raise Support Ticket</h1>
      <hr style={{ margin: "18px 0" }} />
      <Link className="back-btn" to={adminPaths.raiseSupport}>
        Back to Tickets
      </Link>
      <div className="ticket-quill-parent">
        <div className="subject-and-quill">
          <h2 style={{ display: "flex" }}>
            {loading ? (
              <span className="subject-loading"></span>
            ) : (
              <>Subject: {singleTicketData.subject}</>
            )}
          </h2>
          <hr />
          {loading ? (
            <div style={{ marginTop: "2rem" }}>
              <RaiseSupportLoading />
            </div>
          ) : (
            <ReactQuill
              value={singleTicketData.issue}
              readOnly={true}
              theme="bubble"
              className="quill-view"
            />
          )}
        </div>
        <div className="tickets-container">
          <TicketItem
            label="ID"
            item={singleTicketData._id}
            loading={loading}
          />
          <TicketItem
            label="Name"
            item={singleTicketData.name}
            loading={loading}
          />
          <TicketItem
            label="Email"
            item={singleTicketData.email}
            loading={loading}
          />
          <TicketItem
            label="Contact Number"
            item={singleTicketData.contactNumber}
            loading={loading}
          />
          <TicketItem
            label="Date"
            item={singleTicketData.createdAt}
            loading={loading}
          />
          <TicketItem
            label="Status"
            item={singleTicketData.status}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default RaiseSupportTicket
