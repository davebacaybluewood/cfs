import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import "./TriColumnSection.scss";

interface TriColumnSectionProps {
  image: string;
  title: string;
  caption: string;
  link: string;
}
const TriColumnSection: React.FC<TriColumnSectionProps> = (props) => {
  return (
    <div className="help-section">
      <Container>
        <div className="content__container">
          <Grid
            container
            spacing={3}
            justifyContent="space-between
          "
          >
            <Grid item sm={12} md={4} lg={4}>
              <div className="section__three-content">
                <img src={props.image} />
                <Typography variant="h4">{props.title}</Typography>
                <p>{props.caption} </p>
                <h5>{props.link}</h5>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default TriColumnSection;
