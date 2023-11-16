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
    <div className={`timeline-post`}>
      <Stack flexDirection={"row"} gap={2}>
        {profileImg && (
          <div>
            <img className="profile-image" src={profileImg} alt="" />
          </div>
        )}

        <Stack flexDirection="column" gap={1} sx={{ position: "relative" }}>
          {tag && (
            <div className={`${tag === "article" && "position-top-left"} tag`}>
              {tag.toUpperCase()}
            </div>
          )}
          {imgContent && (
            <img style={{ width: "100%" }} src={imgContent} alt="" />
          )}
          <Stack flexDirection={"row"} gap={1} sx={{ textAlign: "left" }}>
            <h2>{title}</h2>
            {userName && <h2 className="username">@{userName}</h2>}

            <h2 style={{ color: "gray" }}>·</h2>
            <TimeAgo
              date={datePosted ? datePosted : eventDate}
              style={{ color: "gray", fontWeight: 400, fontSize: "13px" }}
            />
          </Stack>

          <p className="content">
            {isContentFull ? content : content.slice(0, 300)}

            {!isContentFull && content.length > 300 ? (
              <span className="see-more" onClick={() => setIsContentFull(true)}>
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
