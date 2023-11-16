import { useState } from "react"
import { Stack } from "@mui/material"
import PostButtons from "./PostButtons"
import TimeAgo from "react-timeago"

interface TimelinePostProps {
  profileImg?: string
  title: string
  userName?: string
  datePosted?: string
  content: string
  imgContent?: string
  eventDate?: string
  tag?: string
}

const TimelinePost = ({
  profileImg,
  title,
  userName,
  datePosted,
  content,
  imgContent,
  eventDate,
  tag,
}: TimelinePostProps) => {
  const [isContentFull, setIsContentFull] = useState(false)

  return (
    <div
      className={`timeline-post`}
      style={{
        padding: "2rem",
        borderBottom: "2px solid #f2f2f2",
        background: "white",
      }}
    >
      <Stack flexDirection={"row"} gap={2}>
        {profileImg && (
          <div>
            <img
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                width: "4.5rem",
                height: "4.5rem",
              }}
              src={profileImg}
              alt=""
            />
          </div>
        )}

        <Stack flexDirection="column" gap={1} sx={{ position: "relative" }}>
          {tag && (
            <div
              className={`${tag === "article" && "position-top-left"}`}
              style={{
                background: "#ed3e4b",
                marginRight: "auto",
                padding: "5px 1rem",
                color: "#fff",
                fontWeight: 400,
              }}
            >
              {tag.toUpperCase()}
            </div>
          )}
          {imgContent && (
            <img style={{ width: "100%" }} src={imgContent} alt="" />
          )}
          <Stack flexDirection={"row"} gap={1} sx={{ textAlign: "left" }}>
            <h2>{title}</h2>
            {userName && (
              <h2 style={{ color: "gray", fontWeight: 400, fontSize: "13px" }}>
                @{userName}
              </h2>
            )}

            <h2 style={{ color: "gray" }}>·</h2>
            <TimeAgo
              date={datePosted ? datePosted : eventDate}
              style={{ color: "gray", fontWeight: 400, fontSize: "13px" }}
            />
          </Stack>

          <p
            style={{
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: "20px",
              color: "#333",
            }}
          >
            {isContentFull ? content : content.slice(0, 300)}

            {!isContentFull && content.length > 300 ? (
              <span
                onClick={() => setIsContentFull(true)}
                style={{
                  display: "inline-block",
                  width: "auto",
                  color: "blue",
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  fontWeight: "300",
                }}
              >
                See more
              </span>
            ) : null}
          </p>
          <PostButtons />
        </Stack>
      </Stack>
    </div>
  )
}

export default TimelinePost
