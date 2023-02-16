import { Grid } from "@mui/material";
import paths from "constants/routes";
import Banner from "library/Banner/Banner";
import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AgentVideoItem from "./AgentVideoItem";

const AgentVideos: React.FC = () => {
  const navigate = useNavigate();
  const videoId = "639ce557061e6ed3a75acf64";
  const agentId = "639ce557061e6ed3a75acf64";

  const clickHandler = () => {
    navigate(
      paths.webinarForm
        .replace(":videoId", videoId)
        .replace(":agentId", agentId)
    );
  };
  const tempVideo =
    "https://res.cloudinary.com/dfm2vczpy/image/upload/v1674084195/agent-videos/thumbnails/video-thumbnail-1_fbiem1.png";
  return (
    <div className="agent-videos">
      <Banner
        bigTitle="Webinar"
        title="See our overview videos"
        hasBorder={true}
      />
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} lg={4}>
          <AgentVideoItem
            onClick={() => clickHandler()}
            thumbnail={tempVideo}
            title="The Debt Action Plan Program Overview"
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <AgentVideoItem
            onClick={() => clickHandler()}
            thumbnail={tempVideo}
            title="The Debt Action Plan Program Overview"
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <AgentVideoItem
            onClick={() => clickHandler()}
            thumbnail={tempVideo}
            title="The Debt Action Plan Program Overview"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AgentVideos;
