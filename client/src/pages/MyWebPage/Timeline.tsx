<<<<<<< HEAD
import { useState, useEffect } from "react"
import TimelinePost, {
  TimelinePostProps,
} from "library/TimelinePost/TimelinePost"
import { default as ApiAgent } from "api/agent"
import { default as AdminAgent } from "admin/api/agent"
import TimelineLoading from "./components/TimelineLoading"
import { BlogData } from "pages/BlogPage/models"
import Event from "admin/models/eventModel"
=======
import TimelinePost, { TimelinePostProps } from "library/TimelinePost/TimelinePost"
import TimelineLoading from "./TimelineLoading"
>>>>>>> 1de7ab1eb01da6e01e23129e35d3b6fa933f9557

interface TimelineProps {
  userGuid?: string;
  data: TimelinePostProps[] | undefined
  loading?: boolean;
}
const Timeline: React.FC<TimelineProps> = (props) => {
  const { userGuid, data, loading } = props;

  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      {loading ? (
        <TimelineLoading />
      ) : data?.map((timeline) => {
        return (
          <TimelinePost
            {...timeline}
          />
        )
      })}
    </div>
  )
}

export default Timeline
