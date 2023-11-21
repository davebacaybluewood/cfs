import { Skeleton } from "@mui/material"
import React from "react"

const TimelineLoading = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            padding: "2rem",
            borderBottom: "#f2f2f2 1px solid",
          }}
        >
          <Skeleton variant="rounded" width={"100%"} height={160} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="rounded" width={200} height={15} />
            <Skeleton variant="rounded" width={130} height={15} />
          </div>
          <div
            style={{
              marginTop: "0.9rem",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
            }}
          >
            <Skeleton variant="rounded" width={"100%"} height={15} />
            <Skeleton variant="rounded" width={"100%"} height={15} />
            <Skeleton variant="rounded" width={"100%"} height={15} />
          </div>
          <Skeleton variant="rounded" width={100} height={15} />
        </div>
      ))}
    </>
  )
}

export default TimelineLoading
