import { Grid } from "@mui/material";
import RelativeSpinner from "admin/components/Spinner/Spinner";
import { WebinarValuesType } from "admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import ENDPOINTS from "constants/endpoints";
import { paths } from "constants/routes";
import Banner from "library/Banner/Banner";
import FixedSpinner from "library/Spinner/Spinner";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentVideoItem from "./AgentVideoItem";

type AgentVideosProps = {
  webinars: WebinarValuesType[];
  loading: boolean;
  agentId: string;
};
const AgentVideos: React.FC<AgentVideosProps> = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const clickHandler = async (webinarGuid: string, webinarId: string) => {
    setLoading(true);
    fetch(
      ENDPOINTS.WEBINAR_CLICK.replace(":webinarGuid", webinarGuid).replace(
        ":userGuid",
        props.agentId ?? ""
      ),
      {
        method: "POST",
      }
    )
      .then((res) => {
        setLoading(false);
        navigate(
          paths.webinarForm
            .replace(":videoId", webinarId)
            .replace(":agentId", props.agentId)
        );
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className="agent-videos">
      {loading ? <FixedSpinner variant="fixed" /> : null}
      <Banner
        bigTitle="Webinar"
        title="See our overview videos"
        hasBorder={true}
      />
      {props.loading ? (
        <RelativeSpinner />
      ) : (
        <Grid container spacing={2}>
          {props.webinars?.map((webinar) => {
            return (
              <Grid item sm={12} md={4} lg={4} key={webinar?._id}>
                <AgentVideoItem
                  onClick={() =>
                    clickHandler(webinar?.webinarGuid ?? "", webinar?._id ?? "")
                  }
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
