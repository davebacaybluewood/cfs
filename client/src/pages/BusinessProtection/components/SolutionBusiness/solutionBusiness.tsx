import { Container, Grid, Typography } from "@mui/material";
import SolutionCard from "library/SolutionCard/SolutionCard";
import React from "react";

import "./SolutionBusiness.scss";

const SolutionBusiness: React.FC = () => {
  return (
    <Container className="solution__container">
      <div className="section__title">
        <Typography variant="h2">Here's why people trust us</Typography>
      </div>
      <div className="solution__card__container">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard title="200k" subtitle="Signed insurance contracts" />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="10M"
              subtitle={
                <React.Fragment>
                  Paid <br /> compensation
                </React.Fragment>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="30 years"
              subtitle={
                <React.Fragment>
                  The experience of <br /> our advisers
                </React.Fragment>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="150"
              subtitle={<React.Fragment>Experienced employees</React.Fragment>}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="10"
              subtitle={
                <React.Fragment>
                  Offices and <br /> branches
                </React.Fragment>
              }
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default SolutionBusiness;
