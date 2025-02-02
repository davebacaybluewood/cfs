import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import Spinner from "admin/components/Spinner/Spinner";
import useFetchAgent from "admin/pages/Agents/hooks/useFetchAgent";
import useFetchWebinars from "admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import ENDPOINTS from "constants/endpoints";
import Banner from "library/Banner/Banner";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import PageTitle from "library/PageTitle/PageTitle";
import React, { useEffect, useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { useParams } from "react-router-dom";
import "./AgentWebinar.scss";
import VideoDescription from "./components/VideoDescription";
import WebinarForm from "./components/WebinarForm";
// @ts-ignore: Unreachable code error
import TimeTracker from "react-time-tracker/lib";

type AgentAppointmentProps = {
  showCalendly?: boolean;
  showForm?: boolean;
  showVideoDescription?: boolean;
};
const AgentAppointment: React.FC<AgentAppointmentProps> = (props) => {
  const { videoId, agentId } = useParams();
  const { webinars, loading } = useFetchWebinars(videoId);
  const [agentWebinarDetails, setAgentWebinarDetails] = useState<any>({});
  const [agentWebinarLoading, setAgentWebinarLoading] = useState(false);

  const { agent, loading: agentLoading } = useFetchAgent(agentId ?? "");

  const onSaveTimeTracker = (time: any) => {
    /** Rmove the milliseconds */
    const filteredTime = Math.trunc(time).toString().slice(0, -3);
    const parsedFilteredTime = parseInt(filteredTime);

    /** Convert the seconds to minute */
    const minutes = Math.floor(parsedFilteredTime / 60);

    // if (minutes >= webinars?.introVideoTimeTracker) {
    const timeSpent = minutes / webinars?.introVideoTimeTracker;

    fetch(
      ENDPOINTS.WEBINAR_VIEWS.replace(":userGuid", agentId ?? "")
        .replace(":webinarGuid", webinars?.webinarGuid ?? "")
        .replace(":timeSpent", timeSpent.toString())
        .replace(":timeTracker", webinars?.introVideoTimeTracker),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "LONG_VIDEO",
        }),
      }
    ).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    setAgentWebinarLoading(false);
    const getData = async () => {
      const response = await fetch(
        ENDPOINTS.AGENT_WEBINAR_SINGLE.replace(
          ":webinarGuid",
          webinars?.webinarGuid
        ).replace(":agentGuid", agentId ?? "")
      );
      const data = await response.json();

      setAgentWebinarDetails(data);
      setAgentWebinarLoading(false);
    };

    getData();
  }, [agentId, webinars?.webinarGuid]);

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: (e) => console.log(e),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => {
      const inviteLink = e.data.payload.invitee.uri;
      const getActiveWebinars = async () => {
        const req = await fetch(
          ENDPOINTS.APPOINTMENT_AGENT_CALENDLY.replace(
            ":agentId",
            agentId ?? ""
          ),
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              state: "Teswet",
              calendlyURI: inviteLink,
              appointment_type: "WEBINAR",
              webinarGuid: webinars?.webinarGuid,
            }),
          }
        );

        const response = await req.json();
        console.log(response);
      };

      getActiveWebinars();
    },
  });

  return (
    <div className="agent-webinar">
      <TimeTracker onSave={onSaveTimeTracker} />
      <PageTitle title="Agent Webinar" />
      <Banner bigTitle="Webinar" title="Learn With Us" hasBorder />

      {!agentLoading ? (
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={8}>
              <div className="webinar-item">
                <iframe
                  className="embed-responsive-item"
                  src={webinars?.fullVideo}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  data-ready="true"
                ></iframe>
                <ComponentValidator showNull={!props.showVideoDescription}>
                  <VideoDescription
                    title={webinars?.title}
                    content={webinars?.fullVideoContent}
                  />
                </ComponentValidator>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ComponentValidator
                showNull={!props.showForm || !props.showCalendly}
              >
                <WebinarForm />
              </ComponentValidator>
              <ComponentValidator showNull={!props.showCalendly}>
                <InlineWidget
                  url={agentWebinarDetails?.calendlyUrl ?? ""}
                  styles={{
                    height: "992px",
                    width: "100%",
                    boxShadow: "0 4px 6px -1px #eee, 0 2px 4px -1px #eee",
                    borderRadius: "4px",
                  }}
                  prefill={{
                    guests: [agent?.emailAddress],
                  }}
                />
              </ComponentValidator>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

AgentAppointment.defaultProps = {
  showCalendly: true,
  showForm: true,
  showVideoDescription: true,
};

export default AgentAppointment;
