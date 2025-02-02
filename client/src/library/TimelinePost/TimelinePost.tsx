import { useState } from "react"
import { Stack } from "@mui/material"
import PostButtons from "./PostButtons"
import TimeAgo from "react-timeago"
import { useNavigate } from "react-router-dom"
import { paths } from "constants/routes"

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
  tag?: "blog" | "article" | "event" | "reccomendation"
  children?: JSX.Element
  onClick?: () => void;
}

const TimelinePost: React.FC<TimelinePostProps> = (props) => {
  const {
    id,
    userGuid,
    profileImg,
    title,
    userName,
    date,
    content,
    imgContent,
    tag,
    onClick
  } = props;
  const navigate = useNavigate()
  const [isContentFull, setIsContentFull] = useState(false)


  const baseUrl = window.location.protocol + "//" + window.location.host
  const shareUrl =
    tag === "article" || tag === "blog"
      ? `${baseUrl}/blogs/${title
        .split(" ")
        .join("-")
        .toLowerCase()}?userGuid=${userGuid}`
      : tag === "event"
        ? `${baseUrl}/rsvp-form/${id}?userGuid=${userGuid}`
        : ""

  return (
    <div className={`timeline-post`}>
      <Stack flexDirection={"row"} gap={2}>
        {profileImg && (
          <div>
            <img
              className="profile-image"
              src={profileImg}
              alt=""
              onClick={onClick}
            />
          </div>
        )}

        <Stack flexDirection="column" gap={1} sx={{ position: "relative" }}>
          {tag && (
            <div
              className={`${
                (tag === "article" ||
                  tag === "blog" ||
                  (tag === "event" && imgContent)) &&
                "position-top-left"
              } tag`}
            >
              {tag.toUpperCase()}
            </div>
          )}

          {imgContent && (
            <img
              style={{ width: "100%" }}
              src={imgContent}
              alt=""
              onClick={onClick}
            />
          )}
          <Stack flexDirection={"row"} gap={1} sx={{ textAlign: "left" }}>
            <h2 className="blog-title" onClick={onClick}>
              {title}
            </h2>
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
        </Stack>
      </Stack>
      <PostButtons shareUrl={shareUrl} />
    </div>
  )
}

export default TimelinePost
