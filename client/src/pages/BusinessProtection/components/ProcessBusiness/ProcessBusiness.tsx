import { Container, Grid } from "@mui/material";
import PlanCard, { PlanCardProps } from "library/PlanCard/PlanCard";
import React from "react";
import "./ProcessBusiness.scss";

const ProcessBusiness: React.FC = () => {
  const processData: PlanCardProps[] = [
    {
      button: {
        text: "Talk to an Agent",
        onClick: () =>
          window
            .open(
              "https://calendly.com/gocfs/free-30-minute-consultation",
              "_blank"
            )
            ?.focus(),
      },
      colorVariant: "dark",
      title: "Step 1",
      subtitle: "Consultation",
      description:
        "Talk to qualifed CFS life insurance agents for use to bettter understand your need. ",
      lists: ["Qualified agents", "Solution oriented", "Collaborative"],
    },
    {
      colorVariant: "light",
      title: "Step 2",
      subtitle: "Make Payment",
      description:
        "CFS will evaluate the infromation and craft the best solution. Your CFS agent will deliver the proposed policy for your review.",
      lists: [
        "Comprehensive evaluation",
        "Effective financial solutions",
        "Quick update",
      ],
    },
    {
      colorVariant: "light",
      title: "Step 3",
      subtitle: "Acceptance and  Processing",
      description:
        "Once the proposed policy is accepted, your CFS agent will guide you to the processing and payment process.",
      lists: ["Faster processing", "Easy payment process", "Safe and secure"],
    },
  ];
  return (
    <div className="process">
      <Container className="mobile-view-no-padding">
        <div className="section__title">
          <h3>Get the protection you need with our simple process.</h3>
        </div>
        <Grid container spacing={2} className="card-business">
          {processData.map((data, index) => {
            return (
              <Grid item sm={12} md={6} lg={4} key={index}>
                <PlanCard
                  colorVariant={data.colorVariant}
                  title={data.title}
                  subtitle={data.subtitle}
                  description={data.description}
                  lists={data.lists}
                  button={data.button}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default ProcessBusiness;
