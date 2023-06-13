import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import useFetchWebinars from "admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import Banner from "library/Banner/Banner";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import PageTitle from "library/PageTitle/PageTitle";
import React from "react";
import { InlineWidget } from "react-calendly";
import { useParams } from "react-router-dom";
import "./AgentWebinar.scss";
import VideoDescription from "./components/VideoDescription";
import WebinarForm from "./components/WebinarForm";
// @ts-ignore: Unreachable code error
import TimeTracker from "react-time-tracker/lib";
import ENDPOINTS from "constants/endpoints";

type AgentWebinarProps = {
  showCalendly?: boolean;
  showForm?: boolean;
  showVideoDescription?: boolean;
};

function timeToDecimal(t: string) {
  var arr = t.split(":");
  var dec = parseInt((((arr[1] as any) / 6) * 10).toString(), 10);

  return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
}
function convertToSeconds(minutes: any) {
  return minutes * 60;
}
function convertSecondsToMinuteFormat(time: any) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + String(mins).padStart(2, "0") + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}
const AgentWebinar: React.FC<AgentWebinarProps> = (props) => {
  const { videoId } = useParams();
  const { webinars, loading } = useFetchWebinars(videoId);
  const { agentId } = useParams();

  const onSaveTimeTracker = (time: any) => {
    /** Rmove the milliseconds */
    const filteredTime = Math.trunc(time).toString().slice(0, -3);
    const parsedFilteredTime = parseInt(filteredTime);

    /** Convert the minute to percentage */
    const decimalTimeString = parseInt(webinars?.introVideoTimeTracker);
    const n = new Date(0, 0);
    n.setSeconds(+decimalTimeString * 60 * 60);
    const convertedNewDate = n.toTimeString().slice(0, 8);
    const slicedNewDate = convertedNewDate.slice(0, -3);
    /** Example Output: 02:00 OR 01:00 */

    const userStayed = timeToDecimal(
      convertSecondsToMinuteFormat(parsedFilteredTime)
    );
    // if (minutes >= webinars?.introVideoTimeTracker) {
    const timeSpent = userStayed / webinars?.introVideoTimeTracker;

    /** Compute the time to be inserted in our database */
    const computationResult = userStayed / webinars?.introVideoTimeTracker;
    const timeDecimalFormatWithDecimal =
      parseInt("" + computationResult * 100) / 100;
    const timeDecimalFormatWithoutDecimal =
      (parseInt("" + computationResult * 100) / 100) | 0;

    const finalTimeFormat =
      1 > timeDecimalFormatWithDecimal
        ? timeDecimalFormatWithDecimal
        : timeDecimalFormatWithoutDecimal;

    console.log({
      timeTracker: webinars?.introVideoTimeTracker,
      userStayedTimeFormat: convertSecondsToMinuteFormat(parsedFilteredTime),
      userStayedDecimalFormat: finalTimeFormat,
      userStayedSecondsFormat: time,
    });

    if (finalTimeFormat >= webinars?.introVideoTimeTracker) {
      fetch(
        ENDPOINTS.WEBINAR_VIEWS.replace(":userGuid", agentId ?? "")
          .replace(":webinarGuid", webinars?.webinarGuid ?? "")
          .replace(":timeSpent", finalTimeFormat.toString())
          .replace(":timeTracker", webinars?.introVideoTimeTracker),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: "SHORT_VIDEO",
          }),
        }
      ).then((res) => {
        console.log("Success");
      });
    }
  };

  return (
    <div className="agent-webinar">
      <TimeTracker onSave={onSaveTimeTracker} />
      <PageTitle title="Agent Webinar" />
      <Banner
        bigTitle="Webinar"
        title="BOOK AN APPOINTMENT WITH ME"
        hasBorder
      />

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={8}>
            <div className="webinar-item">
              <iframe
                className="embed-responsive-item"
                src={webinars?.introVideo}
                allow="autoplay; fullscreen"
                allowFullScreen
                data-ready="true"
              ></iframe>
              <ComponentValidator showNull={!props.showVideoDescription}>
                <VideoDescription
                  content={webinars?.introVideoContent}
                  title={webinars?.title}
                />
              </ComponentValidator>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ComponentValidator showNull={!props.showForm}>
              <WebinarForm />
            </ComponentValidator>
            <ComponentValidator showNull={!props.showCalendly}>
              <InlineWidget
                url="https://calendly.com/gocfs/the-debt-action-plan-program?primary_color=0057b7"
                styles={{
                  height: "892px",
                  width: "100%",
                  boxShadow: "0 4px 6px -1px #eee, 0 2px 4px -1px #eee",
                  borderRadius: "4px",
                }}
              />
            </ComponentValidator>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

AgentWebinar.defaultProps = {
  showCalendly: true,
  showForm: true,
  showVideoDescription: true,
};

export default AgentWebinar;
