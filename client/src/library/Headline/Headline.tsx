import React from "react";
import "./Headline.scss";
import { Container, Grid } from "@mui/material";

interface HeadlineProps {
  title: string | JSX.Element;
  description: string;
  image: string;
  children: JSX.Element | React.ReactNode;
}

const Headline: React.FC<HeadlineProps> = (props) => {
  return (
    <Container className="headline">
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
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="headline__image">
            <img src={props.image} alt={props.image} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Headline;
