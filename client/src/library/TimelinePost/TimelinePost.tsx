import { useState } from "react"
import { Stack } from "@mui/material"
import PostButtons from "./PostButtons"
import TimeAgo from "react-timeago"
import { useNavigate } from "react-router-dom"

export interface TimelinePostProps {
  id?: string
  userGuid?: string
  profileImg?: string
  title: string
  userName?: string
  date: string
  content: string
  imgContent?: string
  eventDate?: string
  tag?: string
  children?: JSX.Element
}

const TimelinePost = ({
  id,
  userGuid,
  profileImg,
  title,
  userName,
  date,
  content,
  imgContent,
  tag,
}: TimelinePostProps) => {
  const [isContentFull, setIsContentFull] = useState(false)
  const navigate = useNavigate()
  const baseUrl = window.location.protocol + "//" + window.location.host
  const shareUrl =
    tag === "article" || tag === "blog"
      ? `${baseUrl}/blogs/${title.split(" ").join("-").toLowerCase()}`
      : tag === "event"
      ? `${baseUrl}/rsvp-form/${id}?userGuid=${userGuid}`
      : ""

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
            <div
              className={`${
                (tag === "article" || tag === "blog") && "position-top-left"
              } tag`}
            >
              {tag.toUpperCase()}
            </div>
          )}

          {imgContent && (
            <img style={{ width: "100%" }} src={imgContent} alt="" />
          )}
          <Stack flexDirection={"row"} gap={1} sx={{ textAlign: "left" }}>
            {tag === "blog" || tag === "article" ? (
              <h2
                className="blog-title"
                onClick={() =>
                  navigate(
                    "/" +
                      "blogs" +
                      "/" +
                      title.split(" ").join("-").toLowerCase()
                  )
                }
              >
                {title}
              </h2>
            ) : (
              <h2>{title}</h2>
            )}
            {userName && <h2 className="username">@{userName}</h2>}

            <h2 style={{ color: "gray" }}>·</h2>
            <TimeAgo
              date={date}
              style={{ color: "gray", fontWeight: 400, fontSize: "13px" }}
            />
          </Stack>

          <p className="content">
            {isContentFull
              ? content.replace(/<[^>]*>/g, "").replace("&quot;", " ")
              : content
                  .replace(/<[^>]*>/g, "")
                  .replace("&quot;", " ")
                  .slice(0, 300)}

            {!isContentFull && content.length > 300 ? (
              <span className="see-more" onClick={() => setIsContentFull(true)}>
                See more
              </span>
            ) : null}
          </p>
          {tag === "article" || tag === "blog" || tag === "event" ? (
            <PostButtons shareUrl={shareUrl} />
          ) : null}
        </Stack>
      </Stack>
    </div>
  )
}

export default TimelinePost
