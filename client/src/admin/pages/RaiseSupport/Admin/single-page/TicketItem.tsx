import React from "react"
import "../RaiseSupportAdmin.scss"

const TicketItem = ({
  label,
  item,
  loading,
}: {
  label: string
  item: string
  loading: boolean
}) => {
  return (
    <div className="ticket-info">
      {loading ? (
        <>
          <div className="ticket-item-loading-1"></div>
          <div className="ticket-item-loading-2"></div>
        </>
      ) : (
        <>
          <span>{label}</span>
          <h6>{item}</h6>
        </>
      )}
    </div>
  )
}

export default TicketItem
