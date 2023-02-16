import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import Banner from "library/Banner/Banner";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import PageTitle from "library/PageTitle/PageTitle";
import React from "react";
import { InlineWidget } from "react-calendly";
import "./AgentWebinar.scss";
import VideoDescription from "./components/VideoDescription";
import WebinarForm from "./components/WebinarForm";

type AgentAppointmentProps = {
  showCalendly?: boolean;
  showForm?: boolean;
  showVideoDescription?: boolean;
};
const AgentAppointment: React.FC<AgentAppointmentProps> = (props) => {
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
                src="https://player.vimeo.com/video/629521217?title=0&byline=0&portrait=0"
                allow="autoplay; fullscreen"
                allowFullScreen
                data-ready="true"
              ></iframe>
              <ComponentValidator showNull={!props.showVideoDescription}>
                <VideoDescription />
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
