import { Stack } from "@mui/material"
import React from "react"
import PostButtons from "./PostButtons"

interface TimelinePostProps {
  profileImg: string
  fullName: string
  userName: string
  datePosted: string
  content: string
  imgContent?: string
}

const TimelinePost = ({
  profileImg,
  fullName,
  userName,
  datePosted,
  content,
  imgContent,
}: TimelinePostProps) => {
  const testDate = new Date()
  console.log(testDate)
  return (
    <div style={{ padding: "2rem", borderBottom: "2px solid #f2f2f2" }}>
      <Stack flexDirection={"row"} gap={2}>
        <img
          style={{ borderRadius: "50%", width: "5rem", height: "5rem" }}
          src={profileImg}
          alt=""
        />
        <Stack flexDirection="column" gap={1}>
          <Stack flexDirection={"row"} gap={1} sx={{ textAlign: "left" }}>
            <h2>{fullName}</h2>
            <h2 style={{ color: "gray", fontWeight: 400 }}>@{userName}</h2>
            <h2 style={{ color: "gray" }}>·</h2>
            {/* <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter"/> */}
            <h2 style={{ color: "gray", fontWeight: 400 }}>{datePosted}</h2>
          </Stack>
          <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>
            {content}
          </p>
          {imgContent && (
            <img style={{ width: "100%" }} src={imgContent} alt="" />
          )}

          <PostButtons />
        </Stack>
      </Stack>
    </div>
  )
}

export default TimelinePost
