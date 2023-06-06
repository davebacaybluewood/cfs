import React from "react";
import { Container, Grid } from "@mui/material";
import "./Headline.scss";

interface HeadlineProps {
  title: string | JSX.Element;
  description: string;
  children?: JSX.Element | React.ReactNode;
  backgroundImage?: string;
}

const Headline: React.FC<HeadlineProps> = (props) => {
  return (
    <div
      className="headline-container"
      style={{
        backgroundImage: `url(${props.backgroundImage})`,
      }}
    >
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="headline__content">
              <div className="headline__title">
                <h2>{props.title}</h2>
              </div>
              <div className="headline__description">
                <p>{props.description}</p>
              </div>
              {props.children}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Headline;
