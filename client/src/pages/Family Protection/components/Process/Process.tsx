import React from "react";
import { Container, Grid } from "@mui/material";
import PlanCard, { PlanCardProps } from "library/PlanCard/PlanCard";
import "./Process.scss";

const processData: PlanCardProps[] = [
  {
    button: {
      text: "Talk to an Agent",
    },
    colorVariant: "dark",
    title: "Step 1",
    subtitle: "Get Consultation",
    description: " Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    lists: [
      "We are Different",
      "Contrary To Popular Belief",
      "Looked Up One Of The More",
    ],
  },
  {
    button: {
      text: "Make Payment",
    },
    colorVariant: "light",
    title: "Step 2",
    subtitle: "Make Payment",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ",
    lists: [
      "We are Different",
      "Contrary To Popular Belief",
      "Looked Up One Of The More",
    ],
  },
  {
    button: {
      text: "Make an ID Policy",
    },
    colorVariant: "light",
    title: "Step 3",
    subtitle: "Get Consultation",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    lists: [
      "We are Different",
      "Contrary To Popular Belief",
      "Looked Up One Of The More",
    ],
  },
];
const Process: React.FC = () => {
  return (
    <div className="process">
      <Container className="mobile-view-no-padding">
        <div className="section__title">
          <h3>Get started with our simple process</h3>
        </div>
        <Grid container spacing={2}>
          {processData.map((data) => {
            return (
              <React.Fragment>
                <Grid item sm={12} md={6} lg={4}>
                  <PlanCard
                    colorVariant={data.colorVariant}
                    title={data.title}
                    subtitle={data.subtitle}
                    description={data.description}
                    lists={data.lists}
                    button={data.button}
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Process;
