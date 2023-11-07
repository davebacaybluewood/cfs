import React from "react"

const AvatarBadge = ({ type }: { type: string }) => {
  return (
    <div
      style={{
        marginTop: "0.3rem",
        bottom: "2.5rem",
        background:
          type === "agent"
            ? "black"
            : type === "subscriber"
            ? "purple"
            : "orange",
        color: "white",
        padding: "8px 10px",
        width: "auto",
        textTransform: "uppercase",
        maxWidth: "100px",
        margin: "auto",
        fontSize: "12px",
        borderRadius: "7px",
      }}
    >
      {type}
    </div>
  )
}

export default AvatarBadge
