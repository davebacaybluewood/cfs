import React from "react"
import "../TreeDiagram.scss"

interface TeamDetailsProps {
  totalAgents: number
  totalSubscribers: number
  totalTrial: number
}

const TeamDetails = ({
  totalAgents,
  totalSubscribers,
  totalTrial,
}: TeamDetailsProps) => {
  return (
    <div className="team-details">
      <div className="type-counts-parent">
        <div className="type-count-parent">
          <div
            className="round-marker"
            style={{
              background: "black",
            }}
          ></div>
          <h3>Agents: {totalAgents}</h3>
        </div>
        <div className="type-count-parent">
          <div
            className="round-marker"
            style={{
              background: "purple",
            }}
          ></div>
          <h3>Subscribers: {totalSubscribers}</h3>
        </div>
        <div className="type-count-parent">
          <div
            className="round-marker"
            style={{
              background: "orange",
            }}
          ></div>
          <h3>30-Days Free Trial: {totalTrial}</h3>
        </div>
      </div>
    </div>
  )
}

export default TeamDetails
