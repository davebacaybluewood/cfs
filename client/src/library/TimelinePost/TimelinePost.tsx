import { useState } from "react";
import { Stack } from "@mui/material";
import PostButtons from "./PostButtons";
import TimeAgo from "react-timeago";

export interface TimelinePostProps {
  profileImg?: string;
  title: string;
  userName?: string;
  datePosted: string;
  content: string;
  imgContent?: string;
  eventDate?: string;
  tag?: string;
  children?: JSX.Element;
}

const TimelinePost: React.FC<TimelinePostProps> = (props) => {
  const [isContentFull, setIsContentFull] = useState(false);

  return (
    <div className={`timeline-post`}>
      <Stack flexDirection={"row"} gap={2}>
        {props.profileImg && (
          <div>
            <img className="profile-image" src={props.profileImg} alt="" />
          </div>
        )}

        <Stack flexDirection="column" gap={1} sx={{ position: "relative" }}>
          {props.tag && (
            <div
              className={`${
                props.tag === "article" && "position-top-left"
              } tag`}
            >
              {props.tag.toUpperCase()}
            </div>
          )}
          {props.imgContent && (
            <img style={{ width: "100%" }} src={props.imgContent} alt="" />
          )}
          <Stack flexDirection={"row"} gap={1} sx={{ textAlign: "left" }}>
            <h2>{props.title}</h2>
            {props.userName && <h2 className="username">@{props.userName}</h2>}

            <h2 style={{ color: "gray" }}>·</h2>
            <TimeAgo
              date={props.datePosted}
              style={{ color: "gray", fontWeight: 400, fontSize: "13px" }}
            />
          </Stack>

          <p className="content">
            {isContentFull ? props.content : props.content?.slice(0, 300)}
            {!isContentFull && (props.content?.length ?? 0) > 300 ? (
              <span className="see-more" onClick={() => setIsContentFull(true)}>
                See more
              </span>
            ) : null}
          </p>
          <div className="hasChildren">{props.children}</div>
          <PostButtons />
        </Stack>
      </Stack>
    </div>
  );
};

export default TimelinePost;
