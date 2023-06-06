import { Container, Grid, Typography } from "@mui/material";
import SolutionCard from "library/SolutionCard/SolutionCard";
import React from "react";
import "./Solution.scss";

const Solution: React.FC = () => {
  return (
    <Container className="solution">
      <div className="section__title">
        <Typography variant="h2">Here's Why Families Choose Us</Typography>
      </div>
      <div className="solution__card__container">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="200k"
              subtitle="Signed insurance contracts"
              description={
                <React.Fragment>Signed insurance contracts</React.Fragment>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="10M"
              subtitle={
                <React.Fragment>
                  Paid <br /> compensation
                </React.Fragment>
              }
              description={<React.Fragment>Paid compensation</React.Fragment>}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="30years"
              subtitle={
                <React.Fragment>
                  The experience of <br /> our advisers
                </React.Fragment>
              }
              description={
                <React.Fragment>The experience of our advisers</React.Fragment>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="30"
              subtitle={
                <React.Fragment>
                  Experienced <br /> employees
                </React.Fragment>
              }
              description={
                <React.Fragment>Experienced employees</React.Fragment>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="3"
              subtitle={
                <React.Fragment>
                  Offices and <br /> branches
                </React.Fragment>
              }
              description={
                <React.Fragment>Offices and branches</React.Fragment>
              }
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Solution;
