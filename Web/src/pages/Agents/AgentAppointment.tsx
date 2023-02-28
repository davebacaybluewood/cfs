import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import useFetchWebinars from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import Banner from "library/Banner/Banner";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import PageTitle from "library/PageTitle/PageTitle";
import React from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { useParams } from "react-router-dom";
import "./AgentWebinar.scss";
import VideoDescription from "./components/VideoDescription";
import WebinarForm from "./components/WebinarForm";

type AgentAppointmentProps = {
  showCalendly?: boolean;
  showForm?: boolean;
  showVideoDescription?: boolean;
};
const AgentAppointment: React.FC<AgentAppointmentProps> = (props) => {
  const { videoId } = useParams();
  const { webinars, loading } = useFetchWebinars(videoId);

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: (e) => console.log(e),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => {
      const inviteLink = e.data.payload.invitee;
      console.log(inviteLink);
    },
  });

  return (
    <div className="agent-webinar">
      <PageTitle title="Agent Webinar" />
      <Banner bigTitle="Webinar" title="Learn With Us" hasBorder />

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
            <ComponentValidator showNull={!props.showForm}>
              <WebinarForm />
            </ComponentValidator>
            <ComponentValidator showNull={!props.showCalendly}>
              <InlineWidget
                url="https://calendly.com/gocfs/the-debt-action-plan-program?primary_color=0057b7"
                styles={{
                  height: "992px",
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

AgentAppointment.defaultProps = {
  showCalendly: true,
  showForm: true,
  showVideoDescription: true,
};

export default AgentAppointment;
