import React from "react"
import "../TreeDiagram.scss"

const TeamDetails = ({ totalAgents, totalSubscribers, totalTrial }) => {
  return (
    <div className="team-details">
      <div className="type-counts-parent">
        <div className="type-count-parent border-r">
          <div
            className="type-count"
            style={{
              background: "black",
            }}
          ></div>
          <h3>Agents: {totalAgents}</h3>
        </div>
        <div className="type-count-parent border-r">
          <div
            className="type-count"
            style={{
              background: "purple",
            }}
          ></div>
          <h3>Subscribers: {totalSubscribers}</h3>
        </div>
        <div className="type-count-parent">
          <div
            className="type-count"
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
