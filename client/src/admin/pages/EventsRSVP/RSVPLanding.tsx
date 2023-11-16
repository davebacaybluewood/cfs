import Wrapper from "admin/components/Wrapper/Wrapper"
import { paths } from "constants/routes"
import Title from "admin/components/Title/Title"
import { CrumbTypes } from "admin/pages/Dashboard/types"
import RSVPTable from "./RSVPTable"
import { useEffect, useState } from "react"
import Event from "admin/models/eventModel"
import { useParams } from "react-router-dom"
import agent from "admin/api/agent"
import React from "react"

const RSVPLanding: React.FC = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState<Event | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getEvent = async () => {
      const res = await agent.Events.getSingleEvent(eventId ?? "")
      console.log(res)
      setEvent(res)
    }

    if (eventId) {
      getEvent()
      setLoading(false)
    }
  }, [eventId])

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: event?.title ?? "",
      url: paths.events,
      isActive: false,
    },
    {
      title: "RSVP List",
      url: paths.rsvpLanding,
      isActive: true,
    },
  ]

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={loading}>
      <div className="rewards-history-container">
        {event && (
          <React.Fragment>
            <Title
              title={`${event?.title} RSVP`}
              subtitle="List of all rsvp submits"
            />
            <div className="rewards-history-table">
              <RSVPTable />
            </div>
          </React.Fragment>
        )}
      </div>
    </Wrapper>
  )
}

export default RSVPLanding
