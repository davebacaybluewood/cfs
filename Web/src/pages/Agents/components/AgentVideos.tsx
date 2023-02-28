import { Grid } from "@mui/material";
import Spinner from "AdminNew/components/Spinner/Spinner";
import { WebinarValuesType } from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import paths from "constants/routes";
import Banner from "library/Banner/Banner";
import React from "react";
import { useNavigate } from "react-router-dom";
import AgentVideoItem from "./AgentVideoItem";

type AgentVideosProps = {
  webinars: WebinarValuesType[];
  loading: boolean;
  agentId: string;
};
const AgentVideos: React.FC<AgentVideosProps> = (props) => {
  const navigate = useNavigate();

  const clickHandler = (webinarGuid: string) => {
    navigate(
      paths.webinarForm
        .replace(":videoId", webinarGuid)
        .replace(":agentId", props.agentId)
    );
  };
  return (
    <div className="agent-videos">
      <Banner
        bigTitle="Webinar"
        title="See our overview videos"
        hasBorder={true}
      />
      {props.loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={2}>
          {props.webinars?.map((webinar) => {
            return (
              <Grid item sm={12} md={4} lg={4} key={webinar?._id}>
                <AgentVideoItem
                  onClick={() => clickHandler(webinar?._id ?? "")}
                  thumbnail={webinar.thumbnail}
                  title={webinar.title}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default AgentVideos;
