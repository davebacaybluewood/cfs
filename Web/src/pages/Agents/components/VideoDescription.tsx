import { Grid } from "@mui/material";
import React from "react";
import ReactHTMLParser from "html-react-parser";

type VideoDescriptionProps = {
  content: string;
  title: string;
};
const VideoDescription: React.FC<VideoDescriptionProps> = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={12} lg={12}>
        <div className="video-captions">
          <h2>{props?.title}</h2>
          {ReactHTMLParser(props?.content ?? "")}
        </div>
      </Grid>
    </Grid>
  );
};

export default VideoDescription;
