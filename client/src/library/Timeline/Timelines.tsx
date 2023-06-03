import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import "./Timelines.scss";

interface TimelineType {
  title: string;
  description: string;
}
interface TimelineProps {
  data: TimelineType[];
}

const Timelines: React.FC<TimelineProps> = (props) => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {props.data.map((data, index) => {
        const removeConnector = props.data.length === index + 1;
        return (
          <div className="timeline-container">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="dot" />
                {removeConnector ? null : <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <div className="timeline-content">
                  <div className="timeline-title">
                    <h3>{data.title}</h3>
                  </div>
                  <div className="timeline-description">
                    <p>{data.description}</p>
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          </div>
        );
      })}
    </Timeline>
  );
};

export default Timelines;
