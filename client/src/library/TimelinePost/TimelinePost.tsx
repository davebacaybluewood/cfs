import { Stack } from "@mui/material"
import PostButtons from "./PostButtons"
import TimeAgo from "react-timeago"

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
  return (
    <div style={{ padding: "2rem", borderBottom: "2px solid #f2f2f2" }}>
      <Stack flexDirection={"row"} gap={2}>
        <div>
          <img
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              width: "6rem",
              height: "6rem",
            }}
            src={profileImg}
            alt=""
          />
        </div>
        <Stack flexDirection="column" gap={1}>
          <Stack flexDirection={"row"} gap={1} sx={{ textAlign: "left" }}>
            <h2>{fullName}</h2>
            <h2 style={{ color: "gray", fontWeight: 400 }}>@{userName}</h2>
            <h2 style={{ color: "gray" }}>·</h2>
            <TimeAgo
              date={datePosted}
              style={{ color: "gray", fontWeight: 400, fontSize: "15px" }}
            />
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
