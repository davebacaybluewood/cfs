import TimelinePost from "library/TimelinePost/TimelinePost"
import React, { useEffect, useState } from "react"
import { fakePosts } from "./fakePosts"

const Timeline = ({ content }: { content?: string }) => {
  const [loading, setLoading] = useState(false)
  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      {fakePosts
        .filter((item) => {
          if (content === "events") {
            return item.tag === "event"
          } else if (content === "articles") {
            return item.tag === "article"
          } else {
            return item
          }
        })
        .map((item, index) => (
          <TimelinePost
            profileImg={item.profileImg}
            title={item.title}
            userName={item.userName}
            datePosted={item.datePosted}
            content={item.content}
            imgContent={item.imgContent}
            eventDate={item.eventDate}
            tag={item.tag}
          />
        ))}
    </div>
  )
}

export default Timeline
