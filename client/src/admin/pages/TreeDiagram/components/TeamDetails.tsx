import React from "react"

const TeamDetails = () => {
  return (
    <div
      style={{
        color: "black",
        width: "auto",
        display: "inline-block",
        borderRadius: "7px",
        marginTop: "2rem",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            fontWeight: "400",
            background: "#f7f7f7",
            padding: "10px 2rem",
            borderRight: "1px solid #dddddd",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "black",
              borderRadius: "50px",
            }}
          ></div>
          <h3>Agents: 4</h3>
        </div>
        <div
          style={{
            fontWeight: "400",
            background: "#f7f7f7",
            padding: "10px 2rem",
            borderRight: "1px solid #dddddd",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "purple",
              borderRadius: "50px",
            }}
          ></div>
          <h3>Subscribers: 2</h3>
        </div>
        <div
          style={{
            fontWeight: "400",
            background: "#f7f7f7",
            padding: "10px 2rem",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "orange",
              borderRadius: "50px",
            }}
          ></div>
          <h3>30-Days Free Trial: 2</h3>
        </div>
      </div>
    </div>
  )
}

export default TeamDetails
