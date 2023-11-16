import TimelinePost, {
  TimelinePostProps,
} from "library/TimelinePost/TimelinePost";
import React from "react";

interface TimelineData {
  data: TimelinePostProps[] | undefined;
}
const Timeline: React.FC<TimelineData> = (props) => {
  const { data } = props;

  return (
    <React.Fragment>
      <div className="events-container">
        <div className="event-content">
          {data?.map((post) => {
            return <TimelinePost {...post}>{post.children}</TimelinePost>;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Timeline;
