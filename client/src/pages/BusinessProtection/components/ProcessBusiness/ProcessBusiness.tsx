import { Container, Grid } from "@mui/material";
import PlanCard, { PlanCardProps } from "library/PlanCard/PlanCard";
import React from "react";
import "./ProcessBusiness.scss";

const ProcessBusiness: React.FC = () => {
  const processData: PlanCardProps[] = [
    {
      button: {
        text: "Talk to an Agent",
      },
      colorVariant: "dark",
      title: "Step 1",
      subtitle: "Get Consultation",
      description:
        " We'll take the time to understand your unique needs, answer any questions you may have, and guide you towards the best life insurance solution for your family.",
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
      description:
        "Our streamlined payment options ensure a seamless experience. Simply select the payment method that suits you best ",
      lists: ["Secure payment channels", "No hassle", "Get real-time updates"],
    },
    {
      button: {
        text: "Make an ID Policy",
      },
      colorVariant: "light",
      title: "Step 3",
      subtitle: "Get Consultation",
      description:
        "After completing payment, we'll swiftly process your application and you’ll receive a policy ID, which serves as proof of your comprehensive coverage",
      lists: ["Online processing", "Easy to update", "No long waiting hours"],
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
