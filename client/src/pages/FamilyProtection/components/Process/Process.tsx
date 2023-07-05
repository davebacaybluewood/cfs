import React from "react";
import { Container, Grid } from "@mui/material";
import PlanCard, { PlanCardProps } from "library/PlanCard/PlanCard";
import "./Process.scss";
import { CALENDLY } from "constants/constants";
import { PopupModal } from "react-calendly";

const processData: PlanCardProps[] = [
  {
    button: {
      text: "Talk to an agent",
    },
    colorVariant: "dark",
    title: "Step 1",
    subtitle: " Consultation",
    description:
      "Talk to qualifed CFS life insurance agents for use to bettter understand your need. ",
    lists: ["Qualified agents", "Solution oriented", "Collaborative"],
  },

  {
    colorVariant: "light",
    title: "Step 2",
    subtitle: " Evaluation and Offer ",
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
const Process: React.FC = () => {
  const [openCalendlyModal, setOpenCalendlyModal] = React.useState(false);

  return (
    <div className="process">
      <Container className="mobile-view-no-padding">
        <div className="section__title">
          <h3>Get the protection your family needs with our simple process.</h3>
        </div>
        <Grid container spacing={2}>
          {processData.map((data, index) => {
            if (data.button) {
              data.button.onClick = () => setOpenCalendlyModal(true);
            }
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
      <PopupModal
        url={CALENDLY.CONSULTATION}
        onModalClose={() => setOpenCalendlyModal(false)}
        open={openCalendlyModal}
        rootElement={document.getElementById("root") as any}
      />
    </div>
  );
};

export default Process;
