import { Container, Grid, Typography } from "@mui/material";
import SolutionCard from "library/SolutionCard/SolutionCard";
import React from "react";
import "./Solution.scss";

const Solution: React.FC = () => {
  return (
    <Container className="solution">
      <div className="section__title">
        <Typography variant="h2">
          Insert heading or engaging hook <br /> about the solution
        </Typography>
      </div>
      <div className="solution__card__container">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="200k"
              subtitle="Signed insurance contracts"
              description={
                <React.Fragment>
                  Excepteur sint occaecat <br /> cupidatat non proident, <br />{" "}
                  sunt in culpa qui officia
                </React.Fragment>
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
              description={
                <React.Fragment>
                  Excepteur sint occaecat <br /> cupidatat non proident, <br />{" "}
                  sunt in culpa qui officia
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
              description={
                <React.Fragment>
                  Excepteur sint occaecat <br /> cupidatat non proident, <br />{" "}
                  sunt in culpa qui officia
                </React.Fragment>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <SolutionCard
              title="150"
              subtitle={
                <React.Fragment>
                  Experienced <br /> employees
                </React.Fragment>
              }
              description={
                <React.Fragment>
                  Excepteur sint occaecat <br /> cupidatat non proident, <br />{" "}
                  sunt in culpa qui officia
                </React.Fragment>
              }
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
              description={
                <React.Fragment>
                  Excepteur sint occaecat <br /> cupidatat non proident, <br />{" "}
                  sunt in culpa qui officia
                </React.Fragment>
              }
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Solution;
